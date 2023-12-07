import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Avatar } from '@mui/material';

export default function FriendCard({friend}) {
  return (
    <Card sx={{ maxWidth: 345, margin: '10px 0px',backgroundColor: '#474c55'  }} >
      <CardActionArea sx={{display: "flex",justifyContent: 'flex-start', padding: '5px 10px'}} >
      <Avatar
  alt={friend.username}
  src={friend.avatar_url}
  sx={{ width: 56, height: 56,  }}
/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {friend.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}