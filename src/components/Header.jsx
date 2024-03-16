/* eslint-disable react/prop-types */
// import logo from '../assets/Trendy.png'
import loup from '../assets/search.png'
import { NavLink} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import useAuth from '../hooks/useAuth'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'


export const Header = ({ searchTerm, onSearchChange, onSearch,scroll }) => {

  const {user,logout} = useContext(UserContext)

  const { isLoggedIn , setIsLoggedIn} = useAuth()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleIsLoggedIn=()=>{
    setIsLoggedIn(!isLoggedIn)
  }

  const loginOut = () =>{
    handleIsLoggedIn()
    logout()
    handleCloseUserMenu()
    
  }
  const buttonSearch = ()=>{
    onSearch();
    scroll();
  }
  return (

    <AppBar position="static" color="" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }} > <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /></NavLink>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Trendy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu} component={NavLink} to="/men" >
                  <Typography textAlign="center">Hombre</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={NavLink} to="/women" >
                  <Typography textAlign="center">Mujer</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={NavLink} to="/child" >
                  <Typography textAlign="center">Niño</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button 
                variant='outlined' 
                component={NavLink} to="/men"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' , marginRight: '10px'}}
              >
                Hombre
              </Button>
              <Button 
                variant='outlined'
                component={NavLink} to="/women"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' , marginRight: '10px'}}
              >
                Mujer
              </Button>
              <Button 
                variant='outlined'
                component={NavLink} to="/child"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' , marginRight: '10px'}}
              >
                Niño
              </Button>
          </Box>
          <div style={{display: 'flex', alignItems: 'center', width: '30%', marginRight: "100px"}}>
            <input style={{flexGrow: '1', margin: '0', fontSize: '16px', width: '20%',  height: '1.4em',  border: '2px solid rgba(218, 218, 218, 0.639)', borderRadius: '5px 0px 0px 5px', outline: 'none', backgroundColor: 'white', padding: '7px 10px', transition: 'all 300ms'}} type="text" placeholder='¿Que Buscas?' value={searchTerm} onChange={onSearchChange}/>
             <button style={{margin: '0', borderRadius: "0px 5px 5px 0px", padding: '4px 10px', cursor: 'pointer', outline: 'none' , borderWidth: '2px 2px 2px 0', borderStyle: 'solid' ,borderColor:'rgba(218, 218, 218, 0.639'  }} type='submit' onClick={buttonSearch}><img src={loup} alt="" width='25px' height='auto' /></button>
          </div>
          <Box sx={{ flexGrow: 0 }}>
          {
           isLoggedIn ? <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.user?.name} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem  onClick={handleCloseUserMenu} component={NavLink} to="/profile" > 
                  <Typography textAlign="center">Perfil</Typography>
                </MenuItem>
                { user?.user?.role === 'ADMIN' ?<MenuItem component={NavLink} to="/admin"  onClick={handleCloseUserMenu}><Typography textAlign="center">Herramientas</Typography></MenuItem> : null }
                <MenuItem  onClick={loginOut}>
                  <Typography textAlign="center">Cerrar Sesion</Typography>
                </MenuItem>
              </Menu>
           </>

           :  <Button component={NavLink} to="/Access" variant="outlined">Acceder</Button>
          }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}