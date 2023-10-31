'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
   Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from './SideMenu/menuDrawer'
import TransitionsModal from './Modal/modal';
import AccountForm from './Forms/account-form';

export default function Navbar({ session }) {
   const [anchorElUser, setAnchorElUser] = useState(null);
   const [userSession, setUserSession] = useState(session);
   const [drawerOpen, setDrawerOpen] = useState({
      left: false,
      right: false,
   });

   const { push } = useRouter();
   
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
                        <MenuItem
                              key='1'
                              onClick={handleCloseUserMenu}
                           >
                                 <TransitionsModal text={'Profile'} contents={<AccountForm session={userSession}/>}/>
                              
                           </MenuItem>

                           <form id='logout' action="/auth/signout" method="post">
                              
                           </form>
                           <MenuItem
                              key='2'
                              onClick={()=>{document.getElementById("logout").submit()}}
                           >
                              <Button textAlign='center'>
                                 Logout
                              </Button>
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
               <MenuDrawer session={userSession}/>
            </SwipeableDrawer>
         </AppBar>
      );
   //}
}
