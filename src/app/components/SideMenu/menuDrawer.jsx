'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import GroupAccordion from './GroupsTab/groupsAccordion';
import FriendsAccordion from './FriendsTab/friendsAccordion';

export default function MenuDrawer({ anchor }) {
   return (
      <List sx={{ maxWidth: '80vw' }}>
         <ListItem disablePadding>
            <GroupAccordion />
         </ListItem>
         <ListItem disablePadding>
            <FriendsAccordion />
         </ListItem>
      </List>
   );
}
