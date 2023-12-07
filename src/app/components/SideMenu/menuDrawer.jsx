'use client';
import { useEffect, useState, useCallback } from 'react';
import { Box, List, ListItem } from '@mui/material';
import GroupAccordion from './GroupsTab/groupsAccordion';
import FriendsAccordion from './FriendsTab/friendsAccordion';
import FriendsReqAccordion from './FriendReqTab/friendsReqAccordion';
import Copyright from './Copyright';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MenuDrawer({ session, setCarouselIndex, toggleDrawer }) {
   const [friends, setFriends] = useState({});
   const user = session?.user;

   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
   const color = prefersDarkMode ? '#101313' : '#f1f3f3'

   return (
      <Box
         sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: color,
         }}
      >
         <List sx={{ width: { xs: '80vw', sm: '50vw', lg: '33vw' } }}>
            <ListItem disablePadding>
               <GroupAccordion user={user} friends={friends} setCarouselIndex={setCarouselIndex} toggleDrawer={toggleDrawer}/>
            </ListItem>
            <ListItem disablePadding>
               <FriendsAccordion user={user} onFindFriends={setFriends} />
            </ListItem>
            <ListItem disablePadding>
               <FriendsReqAccordion user={user} />
            </ListItem>
         </List>
         <Copyright />
      </Box>
   );
}
