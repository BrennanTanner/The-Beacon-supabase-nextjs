'use client';
import React, { useState, useEffect } from 'react';
import {
   AppBar,
   Box,
   Toolbar,
   IconButton,
   Typography,
   Menu,
   Container,
   Avatar,
   Tooltip,
   MenuItem,
   SwipeableDrawer,
   Button,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from './SideMenu/menuDrawer';
import TransitionsModal from './Modal/modal';
import AccountForm from './Forms/account-form';
import SubscribeForm from './Forms/subscribe-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { darkThemeOptions } from '../styles/mui-theme-dark';
import { lightThemeOptions } from '../styles/mui-theme-light';
import { checkNotifications, getBrowserName, isInSta } from '@/services/pushManager';

export default function Navbar({ session }) {
   const [anchorElUser, setAnchorElUser] = useState(null);
   const [userSession, setUserSession] = useState(session);
   const [displaySubscribe, setDisplaySubscribe] = useState(false);
   const [drawerOpen, setDrawerOpen] = useState({
      left: false,
      right: false,
   });

   useEffect(() => {
      if (
         getBrowserName() == 'Safari' 
      ) {

         
         //need to figure out why this throwserrors in IOS all of the sudden
         //isInStandaloneMode();
         setDisplaySubscribe(true);
         //alert(window.Notification.permission);
      }
      else{
      checkNotifications();
      }
   });

   const toggleDrawer = (anchor, open) => (event) => {
      if (
         event &&
         event.type === 'keydown' &&
         (event.key === 'Tab' || event.key === 'Shift')
      ) {
         return;
      }
      setDrawerOpen({ ...drawerOpen, [anchor]: open });
   };

   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
   const theme = createTheme(
      prefersDarkMode ? darkThemeOptions : lightThemeOptions
   );
   return (
      <ThemeProvider theme={theme}>
         <AppBar position='static'>
            <Container maxWidth='xl' sx={{ backgroundColor: '#323842' }}>
               <Toolbar disableGutters>
                  <Box
                     sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}
                  >
                     <IconButton
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={toggleDrawer('left', true)}
                        color='inherit'
                     >
                        <MenuIcon />
                     </IconButton>
                  </Box>
                  <Typography variant='h3' noWrap>
                     The Beacon
                  </Typography>

                  <Box sx={{ flexGrow: 0 }}>
                     <Tooltip title='Open settings'>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                           <Avatar
                              alt='Remy Sharp'
                              src={session.user.user_metadata.avatar_url}
                           />
                        </IconButton>
                     </Tooltip>

                     <Menu
                        sx={{ mt: '45px' }}
                        id='menu-appbar'
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
                        <MenuItem key='1' onClick={handleCloseUserMenu}>
                           <TransitionsModal
                              text={'Profile'}
                              contents={<AccountForm session={userSession} />}
                           />
                        </MenuItem>

                        <form
                           id='logout'
                           action='/auth/signout'
                           method='post'
                        ></form>
                        <MenuItem
                           key='2'
                           onClick={() => {
                              document.getElementById('logout').submit();
                           }}
                        >
                           <Button>Logout</Button>
                        </MenuItem>
                     </Menu>
                  </Box>
               </Toolbar>
            </Container>
            <SwipeableDrawer
               anchor='left'
               open={drawerOpen['left']}
               onClose={toggleDrawer('left', false)}
               onOpen={toggleDrawer('left', true)}
            >
               <MenuDrawer session={userSession} />
            </SwipeableDrawer>
            
            {displaySubscribe && (
               <Box>
               <Typography>Subscribe to push notifications -&gt;</Typography>
               <TransitionsModal
                  text={'Subscribe'}
                  contents={<SubscribeForm />}
                  session={userSession}
               /></Box>
            )}
         </AppBar>
      </ThemeProvider>
   );
}
