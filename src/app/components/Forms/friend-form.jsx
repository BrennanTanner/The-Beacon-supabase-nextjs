'use client';
import { createFriendRequest, searchUsers } from '@/services/dataSenders';
import { useCallback, useEffect, useState } from 'react';
import { Avatar, Box, Button, Chip, TextField } from '@mui/material';
import SearchBar from '../inputs/seachBar';

export default function FriendForm({ session, friends }) {
   const [loading, setLoading] = useState(true);
   const [users, setUsers] = useState('');

   //needs testing
   const newFriendRequest = async () => {
      setLoading(true);
      await createFriendRequest(session.id, users.id);
      setLoading(false);
   };

   return (
      <div className='form-widget'>
         <div
            style={{
               display: 'flex',
               alignSelf: 'center',
               justifyContent: 'center',
               flexDirection: 'column',
               padding: 20,
            }}
         >
            <SearchBar
               setUsers={setUsers}
               friends={friends.map((friend) => {
                  return friend.id;
               })}
               session={session}
            />
         </div>

         <Button disabled={!loading || !users} onClick={newFriendRequest}>
            Send Friend Request
         </Button>
      </div>
   );
}
