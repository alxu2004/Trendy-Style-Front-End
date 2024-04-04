import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListIcon from '@mui/icons-material/List'
import ListItemText from '@mui/material/ListItemText'
import { NavLink } from 'react-router-dom'
import { UserContext } from './../context/UserContext'

export const SideBarProfile = () => {
  const { user } = React.useContext(UserContext)

  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <Button onClick={toggleDrawer(true)} sx={{ marginLeft: 2 }}>
        <ListIcon sx={{ fontSize: 50 }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItemText
              primary={user.user.name}
              style={{ fontSize: '2rem', margin: '1rem' }}
            />
            <Divider />
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to='/profile/my-acount'>
                <ListItemText primary='Mi Cuenta' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding></ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to='/'>
                <ListItemText primary='volver' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
