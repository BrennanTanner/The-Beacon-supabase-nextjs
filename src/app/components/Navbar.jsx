'use client';
import React, {useState, useEffect } from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from './SideMenu/menuDrawer';
import TransitionsModal from './Modal/modal';
import AccountForm from './Forms/account-form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import OneSignal from 'react-onesignal'


export default function Navbar({ session }) {
   const supabase = createClientComponentClient();

   const [anchorElUser, setAnchorElUser] = useState(null);
   const [userSession, setUserSession] = useState(session);
   const [drawerOpen, setDrawerOpen] = useState({
      left: false,
      right: false,
   });

   const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

   const [oneSignalInitialized, setOneSignalInitialized] = useState(false);

   /**
    * Initializes OneSignal SDK for a given Supabase User ID
    * @param uid Supabase User ID
    */
   const initializeOneSignal = async (uid) => {
      if (oneSignalInitialized) {
         return;
      }
      setOneSignalInitialized(true);
      await OneSignal.init({
         appId: oneSignalAppId,
         notifyButton: {
            enable: true,
         },

         allowLocalhostAsSecureOrigin: true,
      });

      await OneSignal.login(uid);
   };

    useEffect(() => {
       const authListener = supabase.auth.onAuthStateChange(
          async (event, session) => {
             const user = session?.user ?? null;
             if (user) {
                initializeOneSignal(session.user.id);
             }
          }
       );

       return () => {
          authListener.data.subscription.unsubscribe();
       };
    }, []);

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

   //   if (!mobile) {
   return (
      <AppBar position='static'>
         <Container maxWidth='xl'>
            <Toolbar disableGutters>
               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
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
               <Typography
                  variant='h5'
                  noWrap
                  component='a'
                  href='#app-bar-with-responsive-menu'
                  sx={{
                     mr: 2,
                     display: { xs: 'flex', md: 'flex' },
                     flexGrow: 1,
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
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
      </AppBar>
   );
   //}
}
