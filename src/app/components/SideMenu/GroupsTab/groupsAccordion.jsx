'use client';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupCard from './groupCard';

export default function GroupAccordion() {
   const [expanded, setExpanded] = React.useState(false);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   return (
      <Accordion
         expanded={expanded === 'panel1'}
         onChange={handleChange('panel1')}
      >
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
         >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
               Groups
            </Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>
               I am an accordion
            </Typography> */}
         </AccordionSummary>
         <AccordionDetails>
            <GroupCard />
         </AccordionDetails>
      </Accordion>
   );
}
