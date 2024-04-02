[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/EJqO7RBg)
# StarWars API - Part 2 - Interacció amb el DOM

![alt text](/public/assets/battle-bg.jpg)

## Presentació

En aquesta pràctica es treballa la interacció amb el DOM mitjançant JavaScript. Utilitzarem el cas d'estudi presentat a l'Act 6 per realitzar interaccions amb el DOM a partir de les dades de l'API web per consultar informació sobre la saga de pel·lícules de Star Wars (personatges, llocs, vehicles, etc.). Us oferim un web ja maquetat perquè us pugueu centrar en la implementació del codi JavaScript demanat als exercicis.

## Cas d'estudi

Aquesta pràctica et convido a continuar fent ús del codi que tenies de la teva Activitat prèvia de SWaPI. Com ja hem comentat, en la nostra aplicació web volem oferir una sèrie de funcionalitats per explorar l'univers de Star Wars. Així, alguns exemples de consultes poden ser: 

- Mostrar els personatges de les pel·lícules
- Filtrar per planetes i/o races
- Buscar un personatge en concret

L'origen de les dades de la nostra aplicació és l'API oberta i gratuïta, anomenada SWAPI (Star Wars API), que ja coneixeu de la pràctica anterior: https://swapi.info/

## L'aplicació web

En aquesta pràctica us facilitem una estructura de l'aplicació web que volem desenvolupar. La web contindrà:

- Una capçalera amb el logotip.
- Una barra lateral amb selectors per filtrar per pel·lícula i planeta.
- Un panell central amb informació sobre els personatges, les pel·lícules i informació de les pel·lícules, si n'hi ha alguna seleccionada.
- Un cercador per filtrar entre els personatges que es mostren en el llistat.

## Com iniciar el desenvolupament

Per realitzar aquesta pràctica teniu dues opcions:

