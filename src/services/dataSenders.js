import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

async function updateProfile(id, full_name, username, avatar_url) {
   try {
      let { error } = await supabase.from('profiles').upsert({
         id,
         full_name,
         username,
         avatar_url,
         updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert('Profile updated!');
   } catch (error) {
      console.log(error);
      alert('Error updating the data!');
   }
}

async function createFriendRequest(senderId, recieverId) {
   try {
      let { error } = await supabase.from('connection_requests').insert({
         sender: senderId,
         receiver: recieverId,
         created_at: new Date().toISOString(),
         status: 'p',
      });

      if (error) throw error;
      alert('request sent!');
   } catch (error) {
      alert('Error sending request!');
   }
}

async function updateFriendRequest(requestId, update) {
   try {
      let { error } = await supabase
         .from('connection_requests')
         .update({
            status: update,
         })
         .eq('specifier_id', requestId);

      if (error) throw error;
      alert('request updated!');
   } catch (error) {
      alert('Error sending request!');
   }
}

async function lightBeacon(id, beacon_lit) {
   try {
      const setBeacon = beacon_lit ? 'FALSE' : 'TRUE';
      let { error } = await supabase
         .from('group_members')
         .update({
            beacon_lit: setBeacon,
         })
         .eq('id', id);

      if (error) throw error;
      if (beacon_lit) {
         alert('Beacon has been put out');
      } else {
         alert('Beacon has been Lit!');
      }

      return true;
   } catch (error) {
      console.log(error);
      alert('Error lighting Beacon!');
      return false;
   }
}

async function createGroup(group_name, members, user) {
   //create group table
   try {
      const { data, error } = await supabase
         .from('groups')
         .upsert({
            group_name: group_name,
            created_at: new Date().toISOString(),
         })
         .select();

      if (error) throw error;
      console.info('200: group upserted');

      //create member tables
      const groupMembers = [];
      members.map((member) => {
         groupMembers.push({
            group_id: data[0].id,
            admin: false,
            member_id: member.id,
            beacon_lit: false,
         });
      });

      groupMembers.push({
         group_id: data[0].id,
         admin: true,
         member_id: user.id,
         beacon_lit: false,
      });

      try {
         let { error2 } = await supabase
            .from('group_members')
            .insert(groupMembers);
         if (error2) throw error2;
         console.info('200: members added to group');
      } catch (error2) {
         console.info(error2);
      }
   } catch (error) {
      console.info(error);
   }
}

module.exports = {
   createFriendRequest,
   createGroup,
   lightBeacon,
   updateProfile,
   updateFriendRequest,
};
