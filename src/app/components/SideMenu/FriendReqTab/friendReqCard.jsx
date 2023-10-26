import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FireIcon from '@mui/icons-material/LocalFireDepartment';

export default function FriendReqCard({friendRequests}) {
  console.log(friendRequests);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{display: "flex"}}>
      <FireIcon/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {friendRequests.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}