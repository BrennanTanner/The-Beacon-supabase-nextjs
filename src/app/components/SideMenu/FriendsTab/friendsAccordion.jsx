'use client';
import { useCallback, useEffect, useState } from 'react';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Typography,
   Card,
   CardContent,
   CardActionArea,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import FriendCard from './friendCard';
import { getFriends } from '@/services/dataFetchers';
import FriendForm from '../../Forms/friend-form';
import TransitionsModal from '../../Modal/modal';

export default function FriendAccordion({ user, onFindFriends }) {
   const [loading, setLoading] = useState(true);
   const [expanded, setExpanded] = useState(false);
   const [friends, setFriends] = useState([]);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const friendData = useCallback(async () => {
      setLoading(true);
      const friendList = await getFriends(user);
      setFriends(friendList);
      onFindFriends(friendList);
      setLoading(false);
   }, [user, getFriends, onFindFriends]);

   useEffect(() => {
      friendData();
   }, []);

   return (
      <Accordion
         expanded={expanded === 'panel1'}
         onChange={handleChange('panel1')}
         sx={{ width: '100%' }}
      >
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
         >
            <Typography variant='h4' sx={{ flexShrink: 0 }}>
               Friends
            </Typography>
         </AccordionSummary>
         <AccordionDetails>
            <TransitionsModal
               text={'Add Friend'}
               contents={<FriendForm session={user} friends={friends} />}
            />

            {friends.map((friend) => (
               <FriendCard friend={friend} key={friend.id} />
            ))}
         </AccordionDetails>
      </Accordion>
   );
}
