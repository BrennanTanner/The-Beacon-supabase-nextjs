'use client';
import { useEffect, useState, useCallback } from 'react';
import { Box, List, ListItem } from '@mui/material';
import GroupAccordion from './GroupsTab/groupsAccordion';
import FriendsAccordion from './FriendsTab/friendsAccordion';
import FriendsReqAccordion from './FriendReqTab/friendsReqAccordion';
import Copyright from './Copyright';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function MenuDrawer({ session }) {
   const [loading, setLoading] = useState(true);
   const [groups, setGroups] = useState([]);
   const [friends, setFriends] = useState([]);
   const [friendReqs, setFriendReqs] = useState([]);

   const user = session?.user;
   const supabase = createClientComponentClient();

   const getGroups = useCallback(async () => {
      try {
         setLoading(true);
         const { data, error, status } = await supabase
            .from('group_members')
            .select(
               `groups(group_name, group_members(member_id, profiles(username)))`
            )
            .eq('member_id', user.id);

         if (error && status !== 406) {
            throw error;
         }

         if (data) {
            setGroups(data);
         }
      } catch (error) {
         alert('Error loading group data!' + error);
      } finally {
         setLoading(false);
      }
   }, [user, supabase]);

   const getFriends = useCallback(async () => {
      try {
         setLoading(true);

         const { data, error, status } = await supabase
         .from('connections')
         .select(
            `user1: profiles!connections_user1_id_fkey(username, id),
            user2: profiles!connections_user2_id_fkey(username, id)`
         ).or(`user1_id.eq.${user.id}, user2_id.eq.${user.id}`)

         if (error && status !== 406) {
            throw error;
         }

         if (data) {
            console.log(data);
            setFriends(data);
         }
      } catch (error) {
         console.log(error);
         alert(
            'Error loading group data! ' +
               error.message +
               ' \n\n hint: ' +
               error.hint
         );
      } finally {
         setLoading(false);
      }
   }, [user, supabase]);

   useEffect(() => {
      getFriends();
      getGroups();
   }, [user, getGroups, getFriends]);

   // useEffect(() => {
   //    const channel = supabase
   //       .channel('*')
   //       .on(
   //          'postgres_changes',
   //          { event: 'INSERT', schema: 'public', table: 'groups' },
   //          (payload) => setGroups((groups) => [...groups, payload.new])
   //       )
   //       .subscribe();

   //    return () => {
   //       supabase.removeChannel(channel);
   //    };
   // }, [supabase, setGroups, groups]);

   return (
      <Box
         sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
         }}
      >
         <List sx={{ width: { xs: '80vw', sm: '50vw', lg: '33vw' } }}>
            <ListItem disablePadding>
               <GroupAccordion groups={groups} />
            </ListItem>
            <ListItem disablePadding>
               <FriendsAccordion friends={friends} />
            </ListItem>
            <ListItem disablePadding>
               <FriendsReqAccordion />
            </ListItem>
         </List>
         <Copyright />
      </Box>
   );
}
