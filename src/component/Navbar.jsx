import React from 'react';
import { useState, useContext } from 'react';
import { Link  } from 'react-router-dom';
import '../styles/Navbar.css';
import { Box, Typography, Avatar, IconButton, Tooltip, MenuItem, Menu } from '@mui/material';
import MovieContext from '../context/context';
import Stack from '@mui/material/Stack';
import MovieLogo from '../assets/IMDB.png'
function Navbar() {
  
  const {isLoggined, setIsLoggined ,stringAvatar } = useContext(MovieContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
 

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlogOut = (setting) => {
    if(setting === "Logout"){
        setIsLoggined({ check: false });            
        localStorage.removeItem('isLoggined');    // locale storagedeki verileri sildim. 
    }
   
  };

  const settings = ['Logout'];

  return (
    <div>
      <div className="navbar">
        <div className="main">
          <Link to="/">
            <img src={MovieLogo} alt="" /> 
           
          </Link>
          <div className="mainLink">
            <Link to="/" className="homeStyle">
              <span></span>
            </Link>
            {isLoggined.check ? (
              <>
                <Box sx={{ flexGrow: 0 }}>  
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Stack direction="row" spacing={2}>
                        <Avatar className="avatar" {...stringAvatar(isLoggined.name)} />
                      </Stack>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '10px' }}
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
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <span onClick={() => handlogOut(setting)}>{setting}</span>
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <Link to="/login">
                <button className="loginButton">Giriş Yap</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
