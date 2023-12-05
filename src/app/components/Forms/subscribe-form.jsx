'use client';
import { Box, Typography } from '@mui/material';
import { Button } from '@mui/base';

export default function SubscribeForm() {
   return (
      <Box
         sx={{
            margin: 'auto',
            padding: '10px',
            width: { xs: '90%', md: '33%' },
         }}
      >
         <Typography>
            Make sure you subscribe so you don't miss when a beacon is lit!
         </Typography>
         <Button variant='contained' id='subscribe'>
            Subscribe
         </Button>
         <Typography>We won't send you any other notifications.</Typography>
      </Box>
   );
}
