import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListIcon from '@mui/icons-material/List';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { UserContext } from './../context/UserContext';


export const SideBarAdmin = () => {

  const {user} = React.useContext(UserContext)

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };



  return (
    <>
      <Button onClick={toggleDrawer(true)} sx={{ marginLeft: 2 }}><ListIcon sx={{ fontSize: 50 }}/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            <ListItemText primary={user.user.name} style={{ fontSize: '2rem', margin: '1rem' }} />
            <ListItem disablePadding >
              <ListItemButton component={NavLink} to="/admin/add-branch">
                <ListItemText primary="Crear Marca" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding >
              <ListItemButton component={NavLink} to="/admin/drop-branch">
                <ListItemText primary="Editar Marca" />
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem disablePadding >
              <ListItemButton component={NavLink} to="/admin/add-category">
                <ListItemText primary="Crear Categoria" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding >
              <ListItemButton component={NavLink} to="/admin/drop-category">
                <ListItemText primary="Editar Categoria" />
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem disablePadding >
              <ListItemButton component={NavLink} to="/admin/add-product">
                <ListItemText primary="Crear Producto" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding >
              <ListItemButton component={NavLink} to="/admin/drop-product">
                <ListItemText primary="Editar Producto" />
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem disablePadding >
              <ListItemButton component={NavLink} to="/">
                <ListItemText primary="volver" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
