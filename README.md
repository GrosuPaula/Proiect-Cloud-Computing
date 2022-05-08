# My own bistro

## Introducere
Aplicația **My own Bistro** este o aplicație de tip Single Page Application dezvoltată cu ajutorul librăriei React și are rolul de a găsi și salva rețete favorite de mâncare și cocktailuri. Pentru o interfață cât mai plăcută, am apelat și la librăria Material UI.

## Descriere problemă
Această aplicație vine în ajutorul utilizatorilor ce doresc să găsească rapid anumite feluri de mâncare sau băuturi. Aplicația a fost gândită să fie cât mai ușor de folosit, astfel utilizatorii vor avea nevoie doar de un cont de Google pentru autentificare, iar căutarea rețetelor se execută prin folosirea unui cuvânt cheie. 
 
## Servicii Cloud
Pentru funcționalitatea aplicației, a fost folosită platforma cloud Firebase, datorită usurinței de folosire a acesteia și documentația complexă pe care o oferă.

1. Firebase Authentication
Acest serviciu pune la dispoziție autentificarea rapidă prin diferite servicii precum Facebook, Google, Github etc. De asemenea, poate oferi și persistența autentificării unui utilizator și poate oferi datele în timp real.
![autentificare](https://user-images.githubusercontent.com/83305311/117572521-e7e80100-b0db-11eb-8078-ec100fed05f4.JPG)

2. Firebase Firestore 
Acest serviciu este folosit pentru stocarea preferințelor utilizatorilor, felurile de mâncare favorite, dar și a cocktail-urilor. Structura bazei de date se poate observa în imaginea de mai jos.
![structura baza de date](https://user-images.githubusercontent.com/83305311/117572755-f97dd880-b0dc-11eb-902d-35857f0fd4b2.JPG)

## REST API

Ambele api-uri sunt free to use și nu este nevoie de o cheie de autentificare. De asemenea, pentru apelarea acestora s-a folosit librăria Axios. 

1. TheMealDB
Acest API se poate regăsi aici: https://www.themealdb.com/api.php

TheMealDB este folosit pentru căutarea rețetelor de mâncare. Acesta oferă date precum imagine și un link către YouTube cu instrucțiunile de reproducere a acesteia.

![meal image](https://user-images.githubusercontent.com/83305311/117572976-2c749c00-b0de-11eb-88e7-feb85321d2ea.JPG) ![meal youtube link](https://user-images.githubusercontent.com/83305311/117573391-38615d80-b0e0-11eb-80c6-eed307ad932e.JPG)

2. TheCocktailDB
Acest api se poate regăsi aici: https://www.thecocktaildb.com/api.php.

TheCocktailDb este folosit pentru căutarea băuturilor răcoritoare. La fel ca TheMealDB, acesta oferă informații similare, precum imagine și instrucțiuni de utilizare, dar nu și link de YouTube.

![drink imagine](https://user-images.githubusercontent.com/83305311/117572958-0c44dd00-b0de-11eb-85c7-7569448045eb.JPG) 

## Flux de date
Utilizatorul va interacționa prima dată cu interfața de autentificare, unde acesta va trebui să se conecteze cu un cont Google. Id-ul acestuia va fi disponibil tuturor componentelor din aplicație, deoarece se va folosi pentru stocarea preferințelor. Odată autentificat, acesta va observa pagina de cocktails. 
![pagina de start](https://user-images.githubusercontent.com/83305311/117572791-3053ee80-b0dd-11eb-9ab2-7e20e3fe70a4.JPG)

În cadrul acestei pagini, utilizatorul poate căuta și alege să adauge la favorite o băutură după un cuvânt cheie.
![plus](https://user-images.githubusercontent.com/83305311/117573084-bde40e00-b0de-11eb-97f5-d417c1f38a50.JPG)

Datele sunt preluate din API-ul TheCocktailDb, iar un apel de tip `GET` către acesta va arăta in felul urmator: 
```
 const searchCocktails = () =>{
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', {
            params: {
              s: cocktailInput
            } 
          }).then(res => {
            setCocktails(res.data.drinks);
          })
    }
```
Unde 's' este un parametru ce reprezintă cuvântul cheie. Datele vor fi stocate într-un vector și afișate prin componenta `CocktailCard`.

Un exemplu de response poate fi vizualizat aici: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
![drink response](https://user-images.githubusercontent.com/83305311/117572848-8163e280-b0dd-11eb-828e-94577d8e2477.JPG)

Utilizatorul poate accesa interfața de feluri de mâncare, deschizând meniul lateral. 

![meniu lateral](https://user-images.githubusercontent.com/83305311/117573114-e0762700-b0de-11eb-85a1-2bafcd58a955.JPG)

Similar cu interfața de cocktails, felurile de mâncare vor fi căutate după un cuvânt cheie. 
![meal cuv cheie](https://user-images.githubusercontent.com/83305311/117573142-08658a80-b0df-11eb-9f45-ed62f32e7f6b.JPG)

Metoda HTTP `GET` în acest caz arată în felul următor: 
```
   const searchMeals = () =>{
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php', {
            params: {
              s: mealInput
            } 
          }).then(res => {
            setMeals(res.data.meals);
          })
    }
```
Textul va fi preluat din input și 'pasat' către parametrul `s`.Datele vor fi stocate într-un vector și afișate prin componenta `MealCard`.

Ulterior, pentru a deschide pagina cu produsele salvate, se va accesa opțiunea 'My Bistro' din meniul lateral. 
![meniu lateral 2](https://user-images.githubusercontent.com/83305311/117573228-66926d80-b0df-11eb-8286-af8775f5663a.JPG)

Odată deschisă interfața, se vor citi din baza de date toate felurile de mâncare și băuturile stocate. 
![my bistro](https://user-images.githubusercontent.com/83305311/117573259-8fb2fe00-b0df-11eb-8ddf-9ec7377da772.JPG)

Aici Firebase vine în ajutor cu propriile metode de apel. Citirea pentru felurile de mâncare se va face în felul următor: 
```
    const getMeals = () =>{
        database.collection("users").doc(currentUserId).get().then((doc) => {
            if (doc.exists) {
                setMeals(doc.data().meals);
            } else {
                console.log("No such document!");
            }
        })
    }
```
Pentru eficiența codului, se vor refolosi componentele `MealCard` și `CocktailCard`.
```
 const removeMealFromFav = (meal) => {
        database.collection("users").doc(currentUserId).update({
            meals: firebase.firestore.FieldValue.arrayRemove(meal)
        })
        .then((docRef) => {  
            setMeals( meals.filter(elem => elem.idMeal !== meal.idMeal));
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
```
De asemnea, din această interfață utilizatorul poate șterge obiectele din favorite. 

![trash](https://user-images.githubusercontent.com/83305311/117573247-7dd15b00-b0df-11eb-899b-bce202bae963.JPG)

De asemenea, pentru autentificare se folosește urmatorul apel:
```
const authenticateUser = () => {
        auth.signInWithPopup(googleProvider).then(res => {
            const userId = res.additionalUserInfo.profile.id;
            if (res.additionalUserInfo.isNewUser) {
                createMealsAndCocktailsArray(userId);
            }
            setCurrentUserId(userId);
        }).catch(err => {
            alert('Error while logging in');
        });
    }
```
Daca utilizatorul este pentru prima oară autentificat, se vor crea vectorii pentru felul de mâncare și băuturi în documentul propriu.

Pentru a ieși din aplicație, utilizatorul va apăsa butonul de LOGOUT din partea dreapta-sus a aplicației. De asemenea, data viitoare cand utilizatorul va accesa aplicația cu același cont, va outea vedea alegerile făcute înainte, altfel, pagina My Bistro va fi goală.
![logout](https://user-images.githubusercontent.com/83305311/117573320-e15b8880-b0df-11eb-93bf-2dd0587fddab.JPG)

## Publicarea
Aplicatia a fost publicata folosind Heroku CLI și poate fi accesată aici: https://my-own-bistro.herokuapp.com/

## Rularea locala
Pentru a rula proiectul local, se vor folosi comenzile:
```
git clone /insert repository/
cd my-own-bistro
npm install
npm start
```
Pentru siguranță, proiectul folosește un fișier local .env.local unde vor fi stocate cheile către firebase. Fără acest fișier, proiectul nu va funcționa corespunzător.

## Referințe
1. https://firebase.google.com/docs/auth
2. https://firebase.google.com/docs/firestore
3. https://www.themealdb.com/api.php
4. https://www.thecocktaildb.com/api.php
5. https://www.npmjs.com/package/axios
6. https://material-ui.com/

## Alte capturi de ecran
https://github.com/GrosuPaula/my-own-bistro/blob/main/my-own-bistro/Screenshot1.png
https://github.com/GrosuPaula/my-own-bistro/blob/main/my-own-bistro/Screenshot2.png
https://github.com/GrosuPaula/my-own-bistro/blob/main/my-own-bistro/Screenshot3.png
https://github.com/GrosuPaula/my-own-bistro/blob/main/my-own-bistro/Screenshot4.png
https://github.com/GrosuPaula/my-own-bistro/blob/main/my-own-bistro/Screenshot5.png
