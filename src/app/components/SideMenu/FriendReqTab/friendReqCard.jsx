'use-client';
import { useCallback, useEffect, useState } from 'react';
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

export default function FriendReqCard({ friendRequest, user }) {
   const [userIsSender, setUserIsSender] = useState(false);
   const [display, setDisplay] = useState('block');

   useEffect(() => {
      if (friendRequest.sender != user.id) {
         setUserIsSender(false);
      } else {
         setUserIsSender(true);
      }
   }, []);

   const profile =
      friendRequest.sender != user.id
         ? friendRequest.sender_profile
         : friendRequest.receiver_profile;

   return (
      <Card sx={{ maxWidth: 345, padding: '5px', display: display}}>
         
         <Box sx={{ display: 'flex', justifyContent: 'flex-start',alignItems: 'center' }}>
            <Avatar
               alt={profile.username}
               src={profile.avatar_url}
               sx={{ width: 80, height: 80 }}
            />
            <CardContent>
               <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  sx={{ marginBottom: '0px', lineHeight: '1' }}
               >
                  {profile.username}
               </Typography>
               <Typography gutterBottom variant='p' component='div'>
                  {profile.full_name}
               </Typography>

               {!userIsSender && (
                  <Box class='card-buttons'>
                     <Button
                        size='small'
                        variant='contained'
                        onClick={() => {
                           updateFriendRequest(friendRequest.specifier_id, 'a');
                           setUserIsSender(!userIsSender);
                        }}
                     >
                        Accept
                     </Button>
                     <Button
                        size='small'
                        variant='outlined'
                        color='error'
                        onClick={() => {
                           updateFriendRequest(friendRequest.specifier_id, 'd');
                           setDisplay('none');
                        }}
                     >
                        Decline
                     </Button>
                  </Box>
               )}
               {userIsSender && (
                  <Box class='card-buttons'>
                     <Button size='small' variant='outlined' disabled>
                        Pending
                     </Button>
                     {/* <Typography gutterBottom variant='caption'>
                     Pending...
                  </Typography> */}
                     <Button
                        size='small'
                        variant='outlined'
                        color='error'
                        onClick={() => {
                           updateFriendRequest(friendRequest.specifier_id, 'd');
                           setDisplay('none');
                        }}
                     >
                        Cancel
                     </Button>
                  </Box>
               )}
            </CardContent>
         </Box>
      </Card>
   );
}
