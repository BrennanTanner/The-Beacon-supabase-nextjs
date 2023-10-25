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

export default function GroupAccordion({groups}) {
   const [expanded, setExpanded] = useState(false);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

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
               <GroupCard group={group.groups}/>
            ))}
         </AccordionDetails>
      </Accordion>
   );
}
