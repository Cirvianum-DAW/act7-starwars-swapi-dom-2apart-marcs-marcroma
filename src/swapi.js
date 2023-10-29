//const fetch = require ('node-fetch');

function getMovieCount() {
  return fetch('https://swapi.dev/api/films/')
    .then((res) => res.json())
    .then((res) => res.count);
}

function listMovies() {
  return fetch('https://swapi.dev/api/films/')
    .then((res) => res.json())
    .then((res) => res.results)
    .then((movies) =>
      movies.map((movie) => ({
        name: movie.title,
        director: movie.director,
        release: movie.release_date,
        episodeID: movie.episode_id,
      }))
    );
}

async function listMoviesSorted() {
  const movies = await listMovies();
  return movies.sort(_compareByName);
}

async function listEvenMoviesSorted() {
  const movies = await listMovies();
  return movies
    .filter((movie) => movie.episodeID % 2 === 0)
    .sort(_compareByEpisodeId);
}

function getMovieInfo(id) {
  return fetch(`https://swapi.dev/api/films/${id}/`)
    .then((res) => res.json())
    .then((movie) => ({
      name: movie.title,
      episodeID: movie.episode_id,
      characters: movie.characters,
      director: movie.director,
      release: movie.release_date,
      birth_year: movie.birth_year,
      gender: movie.gender,
      eye_color: movie.eye_color,
    }));
}

function getCharacterName(url) {
  // Necesario para siguientes apartados.
  url = url.replace('http://', 'https://');
  return fetch(url)
    .then((res) => res.json())
    .then((character) => character.name);
}

async function getMovieCharacters(id) {
  const movie = await getMovieInfo(id);
  movie.characters = await _getCharacterNames(movie);
  return movie;
}

async function getMovieCharactersAndHomeworlds(id) {
  const movie = await getMovieInfo(id);
  movie.characters = await _getCharacterNamesAndHomeWorlds(movie);
  return movie;
}

async function _getCharacterNames(movie) {
  const characters = await Promise.all(movie.characters.map(getCharacterName));
  return characters;
}

async function _getCharacterNamesAndHomeWorlds(movie) {
  const charactersWithHomeWorlds = await Promise.all(
    movie.characters.map(_getCharacterNameAndHomeworld)
  );
  return charactersWithHomeWorlds;
}

async function _getCharacterNameAndHomeworld(url) {
  url = url.replace('http://', 'https://');
  const raw = await fetch(url);
  const res = await raw.json();
  const character = { name: res.name, homeworld: res.homeworld };

  character.homeworld = await _getHomeWorldName(character.homeworld);

  return character;
}

async function _getHomeWorldName(url) {
  // Necesario para siguientes apartados.
  url = url.replace('http://', 'https://');
  return fetch(url)
    .then((res) => res.json())
    .then((planet) => planet.name);
}

function _compareByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function _compareByEpisodeId(a, b) {
  return parseFloat(a.episodeID) - parseFloat(b.episodeID);
}

async function _getCharacterPhoto(characterName) {
  const response = await fetch(
    `https://starwars-visualguide.com/assets/img/characters/?search=${characterName}`
  );
  const data = await response.json();
  console.log(data);
  return (imageUrl = data[0].image);
}

async function createMovie(id) {
  const movie = await getMovieInfo(id);
  return new Movie(movie.name, movie.characters);
}

export class Movie {
  #characterUrls = [];

  constructor(name, characterUrls) {
    this.name = name;
    this.#characterUrls = characterUrls;
  }

  async getCharacters() {
    return Promise.all(this.#characterUrls.map(getCharacterName));
  }

  async getHomeworlds() {
    const namesAndHomeworlds = await Promise.all(
      this.#characterUrls.map(_getCharacterNameAndHomeworld)
    );
    const homeworlds = namesAndHomeworlds.map((item) => item.homeworld);
    const uniqueHomeWorldsSet = new Set(homeworlds);
    const uniqueHomeworldArray = Array.from(uniqueHomeWorldsSet);
    return uniqueHomeworldArray;
  }

  async getHomeworldsReverse() {
    const homeworlds = await this.getHomeworlds();
    return homeworlds.sort().reverse();
  }
}

export default {
  getMovieCount,
  listMovies,
  listMoviesSorted,
  listEvenMoviesSorted,
  getMovieInfo,
  getCharacterName,
  getMovieCharacters,
  getMovieCharactersAndHomeworlds,
  createMovie,
  _compareByName,
  _getCharacterPhoto,
};
