import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import MealCard from '../MealCard/MealCard';
import { database } from '../../firebase';
import firebase from "firebase/app"
import CocktailCard from '../CocktailCard/CoktailCard';

const useStyles = makeStyles(() => ({
    input: { 
        width: 400,
        marginRight: 40
    },

    mealsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 30
    }

  }));
  
export const BistroPage = ({currentUserId}) => {
    
    useEffect(() => {
        getMeals();
        getDrinks();
    },[])

    const [cocktails, setCocktails] = useState([]);
    const [meals, setMeals] = useState([]);

    const getMeals = () =>{
        database.collection("users").doc(currentUserId).get().then((doc) => {
   
            if (doc.exists) {
                setMeals(doc.data().meals);
            } else {
                console.log("No such document!");
            }
        })
    }

    const getDrinks = () => {
        database.collection("users").doc(currentUserId).get().then((doc) => {
   
            if (doc.exists) {
                setCocktails(doc.data().cocktails);
            } else {
                console.log("No such document!");
            }
        })
      }

    const removeMealFromFav = (meal) => {
        database.collection("users").doc(currentUserId).update({
            meals: firebase.firestore.FieldValue.arrayRemove(meal)
        })
        .then((docRef) => {  
            setMeals( meals.filter(elem => elem.idMeal !== meal.idMeal));
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    const removeCocktailFromFav = (drink) => {
        database.collection("users").doc(currentUserId).update({
            cocktails: firebase.firestore.FieldValue.arrayRemove(drink)
        })
        .then((docRef) => {
            setCocktails( cocktails.filter(elem => elem.idDrink !== drink.idDrink));
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }


    const classes = useStyles();

    let displayedMeals = <></>
    if (meals) {
        displayedMeals = meals.map((meal, index) => {
            return (
                <MealCard removeFromBistro={removeMealFromFav} meal = {meal} key={index}></MealCard>
            )
        })
    }
    
    let displayedCocktails = <></>
    if (cocktails) {
        displayedCocktails = cocktails.map((cocktail, index) => {
            return (
                <CocktailCard removeFromBistro={removeCocktailFromFav} cocktail = {cocktail} key={index}></CocktailCard>
            )
        })
    }

    return (
        <div >
            <h1>This is your perfect Bistro </h1>
            <h3>Your favorite meals</h3>
            <div className={classes.mealsContainer}>
                {meals.length === 0 ? <p>No meals selected</p> : displayedMeals}
            </div>

            <h3>Your favorite drinks</h3>
            <div className={classes.mealsContainer}>
                {cocktails.length === 0 ? <p>No drinks selected</p> : displayedCocktails}
            </div>
        </div>
    );
}
