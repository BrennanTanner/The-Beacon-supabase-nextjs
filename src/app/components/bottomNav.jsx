'use client';
import { useCallback, useEffect, useState } from 'react';
import FlareIcon from '@mui/icons-material/Flare';
import GroupIcon from '@mui/icons-material/Group';
import LoginIcon from '@mui/icons-material/Login';
import {
   Paper,
   Box,
   List,
   BottomNavigation,
   BottomNavigationAction,
   Avatar,
   useMediaQuery,
   SwipeableDrawer,
} from '@mui/material';
import MenuDrawer from './SideMenu/menuDrawer'

export default function BottomNav({ session }) {
   const [activeTab, setActiveTab] = useState('beacon');
   const [avatarUrl, setAvatarUrl] = useState('');
   const user = session?.user;
   const mobile = useMediaQuery('(max-width:600px)');
   const [drawerOpen, setDrawerOpen] = useState({
      left: false,
      right: false,
   });

   const toggleDrawer = (anchor, open) => (event) => {
      if (
         event &&
         event.type === 'keydown' &&
         (event.key === 'Tab' || event.key === 'Shift')
      ) {
         return;
      }
      if (!open){
        setActiveTab('beacon');
      }
      setDrawerOpen({ ...drawerOpen, [anchor]: open });
   };

   useEffect(() => {
      if (user) {
         setAvatarUrl(user.user_metadata.avatar_url);
      }
   }, [user]);

   const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
   };

   if (mobile) {
      return (
         <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
         >
            <BottomNavigation
               sx={{ width: '100%' }}
               value={activeTab}
               onChange={handleTabChange}
            >
               <BottomNavigationAction
                  label='Friends'
                  value='friends'
                  icon={<GroupIcon />}
                  onClick={toggleDrawer('left', true)}
               />
               <BottomNavigationAction
                  label='Beacon'
                  value='beacon'
                  icon={<FlareIcon />}
               />
               <BottomNavigationAction
                  label='My Account'
                  value='my Account'
                  icon={
                     <Avatar
                        alt=''
                        src={avatarUrl}
                     />
                  }
                  onClick={toggleDrawer('right', true)}
               />
            </BottomNavigation>
            <SwipeableDrawer
               anchor='right'
               open={drawerOpen['right']}
               onClose={toggleDrawer('right', false)}
               onOpen={toggleDrawer('right', true)}
            >
              <FriendDrawer anchor={'right'}/>
            </SwipeableDrawer>
            <SwipeableDrawer
               anchor='left'
               open={drawerOpen['left']}
               onClose={toggleDrawer('left', false)}
               onOpen={toggleDrawer('left', true)}
            >
               <FriendDrawer anchor={'left'}/>
            </SwipeableDrawer>
         </Paper>
      );
   }
}
