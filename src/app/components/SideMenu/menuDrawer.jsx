'use client';
import { useEffect, useState, useCallback } from 'react';
import { Box, List, ListItem } from '@mui/material';
import GroupAccordion from './GroupsTab/groupsAccordion';
import FriendsAccordion from './FriendsTab/friendsAccordion';
import FriendsReqAccordion from './FriendReqTab/friendsReqAccordion';
import Copyright from './Copyright';

export default function MenuDrawer({ session }) {
   
   const user = session?.user;

   return (
      <Box
         sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
         }}
      >
         <List sx={{ width: { xs: '80vw', sm: '50vw', lg: '33vw' } }}>
            <ListItem disablePadding>
               <GroupAccordion user={user} />
            </ListItem>
            <ListItem disablePadding>
               <FriendsAccordion user={user} />
            </ListItem>
            <ListItem disablePadding>
               <FriendsReqAccordion user={user} />
            </ListItem>
         </List>
         <Copyright />
      </Box>
   );
}
