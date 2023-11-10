'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Avatar, Box, Chip } from '@mui/material';
import { createGroup } from '@/services/dataSenders';

export default function GroupForm({ session, friends }) {
   const supabase = createClientComponentClient();
   const [loading, setLoading] = useState(true);
   const [groupName, setGroupName] = useState(null);
   const [members, setMembers] = useState([]);
   const user = session?.user;

   const  createNewGroup = async() => {
      setLoading(true);
      await createGroup(groupName, members, user);
      setLoading(false);
   };

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
   console.log(members);
   return (
      <div className='form-widget'>
         <div>
            <label htmlFor='group-name'>Group Name</label>
            <input
               id='group-name'
               type='text'
               onChange={(e) => setGroupName(e.target.value)}
            />
         </div>

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
      </div>
   );
}
