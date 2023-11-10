'use client';
import { createFriendRequest, searchUsers } from '@/services/dataSenders';
import { useCallback, useEffect, useState } from 'react';
import { Avatar, Box, Button, Chip, TextField } from '@mui/material';
import SearchBar from '../inputs/seachBar';

export default function FriendForm({session}) {
   const [loading, setLoading] = useState(true);
   const [searchQuery, setSearchQuery] = useState(false);
  const [users, setUsers] = useState("");


   //needs testing
   const newFriendRequest = async () => {
      setLoading(true);
      await createFriendRequest(groupName, members, session);
      setLoading(false);
   };

  //  const handleClick = (friend) => {
  //     friend.disabled = true;
  //     members.push(friend);
  //     setMembers([...members]);
  //  };

  //  const handleDelete = (member) => {
  //     members.splice(members.indexOf(member), 1);
  //     setMembers([...members]);
  //     member.disabled = false;
  //  };
   return (
      <div className='form-widget'>
         {/* <TextField
            id='search'
            label='Search'
            variant='outlined'
            helperText='search for username or full name'
            onChange={(e) => {
              setSearchQuery(e.target.value);
              search();
            }}
         /> */}

         <div
            style={{
               display: 'flex',
               alignSelf: 'center',
               justifyContent: 'center',
               flexDirection: 'column',
               padding: 20,
            }}
         >
          <SearchBar setUsers={setUsers}/>
           
              {/* <div style={{ padding: 3 }}>
                {dataFiltered.map((d) => (
                    <div
                      className='text'
                      style={{
                          padding: 5,
                          justifyContent: 'normal',
                          fontSize: 20,
                          color: 'blue',
                          margin: 1,
                          width: '250px',
                          BorderColor: 'green',
                          borderWidth: '10px',
                      }}
                      key={d.id}
                    >
                      {d}
                    </div>
                ))}
              </div> */}
         </div>

         {/* <Button
            disabled={!loading || !members.length || !groupName}
            onClick={createNewGroup}
         >
            Create Group
         </Button> */}
      </div>
   );
}
