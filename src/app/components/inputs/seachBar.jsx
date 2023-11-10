import React, { useState, useCallback} from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

//UGHHHHHHHHHHH
export default function Search({setUsers}){
   const supabase = createClientComponentClient();
  //set default query terms
  const [query, setQuery] = useState("");

  //get animated components wrapper
  const animatedComponents = makeAnimated();

 // fetch filteres search results for dropdown
  const loadOptions = () => {
    return (async ()=>{ try {
      console.log('here')
      const { data, error, status } = await supabase
         .from('profiles')
         .select('id, username, full_name, avatar_url').or(`username.ilike.%${query}%,full_name.ilike.%${query}%`).limit(5);

      if (error && status !== 406) {
         throw error;
      }

      if (data) {
         console.log(data);
         return data;
      }
   } catch (error) {
      console.log(error);
      return { message: 'Error Searching!', error: error };
   }});
  };

 
  return (
    <>
      <AsyncSelect
        cacheOptions
        isClearable={true}
        isSearchable={true}
        components={animatedComponents}
        getOptionLabel={(e) => e.user_name}
        getOptionValue={(e) => e.id}
        loadOptions={loadOptions}
        onInputChange={(value) => setQuery(value)}
        onChange={(value) => setUsers(value)}
      />
    </>
  );
};