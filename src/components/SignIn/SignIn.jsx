import React from 'react';
import "./SignIn.css";
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
 import { auth, database, googleProvider } from '../../firebase';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      maxWidth: 300
       
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  
export const SignIn = ( { setCurrentUserId } ) => {

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

   const createMealsAndCocktailsArray = (userId) => {
        database.collection("users").doc(userId).set({
            meals: [],
            cocktails: []
        })
        .then((docRef) => {
            console.log('User logged in');
        })
        .catch((error) => {
            console.error("Error while logging in");
        });
   }

const classes = useStyles();
  return (
    <div className="centered">
        <Card className={classes.root}>
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Log in to continue to
        </Typography>
        <Typography variant="h5" component="h2">
            My own bistro!
        </Typography>
            <div onClick={() => authenticateUser()} className="google-btn">
                <div className="google-icon-wrapper">
                    <img className="google-icon-svg" src={process.env.PUBLIC_URL + "/logoGoogle.svg"} alt="google icon"/>
                </div>
                <p className="btn-text"><b>Sign in with Google</b></p>
            </div>
        </CardContent>

        </Card>
    </div>
  );
}

