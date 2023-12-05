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
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
         <Box
            sx={{
               width: '50%',
               height: '500px',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'flex-end',
               alignItems: 'center',
               padding: '10px',
               margin: 'auto',
               textAlign: 'center',
               backgroundColor: '#323842',
               borderRadius: '12px',
               border: '1px solid rgba(255, 255, 255, 0.125)',
            }}
         >
            {beaconIsLit && <Fire />}

            <img src='/Pyre.svg' alt='' style={{ width: '80%' }} />
            <Typography variant='h4'>{groupData.groups.group_name}</Typography>
            <Typography>
               {(beaconIsLit && 'the beacon is lit') || 'the beacon is not lit'}
            </Typography>
            <Button variant='contained' onClick={qeueBeacon}>
               {(beaconIsLit && 'Put Out Beacon') || 'Light Beacon'}
            </Button>
         </Box>
      </Box>
   );
}
