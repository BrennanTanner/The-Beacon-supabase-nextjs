'use client';
import { useState, useCallback, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { getGroups } from '@/services/dataFetchers';
import { lightBeacon } from '@/services/dataSenders';
import Beacon from './beacon';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from '@/app/styles/mui-theme';

const theme = createTheme(themeOptions);

export default function BeaconCarousel({ session }) {
   const [loading, setLoading] = useState(true);
   const [groups, setGroups] = useState([]);
   const [userSession, setUserSession] = useState(session);

   const groupData = useCallback(async () => {
      setLoading(true);
      setGroups(await getGroups(userSession.user));
      setLoading(false);
   }, [userSession, getGroups]);

   useEffect(() => {
      groupData();
   }, []);

   const qeueBeacon = useCallback((group) => {
      setLoading(true);
      lightBeacon(group.id);
   }, []);

   return (
      <ThemeProvider theme={theme}>
         {/* <button id='subscribe'>subscribe</button>
         <button id='unsubscribe'>unsubscribe</button> */}
         <Carousel
            height={'100vh'}
            autoPlay={false}
            animation={'slide'}
            navButtonsAlwaysVisible={true}
            indicators={true}
            cycleNavigation={true}
            swipe={true}
            sx={{height: "90vh",}}
         >
            {groups.map((group) => {
               return <Beacon groupData={group} key={group.id}/>;
            })}
         </Carousel>
      </ThemeProvider>
   );
}
