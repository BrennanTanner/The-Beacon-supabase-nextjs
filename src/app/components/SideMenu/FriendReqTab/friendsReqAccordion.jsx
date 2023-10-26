'use client';
import { useCallback, useEffect, useState } from 'react';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FriendReqCard from './friendReqCard';
import { getFriendRequests } from '@/services/dataFetchers';

export default function FriendReqAccordion({ user }) {
   const [loading, setLoading] = useState(true);
   const [expanded, setExpanded] = useState(false);
   const [friendRequests, setFriendRequests] = useState([]);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const friendRequestData = useCallback(async () => {
      setLoading(true);
      //setFriendRequests(await getFriendRequests(user));
      setLoading(false);
   }, [user, getFriendRequests]);

   useEffect(() => {
      friendRequestData();
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
               Friend Requests
            </Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>
               I am an accordion
            </Typography> */}
         </AccordionSummary>
         <AccordionDetails>
            {friendRequests.map((friendRequest) => (
               <FriendReqCard friendRequest={friendRequest} key={friendRequest.id}/>
            ))}
         </AccordionDetails>
      </Accordion>
   );
}
