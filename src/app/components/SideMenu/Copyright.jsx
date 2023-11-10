import React from 'react';
import {
   Link,
   Typography,
} from '@mui/material';

export default function Copyright(props) {
   return (
      <Typography
         variant='body2'
         color='text.secondary'
         align='center'
         {...props}
      >
         {'Copyright © '}
         <Link color='inherit' href='https://www.brennantanner.com'>
            Brennan Tanner
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}