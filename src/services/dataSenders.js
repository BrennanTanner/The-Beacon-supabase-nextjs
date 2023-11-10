import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

async function createFriendRequest(senderId, recieverId) {
   try {
      let { error } = await supabase.from('connection_requests').upsert({
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
      alert('Beacon has been Lit!');
   } catch (error) {
      console.log(error);
      alert('Error lighting Beacon!');
   }
}

async function createGroup(group_name, members, user) {
   //create group table
   try {
      let { data, error } = await supabase.from('groups').upsert({
         group_name: group_name,
         created_at: new Date().toISOString(),
      });

      if (error) throw error;
      //create member tables
      const groupMembers = [];
      members.map((member) => {
         groupMembers.push({
            group_id: data.id,
            admin: false,
            member_id: member.id,
            beacon_lit: false,
         });
      });

      groupMembers.push({
         group_id: data.id,
         admin: true,
         member_id: user.id,
         beacon_lit: false,
      });

      try {
         let { error } = await supabase
            .from('group_members')
            .insert([groupMembers]);
         if (error) throw error;
      } catch {}
   } catch (error) {
      alert('Error sending request!');
   }
}

module.exports = {
   createFriendRequest,
   createGroup,
   lightBeacon,
};
