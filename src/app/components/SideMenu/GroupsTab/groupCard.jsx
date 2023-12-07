import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FireIcon from '@mui/icons-material/LocalFireDepartment';

import useMediaQuery from '@mui/material/useMediaQuery';

export default function GroupCard({group, setCarouselIndex, toggleDrawer, index}) {
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
   const color = prefersDarkMode ? '#101313' : '#474c55'
   return (
      <Card sx={{ maxWidth: 345, backgroundColor: color ,margin: '10px 5px'}}>
         <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start' }} onClick={()=>{setCarouselIndex(index);
         toggleDrawer('left', false);}}>
            <FireIcon />
            <CardContent>
               <Typography gutterBottom variant='h5' component='div'>
                  {group.group_name}
               </Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}
