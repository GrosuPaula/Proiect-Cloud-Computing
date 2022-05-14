# Kitchen Guide

## Introducere
Aplicația **Kitchen Guide** este o aplicație de tip Single Page Application dezvoltată cu ajutorul librăriei React și librăriei Material UI, pentru o interfață user friendly.

## Descriere
Aplicația **Kitchen Guide** se adresează utilizatorilor care doresc să ajungă rapid la un ghid step by step pentru prepararea unui fel de mâncare sau a unei băuturi. Aplicația a fost gândită pentru a fi ușor de utilizat de catre end-user, astfel pentru autentificare este necesar doar un cont de Google, iar căutarea rețetelor se realizează pe baza unui cuvânt cheie. 
 
## Servicii Cloud
Am ales pentru funcționalitatea aplicației utilizarea platformei Cloud Firebase, datorită ușurinței de folosire a acesteia și documentației complexe pe care o oferă.

1. Firebase Authentication
Serviciul cloud **Firebase Authentication** pune la dispoziție autentificarea rapidă prin diferite servicii precum Google sau Github și oferă persistența autentificării unui utilizator și prezentarea datelor în timp real.
![authentication](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Authentication.png)

2. Firebase Firestore Database
Serviciul cloud **Firebase Firestore Database** permite stocarea preferințelor utilizatorilor. Structura bazei de date se poate observa în imaginea de mai jos.
![db structure](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/DB Structure.png)

## REST API

Am ales pentru funcționalitatea aplicației două API-uri free to use pentru care nu este necesară o cheie de autentificare, iar pentru apelarea acestora am apelat la librăria Axios. 

1. TheCocktailDB
API-ul **TheCocktailDb** se poate accesa prin link-ul: https://www.thecocktaildb.com/api.php.

TheCocktailDb este folosit pentru căutarea băuturilor. Acesta oferă informații despre băutura selectată, precum imagine și instrucțiuni de preparare.

![drink imagine](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Drink Image.png) 

2. TheMealDB
API-ul **TheMealDB** se poate accesa prin link-ul: https://www.themealdb.com/api.php

**TheMealDB** este folosit pentru căutarea rețetelor de mâncare. Acesta oferă informații despre felul de mâncare selectat, precum imagine si link către un video YouTube cu instrucțiunile de reproducere.

![meal image](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Meal Image.png) ![meal youtube video](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Meal Youtube Video.png)


## Flux de date

Utilizatorul va interacționa prima dată cu interfața de autentificare, unde acesta va trebui să se conecteze cu un cont Google. Id-ul acestuia va fi disponibil tuturor componentelor din aplicație, deoarece se va folosi pentru stocarea preferințelor. 

Pentru autentificare se folosește urmatorul apel:
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
Dacă utilizatorul este pentru prima oară autentificat, se vor crea vectorii pentru felul de mâncare și băuturi în documentul propriu.

Odată autentificat, acesta va observa pagina personala **Kitchen Guide**. 

![start page](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Start Page.png)

Inițial utilizatorul nu va vedea niciun produs pe această pagină, iar pentru a adaugă un fel de mâncare sau o băutură acesta poate accesa interfața de feluri de mâncare sau interfața cocktail-uri folosind meniul lateral al aplicației.

![side menu](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Side Menu.png)

1. **Cocktails** - Interfața de băuturi

În cadrul acestei pagini, utilizatorul poate căuta și alege să adauge la pagina personală o băutură pe care dorește să o prepare după un cuvânt cheie.

![add](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Add.png)

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
Textul va fi preluat din input și asignat către parametrul `s`. Datele vor fi stocate într-un vector și afișate prin componenta `CocktailCard`.

Un exemplu de response poate fi vizualizat cu ajutorul link-ului: https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Rose

![drink response](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Drink Response.png)

2. **Meals** - Interfața de feluri de Mâncare

Similar cu interfața de cocktails, felurile de mâncare dorite vor fi căutate după un cuvânt cheie. 

![meal key word](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Meal Key Word.png)

Datele sunt preluate din API-ul TheMealDB, iar un apel de tip `GET` către acesta va arăta in felul urmator: 
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
Textul va fi preluat din input și asignat către parametrul `s`. Datele vor fi stocate într-un vector și afișate prin componenta `MealCard`.

Ulterior, pentru a reveni la pagina personală cu rețetele salvate, se va accesa **Kitchen Guide** din meniul lateral. 

Odată deschisă interfața, daca există produse salvate, acestea vor fi citite din baza de date Firebase Firestore și vor fi afișate. 
![kitchen guide](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Kitchen Guide.png)

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

De asemnea, din această interfață utilizatorul poate șterge rețete salvate din pagina personală. 

![trash](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Trash.png)

Ieșirea din aplicație se face prin apăsarea butonul de LOGOUT din partea dreapta-sus a aplicației. 

![logout](https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Logout.png)

La momentul următoarei logări cu același cont Google, utilizatorul va vedea pe pagina personală rețetele salvate la logările anterioare.

## Publicarea

Aplicația a fost publicată folosind Heroku CLI și poate fi accesată prin link-ul: https://kitchen-guide.herokuapp.com/

## Rularea locala

Pentru a rula proiectul local, se vor folosi comenzile:
```
git clone /insert repository/
cd Proiect-Cloud-Computing
npm install
npm start
```
Pentru siguranță, proiectul folosește un fișier local .env.local unde vor fi stocate cheile către Firebase. Fără acest fișier, proiectul nu va funcționa corespunzător.

## Referințe
1. https://firebase.google.com/docs/auth
2. https://firebase.google.com/docs/firestore
3. https://www.thecocktaildb.com/api.php 
4. https://www.themealdb.com/api.php
5. https://www.npmjs.com/package/axios
6. https://material-ui.com/

## Alte capturi de ecran
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Authentication.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/DB Structure.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Drink Image.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Meal Image.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Meal Youtube Video.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Start Page.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Side Menu.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Add.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Drink Response.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Meal Key Word.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Kitchen Guide.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Trash.png
https://github.com/GrosuPaula/Proiect-Cloud-Computing/blob/master/Logout.png

