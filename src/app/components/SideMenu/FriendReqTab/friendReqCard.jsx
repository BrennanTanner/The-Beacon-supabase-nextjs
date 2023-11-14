import * as React from 'react';
import {
   CardActionArea,
   Avatar,
   Button,
   Box,
   Typography,
   CardContent,
   Card,
} from '@mui/material';
import { updateFriendRequest } from '@/services/dataSenders';

export default function FriendReqCard({ friendRequest }) {
   return (
      <Card sx={{ maxWidth: 345 }}>
         <CardActionArea sx={{ display: 'flex' }}>
            <Avatar
               alt={friendRequest.profiles.username}
               src={friendRequest.profiles.avatar_url}
               sx={{ width: 56, height: 56 }}
            />
            <CardContent>
               <Typography gutterBottom variant='h5' component='div'>
                  {friendRequest.profiles.username}
               </Typography>
               <Typography gutterBottom variant='p' component='div'>
                  {friendRequest.profiles.full_name}
               </Typography>

               <Box>
                  <Button
                     variant='contained'
                     onClick={() => {
                        updateFriendRequest(friendRequest.specifier_id, 'a');
                     }}
                  >
                     Accept
                  </Button>
                  <Button
                     variant='outlined'
                     color='error'
                     onClick={() => {
                        updateFriendRequest(friendRequest.specifier_id, 'd');
                     }}
                  >
                     Decline
                  </Button>
               </Box>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}
