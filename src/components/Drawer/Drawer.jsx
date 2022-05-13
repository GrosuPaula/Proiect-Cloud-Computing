import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import KitchenIcon from '@material-ui/icons/Kitchen';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

const drawerWidth = 260;

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
      width: drawerWidth 
  },
  drawerPaper: {
    width: drawerWidth
  },
  root: {
      display: 'flex'
  }
});

export default function DrawerMenu({ toggleDrawer, isDrawerOpened, setPage }) {
  const classes = useStyles();

  const menuItems = [
        {
            text: 'Cocktails',
            value: 'cocktails',
            icon: <LocalBarIcon color="primary"></LocalBarIcon>
        },
        {
            text: 'Meals',
            value: 'meals',
            icon: <KitchenIcon color="primary"></KitchenIcon>
        },
        {
            text: 'Kitchen Guide',
            value: 'guide',
            icon: <RestaurantMenuIcon color="primary"></RestaurantMenuIcon>
        }
  ]

  const setCurrentPage = (value) => {
    setPage(value);
  }

  return (
    <div className={classes.root}>
   
        
        
          <Drawer className={classes.drawer} 
       
            anchor='left' 
            open={isDrawerOpened} 
            onClose={toggleDrawer}
            classes={{paper: classes.drawerPaper}}>
            

            <List>
            {menuItems.map((item, index) => (
          <ListItem onClick={() => setCurrentPage(item.value)} button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List> 
          </Drawer>
       
      
    </div>
  );
}
