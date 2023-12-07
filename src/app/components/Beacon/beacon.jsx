'use client';
import { useState, useCallback, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { lightBeacon } from '@/services/dataSenders';
import Fire from './fire';


export default function Beacon({ groupData }) {
   const [loading, setLoading] = useState(true);
   const [beaconIsLit, setBeaconIsLit] = useState(groupData.beacon_lit);
   const [beaconTimer, setBeaconTimer] = useState(groupData.beacon_changed);

   const qeueBeacon = async () => {
      setLoading(true);
      const success = await lightBeacon(groupData.id, beaconIsLit);
      console.log(!beaconIsLit);
      if (success) {
         console.log('here');
         setBeaconIsLit(!beaconIsLit);
      }
      
      setLoading(false);
   };

   return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
         <Box className='beacon-box'
         >
            {beaconIsLit && <Fire />}

            <Typography variant='h4' className='beacon_title'>{groupData.groups.group_name}</Typography>
            <Button variant='contained' onClick={qeueBeacon}>
               {(beaconIsLit && 'Put Out Beacon') || 'Light Beacon'}
            </Button>
         </Box>
      </Box>
   );
}
