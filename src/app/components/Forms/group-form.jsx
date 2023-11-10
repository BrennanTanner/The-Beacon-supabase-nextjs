'use client';
import { useCallback, useEffect, useState } from 'react';
import { Avatar, Box, Button, Chip, TextField } from '@mui/material';
import { createGroup } from '@/services/dataSenders';

export default function GroupForm({ session, friends }) {
   const [loading, setLoading] = useState(true);
   const [groupName, setGroupName] = useState(null);
   const [members, setMembers] = useState([]);

   //needs testing
   const createNewGroup = async () => {
      setLoading(true);
      await createGroup(groupName, members, session);
      setLoading(false);
   };

   useEffect(() => {
      friends.map((friend) => {
         friend.disabled = false;
      });
   }, [friends]);

   const handleClick = (friend) => {
      friend.disabled = true;
      members.push(friend);
      setMembers([...members]);
   };

   const handleDelete = (member) => {
      members.splice(members.indexOf(member), 1);
      setMembers([...members]);
      member.disabled = false;
   };
   return (
      <div className='form-widget'>
            <TextField
               id='group-name'
               required
               label='Group Name'
               variant='outlined'
               error={groupName != null && groupName === ''}
               helperText='Group name cannot be empty'
               onChange={(e) => setGroupName(e.target.value)}
            />
         <div>
            <label htmlFor='members'>Add Members</label>
            {members.map((member) => {
               return (
                  <Chip
                     avatar={
                        <Avatar alt={member.username} src={member.avatar_url} />
                     }
                     label={member.username}
                     onDelete={() => {
                        handleDelete(member);
                     }}
                  />
               );
            })}
            <Box>
               {friends.map((friend) => {
                  return (
                     <Chip
                        avatar={
                           <Avatar
                              alt={friend.username}
                              src={friend.avatar_url}
                           />
                        }
                        label={friend.username}
                        disabled={friend.disabled}
                        variant='outlined'
                        onClick={() => {
                           handleClick(friend);
                        }}
                     />
                  );
               })}
            </Box>
         </div>
         <Button
            disabled={!loading || !members.length || !groupName}
            onClick={createNewGroup}
         >
            Create Group
         </Button>
      </div>
   );
}
