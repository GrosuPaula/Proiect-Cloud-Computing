import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close'
import { CardHeader, Link, Snackbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345, 
    minWidth: 300,
    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function MealCard({ meal, addToBistro, removeFromBistro}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

 const addToFavorites = () => {
     openSnackBar('Image added to favorites');
     let mealToSave = {
         idMeal: meal.idMeal,
         strMeal: meal.strMeal,
         strMealThumb: meal.strMealThumb,
         strYoutube: meal.strYoutube
     }

     addToBistro(mealToSave);
  }

  const removeFromFavorites = () => {
    openSnackBar('Image removed from favorites');
    removeFromBistro(meal);
 }

  const openSnackBar = (message) => {
    setOpen(true);
    setMessage(message);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const openLink = (link) => window.open(link, '_blank');;

  return (
      <div>
    <Card className={classes.root}>
        <CardHeader action={ 

          addToBistro ? 
          ( <IconButton onClick={() => addToFavorites()} aria-label="add to favorites">
          <AddCircleOutlineIcon color="primary" />
          </IconButton>)
          :
          ( <IconButton onClick={() => removeFromFavorites()} aria-label="Remove from favorites">
              <DeleteIcon color="primary" />
              </IconButton>)


           }
            title={<Typography variant="h6" color="textSecondary" >
              {meal.strMeal}
          </Typography>}>
        </CardHeader>
      
      <CardMedia
        className={classes.media}
        image= {meal.strMealThumb}
      />

      <CardContent>
        <Link onClick={() => openLink(meal.strYoutube)} >
            Learn how to cook it
         </Link>
      </CardContent>

    </Card>
     <Snackbar
     anchorOrigin={{
       vertical: 'bottom',
       horizontal: 'center',
     }}
     open={open}
     autoHideDuration={2000}
     onClose={handleClose}
     message={message}
     action={
       <React.Fragment>
         <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
           <CloseIcon fontSize="small" />
         </IconButton>
       </React.Fragment>
     }
   />
   </div>
  );
}
