'use client';
import { useState, useCallback, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { lightBeacon } from '@/services/dataSenders';

export default function Beacon({ groupData }) {
   const [loading, setLoading] = useState(true);
   const [beaconIsLit, setBeaconIsLit] = useState(groupData.beacon_lit);

   const qeueBeacon = useCallback(() => {
      setLoading(true);
      lightBeacon(groupData.id, beaconIsLit);
      setLoading(false);
   }, [groupData]);

   return (
      <Box>
         <Typography variant='h4'>{groupData.groups.group_name}</Typography>
         <Typography>
            {(beaconIsLit && 'the beacon is lit') || 'the beacon is not lit'}
         </Typography>
         <Button onClick={qeueBeacon}>{(beaconIsLit && 'Put Out Beacon') || 'Light Beacon'}</Button>
      </Box>
   );
}
