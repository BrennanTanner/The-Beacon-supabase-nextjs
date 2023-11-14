'use client';
import { useState, useCallback, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { lightBeacon } from '@/services/dataSenders';
import FireIcon from '@mui/icons-material/LocalFireDepartment';

export default function Beacon({ groupData }) {
   const [loading, setLoading] = useState(true);
   const [beaconIsLit, setBeaconIsLit] = useState(groupData.beacon_lit);

   const qeueBeacon = useCallback(() => {
      setLoading(true);
      lightBeacon(groupData.id, beaconIsLit);
      setBeaconIsLit(!groupData.beacon_lit);
      setLoading(false);
   }, [groupData]);

   return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
         <Box
            sx={{
               width: '50%',
               padding: '10px',
               margin: 'auto',
               textAlign: 'center',
               backdropFilter: 'blur(16px) saturate(180%)',
               backgroundColor: 'rgba(17, 25, 40, 0.75)',
               borderRadius: '12px',
               border: '1px solid rgba(255, 255, 255, 0.125)',
            }}
         >
            {beaconIsLit && (
               <FireIcon
                  sx={{
                     width: '100px',
                     height: '100px'
                  }}
               />
            )}
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
