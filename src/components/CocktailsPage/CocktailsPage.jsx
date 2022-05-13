import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { database } from '../../firebase';
import firebase from "firebase/app"
import CocktailCard from '../CocktailCard/CocktailCard';

const useStyles = makeStyles(() => ({
    input: { 
        width: 400,
        marginRight: 40
    },

    cocktailsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 30
    }

  }));
  
export const CocktailsPage = ({currentUserId}) => {
    
    const [cocktailInput, setCocktailInput] = useState('');
    const [cocktails, setCocktails] = useState([]);

    const searchCocktails = () =>{
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', {
            params: {
              s: cocktailInput
            } 
          }).then(res => {
              console.log(res);
            setCocktails(res.data.drinks);
          }).finally(() => {
            
          })
    }

    const addToFavorites = (drink) => {
        console.log(drink)
        database.collection("users").doc(currentUserId).update({
            cocktails: firebase.firestore.FieldValue.arrayUnion(drink)
        })
        .then((docRef) => {
            console.log("Document written");
        })
        .catch((error) => {
            console.error("Error adding meal");
        });
      }

    const handleInputChange = (e) => {
        setCocktailInput(e.target.value);
    }


    const classes = useStyles();

    let displayedCocktails = <></>
    if (cocktails) {
        displayedCocktails = cocktails.map((cocktail, index) => {
            return (
                <CocktailCard addToGuide={addToFavorites} cocktail = {cocktail} key={index}></CocktailCard>
            )
        })
    }
    return (
        <div >
            <h1>Search for a drink to find out how to make it!</h1>
            <TextField className={classes.input} onChange={handleInputChange} id="standard-basic" label="Search for a drink" />
            <Button onClick={() => searchCocktails()} variant="contained" color="primary">
                Search
            </Button>
            <div className={classes.cocktailsContainer}>
                {displayedCocktails}
            </div>
        </div>
    );
}
