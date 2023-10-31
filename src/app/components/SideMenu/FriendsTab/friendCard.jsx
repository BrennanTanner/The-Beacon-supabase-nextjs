import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FireIcon from '@mui/icons-material/LocalFireDepartment';

export default function FriendCard({friend}) {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardActionArea sx={{display: "flex"}} >
      <FireIcon/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {friend.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}