- Us animo a utilitzar utilitzar la vostra solució de la pràctica 6. Aquesta opció requerirà fer algunes petites modificacions per adaptar-la a les necessitats d'aquesta pràctica. Aquestes modificacions es detallen en cada exercici.
- Pots també utilitzar la solució oficial de la pràctica 6 que ja tens en aquest repositori (tot i que t'hauràs de fer amb els "namings" que jo he fet servir).

Teniu llibertat per triar la opció que us convingui més. En qualsevol cas, per facilitar i normalitzar l'avaluació de la pràctica 7, heu de seguir aquestes indicacions:

- Amb aquesta pràctica es proporcionarà tant un **fitxer HTML** com un **CSS** amb els estils necessaris. 

## Tasques a realitzar

En aquesta pràctica , heu de implementar les funcionalitats necessàries perquè el model desenvolupat a la pràctica anterior pugui interactuar amb el codi HTML proporcionat.

És convenient separar sempre la lògica del controlador de les crides a la vista. Per això, es demana que implementeu totes les funcionalitats demanades als següents exercicis en un únic fitxer `./src/act7.js` i que feu les crides a aquestes funcions en el fitxer `./src/index.js`, que ha d'importar `act7.js`.

No heu de modificar ni afegir cap altre fitxer, tret del fitxer de proves, si decidiu fer-ne.

### Consideracions globals:

- Compte! Recorda qeu l'identificador de l'episodi no es correspon amb l'identificador de la pel·lícula.

## Exercici 1

Implementeu una funció `setMovieHeading()` que, donats els paràmetres definits a continuació, substitueixi el contingut de l'encapçalament de la pel·lícula modificant el DOM.

Paràmetres d'entrada:

- `movieId`: Identificador de la pel·lícula
- `titleSelector`: selector HTML de la ubicació del títol
- `infoSelector`: selector HTML de la ubicació de la informació addicional de la pel·lícula
- `directorSelector`: selector HTML de la ubicació de la informació del director.

Consideracions:

- Heu de fer servir la funció `getMovieInfo()` implementada a la pràctica 6.
- Si feu servir la vostra pròpia solució de la pràctica 6, necessitareu que l'objecte retornat per la funció `getMovieInfo()` inclogui els altres camps necessaris:
  - director
  - release
  - episodeId

Codi resultant:
Només en aquest exercici i a manera de guia, us proporcionem comentaris dins de la funció a implementar que detallen les accions que heu de realitzar:

```javascript
src / index.js;
export async function setMovieHeading(
  movieId,
  titleSelector,
  infoSelector,
  directorSelector
) {
  // TODO: Obtenim els elements del DOM amb `querySelector` i els emmagatzemem en una variable
  // TODO: Obtenim la informació de la pel·lícula cridant al mètode de `swapi.js`
  // TODO: Substituïm les dades fent servir un mètode de reemplaçament com `innerHTML`
}
```

Per provar el funcionament es necessari cridar a la funció passant com paràmetres els selectors de classe existents a HTML. Fieux-vos que com que exportem diverses funcions com a default, cal importar-les totes i cridar-les una a una:

```javascript
import act7.js from './act7.js';
console.log('Benvingut a JS per programadors');
// Inicialitza les funcions bàsiques
pec3.setMovieHeading(1, '.movie__title', '.movie__info', '.movie__director');
```

Exemple del codi generat:

```html
<div class="movie">
  <h2 class="movie__title">A New Hope</h2>
  <h4 class="movie__info">Episodi 4 - 1977-05-25</h4>
  <p class="movie__director">Director: George Lucas</p>
</div>
```

## Exercici 2

Implementeu una funció `initMovieSelect()` que reemplaci els valors del selector de pel·lícules amb les dades obtingudes de l'API. Als valors retornats per l'API cal afegir-hi una opció més per al cas inicial "Selecciona una pel·lícula". Aquesta opció ha de ser la primera que apareixi al selector de pel·lícules.

Paràmetres d'entrada:

- `selector`: Selector HTML del selector de pel·lícules.

Consideracions:

- Heu de fer servir la funció `listMoviesSorted()` implementada a la pràctica 6.
- La funció s'ha de cridar des del fitxer `./index.js`. Podeu col·locar la crida just després de la crida a la funció `setMovieHeading()` implementada a l'exercici anterior.

Exemple del codi generat:

```html
<select id="select-movie" name="movie">
  <option value="">Selecciona una pel·lícula</option>
  <option value="4">A New Hope</option>
  <option value="2">Atac dels clons</option>
  <option value="6">El retorn del Jedi</option>
  <option value="3">La venjança dels Sith</option>
  <option value="5">L'Imperi contraataca</option>
  <option value="1">La menaceja fantasma</option>
</select>
```

## Exercici 3

Implementeu una funció `setMovieSelectCallbacks()` que creï un event listener per a l'esdeveniment `change` del selector de pel·lícules. D'aquesta manera, cada cop que el selector de pel·lícules canviï de valor, s'actualitzarà la informació de la pel·lícula a la capçalera de l'aplicació. Recordeu que si s'escull l'opció "Selecciona una pel·lícula", la capçalera s'ha de buidar.

Consideracions:

- Heu de fer servir la funció `getMovieInfo()` implementada a la pràctica 6.
- La funció s'ha de cridar des del fitxer `./index.js`.

## Exercici 4

Afegiu el codi necessari a l'event listener de l'esdeveniment `change` del selector de pel·lícules (implementat a l'exercici anterior) perquè també realitzi les següents accions (en l'ordre especificat):

- Buidar el selector de "homeworld".
- Carregar tots els planetes dels personatges de la pel·lícula seleccionada en el selector de "homeworld". Als valors retornats per l'API cal afegir-hi una opció més per al cas inicial "Selecciona un homeworld". Aquesta opció ha de ser la primera que apareixi al selector de planetes.
- Eliminar totes les fitxes de personatges que hi hagi a la pantalla.

Consideracions:

- Heu de fer servir la funció `getMovieCharactersAndHomeworlds()` implementada a la pràctica 6.
- Si no ho heu fet a l'activitat 6, haurieu d'eliminar els 'homeworlds' repetits, així com ordenar-los alfabèticament.
- La funció s'ha de cridar des del fitxer `./index.js`.

## Exercici 5

Implementeu una funció `addChangeEventToSelectHomeworld()` que creï un event listener per a l'esdeveniment `change` del selector de planetes perquè, quan es seleccioni un planeta, es realitzin les següents accions (en l'ordre especificat):

- Eliminar totes les fitxes de personatges que hi hagi a la pantalla.
- Crear les fitxes de tots els personatges que apareguin a la pel·lícula seleccionada i que, a més, pertanyin al planeta seleccionat (les dues condicions). Òbviament, només es poden carregar les fitxes dels personatges si els dos selectors (pel·lícules i planetes) tenen un valor vàlid seleccionat.

Consideracions:

- Heu de fer servir la funció `getMovieCharactersAndHomeworlds()` implementada a la pràctica 6.
- Si feu servir la vostra pròpia solució de la pràctica 6, necessitareu que l'objecte retornat per la funció `getMovieCharactersAndHomeworlds()` inclogui els altres camps necessaris per formar la fitxa del personatge:
  - any de naixement
  - color dels ulls
  - gènere
- La funció s'ha de cridar des del fitxer `./index.js`.

## Exercici 6

A l'arxiu `/public/assets/people` trobaràs un conjunt d'imatges amb els personatges de Star Wars. El número que du com a títol cada imatge és l'identificador del personatge. Fes les modificacions pertinents al codi de manera que puguis mostrar també la imatge del personatge a la fitxa.

Pots mirar també d'implementar que mostri algun missatge per pantalla si sembla que no troba cap personatge per al planeta seleccionat.

Fes un cop d'ull a la informació de la API a veure si podries fer alguna millor en la cerca de personatges de cada planeta i incopora-ho al codi (swapi.js).
