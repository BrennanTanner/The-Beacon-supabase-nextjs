'use client';
import { useCallback, useEffect, useState } from 'react';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FriendCard from './friendCard';
import { getFriends } from '@/services/dataFetchers';

export default function FriendAccordion({ user }) {
   const [loading, setLoading] = useState(true);
   const [expanded, setExpanded] = useState(false);
   const [friends, setFriends] = useState([]);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const friendData = useCallback(async ()=> {
      setLoading(true);
      setFriends(await getFriends(user));
      setLoading(false);
   }, [user, getFriends]);

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
            <Typography sx={{ width: '50%', flexShrink: 0 }}>
               Friends
            </Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>
               I am an accordion
            </Typography> */}
         </AccordionSummary>
         <AccordionDetails>
            {friends.map((friend) => (
               <FriendCard friend={friend} key={friend.id} />
            ))}
         </AccordionDetails>
      </Accordion>
   );
}
