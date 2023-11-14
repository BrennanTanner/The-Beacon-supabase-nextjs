import React, { useState, useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import { Avatar, Box, Button, Chip, TextField } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

//UGHHHHHHHHHHH
export default function Search({ setUsers, friends, session }) {
   const supabase = createClientComponentClient();
   //set default query terms
   const [query, setQuery] = useState('');

   //get animated components wrapper
   const animatedComponents = makeAnimated();

   const getUsers = useCallback(async () => {
      try {
         const { data, error, status } = await supabase
            .from('profiles')
            .select('id, username, full_name, avatar_url')
            .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
            .neq('id', session.id)
            .not('id', 'in', `(${friends})`)
            .limit(5);
         if (error && status !== 406) {
            throw error;
         }
         if (data) {
            return data;
         }
      } catch (error) {
         console.log(error);
         return { message: 'Error Searching!', error: error };
      }
   }, [query]);

   // fetch filteres search results for dropdown
   const loadOptions = () => {
      return getUsers();
   };

   const SelectMenuButton = (props) => {
      return (
         <components.Option {...props}>
            <Chip
               sx={{
                  height: 'auto',
                  '& .MuiChip-label': {
                     display: 'block',
                     whiteSpace: 'normal',
                  },
               }}
               avatar={
                  <Avatar
                     sx={{ width: 56, height: 56 }}
                     alt={props.data.username}
                     src={props.data.avatar_url}
                  />
               }
               label={
                  <div>
                     <h5>{props.data.username}</h5>
                     <p>{props.data.full_name}</p>
                  </div>
               }
               variant='outlined'
            />
         </components.Option>
      );
   };

   return (
      <>
         <AsyncSelect
            cacheOptions
            components={{ Option: SelectMenuButton, animatedComponents }}
            placeholder={'Search...'}
            className="react-select-container"
            classNamePrefix="react-select"
            getOptionLabel={(e) => e.username}
            getOptionValue={(e) => e.id}
            loadOptions={loadOptions}
            onInputChange={(value) => setQuery(value)}
            onChange={(value) => setUsers(value)}
         />
      </>
   );
}
