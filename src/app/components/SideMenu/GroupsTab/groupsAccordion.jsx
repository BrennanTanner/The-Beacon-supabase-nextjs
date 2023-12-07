'use client';
import { useCallback, useEffect, useState } from 'react';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Typography,
   Card,
   CardContent,
   CardActionArea
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import GroupCard from './groupCard';
import { getGroups } from '@/services/dataFetchers';
import TransitionsModal from '../../Modal/modal';
import GroupForm from '../../Forms/group-form';

export default function GroupAccordion({ user, friends, setCarouselIndex, toggleDrawer }) {
   const [loading, setLoading] = useState(true);
   const [expanded, setExpanded] = useState(false);
   const [groups, setGroups] = useState([]);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const groupData = useCallback(async () => {
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
         sx={{ width: '100%',
          }}
      >
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
         >
            <Typography variant='h4' sx={{ flexShrink: 0 }}>Beacons</Typography>
         </AccordionSummary>
         <AccordionDetails>

         <TransitionsModal text={'new Group'} contents={<GroupForm session={user} friends={friends}/>}/>
         
            {groups.map((group, i) => (
               <GroupCard group={group.groups} key={group.groups.id} setCarouselIndex={setCarouselIndex} toggleDrawer={toggleDrawer} index={i}
        />
            ))}
           

         </AccordionDetails>
      </Accordion>
   );
}
