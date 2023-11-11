import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Avatar, Button, Box } from '@mui/material';
import FireIcon from '@mui/icons-material/LocalFireDepartment';

export default function FriendReqCard({friendRequest}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{display: "flex"}}>
      <Avatar
  alt={friendRequest.profiles.username}
  src={friendRequest.profiles.avatar_url}
  sx={{ width: 56, height: 56 }}
/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {friendRequest.profiles.username}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
          {friendRequest.profiles.full_name}
          </Typography>
       
        <Box><Button variant='contained'>Accept</Button>
        <Button variant='outlined' color="error">Decline</Button></Box>
         </CardContent>
      </CardActionArea>
    </Card>
  );
}