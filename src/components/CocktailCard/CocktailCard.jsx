import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { CardHeader, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete';

 
const useStyles = makeStyles(() => ({
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

export default function CocktailCard({ cocktail, addToGuide, removeFromGuide}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isModalOpened, setOpenModal] = useState(false);
  const [message, setMessage] = React.useState('');

 const addToFavorites = () => {
     openSnackBar('Drink added to guide');
     let cocktailToSave = {
         idDrink: cocktail.idDrink,
         strDrink: cocktail.strDrink,
         strDrinkThumb: cocktail.strDrinkThumb,
         strInstructions: cocktail.strInstructions
     }

     addToGuide(cocktailToSave);
  }

  const removeFromFavorites = () => {
    openSnackBar('Drink removed from guide');
    removeFromGuide(cocktail);
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

  const toggleModal = () => {
      setOpenModal(!isModalOpened);
  }

  return (
      <div>
    <Card onClick={() => toggleModal()} className={classes.root}>
        <CardHeader action={ 

                addToGuide ? 
                    ( <IconButton onClick={() => addToFavorites()} aria-label="add to favorites">
                    <AddCircleOutlineIcon color="primary" />
                </IconButton>)
                    :
                    ( <IconButton onClick={() => removeFromFavorites()} aria-label="Remove from favorites">
                        <DeleteIcon color="primary" />
                        </IconButton>)

            // <IconButton onClick={() => addToFavorites()} aria-label="add to favorites">
            //         <AddCircleOutlineIcon color="primary" />
            // </IconButton>
            }


            title={<Typography variant="h6" color="textSecondary" >
              {cocktail.strDrink}
          </Typography>}>
        </CardHeader>
      
      <CardMedia
        className={classes.media}
        image= {cocktail.strDrinkThumb}
      />

      <CardContent>
         <Typography variant="body1" color="textSecondary" component="p">
            {cocktail.strAlcoholic}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="p">
            Instructions
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            {cocktail.strInstructions}
        </Typography>
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
