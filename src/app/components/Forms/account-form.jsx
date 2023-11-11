'use client';
import { useCallback, useEffect, useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { getProfile } from '@/services/dataFetchers';
import { updateProfile } from'@/services/dataSenders';

export default function AccountForm({ session }) {
   const [loading, setLoading] = useState(true);
   const [fullname, setFullname] = useState(null);
   const [username, setUsername] = useState(null);
   const [avatar_url, setAvatarUrl] = useState(null);
   const user = session?.user;

   const getUserProfile = useCallback(async () => {
      try {
         setLoading(true);

         const userData = await getProfile(user);

         if (userData) {
            setFullname(userData.full_name);
            setUsername(userData.username);
            setAvatarUrl(userData.avatar_url);
         }
      } catch (error) {
         alert('Error loading user data!');
      } finally {
         setLoading(false);
      }
   }, [user]);

   useEffect(() => {
      getUserProfile();
   }, [user, getProfile]);

   return (
      <Box sx={{}}>
         <TextField
            id='email'
            label='Email'
            variant='outlined'
            disabled
            value={session?.user.email}
         />
         <TextField
            id='avatarUrl'
            required
            label='Avatar URL'
            variant='outlined'
            error={avatar_url != null && avatar_url === ''}
            value={avatar_url || ''}
            helperText='insert an image URL'
            onChange={(e) => setAvatarUrl(e.target.value)}
         />

         <TextField
            id='fullName'
            required
            label='Full Name'
            variant='outlined'
            error={fullname != null && fullname === ''}
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
         />

         <TextField
            id='username'
            required
            label='Username'
            variant='outlined'
            error={username != null && username === ''}
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
         />
         <Button
            onClick={() => updateProfile( user.id, fullname, username, avatar_url )}
            disabled={loading}
         >
            {loading ? 'Loading ...' : 'Update'}
         </Button>
      </Box>
   );
}
