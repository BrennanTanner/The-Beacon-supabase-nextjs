import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

async function createFriendRequest( senderId, recieverId ) {
   try {
     setLoading(true)
     
     let { error } = await supabase.from('connection_requests').upsert({
       sender: senderId,
       receiver: recieverId,
       created_at: new Date().toISOString(),
       status: 'p',
     })

     if (error) throw error
     alert('request sent!')
   } catch (error) {
     alert('Error sending request!')
   } finally {
     setLoading(false)
   }
 }

module.exports = {
   createFriendRequest
};