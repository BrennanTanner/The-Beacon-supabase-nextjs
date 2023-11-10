import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

async function getGroups(user) {
   try {
      const { data, error, status } = await supabase
         .from('group_members')
         .select(
            `beacon_lit, id, groups(group_name, id, group_members(member_id, beacon_lit, profiles(username)))`
         )
         .eq('member_id', user.id);

      if (error && status !== 406) {
         throw error;
      }

      if (data) {
         return data;
      }
   } catch (error) {
      return { message: 'Error loading group data!', error: error };
   }
}

// TODO: This isn't the most effecient fetch for friends.
async function getFriends(user) {
   try {
      const { data, error, status } = await supabase
         .from('connections')
         .select(
            `user1: profiles!connections_user1_id_fkey(username, id, avatar_url),
         user2: profiles!connections_user2_id_fkey(username, id, avatar_url)`
         )
         .or(`user1_id.eq.${user.id}, user2_id.eq.${user.id}`);

      if (error && status !== 406) {
         throw error;
      }

      if (data) {
         // remove user from data
         const friends = data.map((connection) => {
            if (connection.user1.id == user.id) {
               return connection.user2;
            } else {
               return connection.user1;
            }
         });
         return friends;
      }
   } catch (error) {
      return { message: 'Error loading group data!', error: error };
   }
}

async function searchUsers(query) {
   try {
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
   }
}

async function getFriendRequests(user) {
   try {
      const { data, error, status } = await supabase
         .from('connection_requests')
         .select(`sender, profiles(id, username)`)
         .eq('receiver', user.id)
         .eq('status', 'p');

      if (error && status !== 406) {
         throw error;
      }

      if (data) {
         return data;
      }
   } catch (error) {
      return { message: 'Error loading group data!', error: error };
   }
}

async function getBeacons(user) {
   try {
      const { data, error, status } = await supabase
         .from('group_members')
         .select(`beacon_lit, groups(group_name, id)`)
         .eq('member_id', user.id);

      if (error && status !== 406) {
         throw error;
      }

      if (data) {
         return data;
      }
   } catch (error) {
      return { message: 'Error loading group data!', error: error };
   }
}

async function getProfile(user) {
   try {
      let { data, error, status } = await supabase
         .from('profiles')
         .select(`full_name, username, avatar_url`)
         .eq('id', user?.id)
         .single();

      if (error && status !== 406) {
         throw error;
      }

      if (data) {
         return data;
      }
   } catch (error) {
      console.info('Error loading user data!');
   }
}

module.exports = {
   getGroups,
   getFriends,
   searchUsers,
   getFriendRequests,
   getBeacons,
   getProfile,
};
