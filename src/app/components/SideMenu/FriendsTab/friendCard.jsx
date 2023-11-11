import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Avatar } from '@mui/material';
import FireIcon from '@mui/icons-material/LocalFireDepartment';

export default function FriendCard({friend}) {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardActionArea sx={{display: "flex"}} >
      <Avatar
  alt={friend.username}
  src={friend.avatar_url}
  sx={{ width: 56, height: 56 }}
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