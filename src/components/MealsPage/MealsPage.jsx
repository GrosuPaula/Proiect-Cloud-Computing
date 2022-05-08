import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import MealCard from '../MealCard/MealCard';
import { database } from '../../firebase';
import firebase from "firebase/app"

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
  
export const MealsPage = ({currentUserId}) => {
    
    const [mealInput, setMealInput] = useState('');
    const [meals, setMeals] = useState([]);

    const searchMeals = () =>{
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php', {
            params: {
              s: mealInput
            } 
          }).then(res => {
            setMeals(res.data.meals);
          }).finally(() => {
            
          })
    }

    const addToFavorites = (meal) => {
        database.collection("users").doc(currentUserId).update({
            meals: firebase.firestore.FieldValue.arrayUnion(meal)
        })
        .then((docRef) => {
            console.log("Document written");
        })
        .catch((error) => {
            console.error("Error adding meal");
        });
      }

    const handleInputChange = (e) => {
        setMealInput(e.target.value);
    }


    const classes = useStyles();

    let displayedMeals = <></>
    if (meals) {
        displayedMeals = meals.map((meal, index) => {
            return (
                <MealCard addToBistro={addToFavorites} meal = {meal} key={index}></MealCard>
            )
        })
    }
    return (
        <div >
            <h1>Search for a delicious meal!</h1>
            <TextField className={classes.input} onChange={handleInputChange} id="standard-basic" label="Search for a meal" />
            <Button onClick={() => searchMeals()} variant="contained" color="primary">
                Search
            </Button>
            <div className={classes.mealsContainer}>
                {displayedMeals}
            </div>
        </div>
    );
}
