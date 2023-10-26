'use client';
import { useCallback, useEffect, useState } from 'react';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupCard from './groupCard';
import { getGroups } from '@/services/dataFetchers';

export default function GroupAccordion({ user }) {
   const [loading, setLoading] = useState(true);
   const [expanded, setExpanded] = useState(false);
   const [groups, setGroups] = useState([]);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const groupData = useCallback(async ()=> {
      setLoading(true);
      setGroups(await getGroups(user));
      setLoading(false);
   }, [user, getGroups]);

   useEffect(() => {
      groupData();
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
            <Typography sx={{ width: '50%', flexShrink: 0 }}>Groups</Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>
               I am an accordion
            </Typography> */}
         </AccordionSummary>
         <AccordionDetails>
            {groups.map((group) => (
               <GroupCard group={group.groups} key={group.groups.id}/>
            ))}
         </AccordionDetails>
      </Accordion>
   );
}
