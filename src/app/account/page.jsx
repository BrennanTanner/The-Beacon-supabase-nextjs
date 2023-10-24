import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import AccountForm from './account-form';
import Navbar from '../components/Navbar';
import BottomNav from '../components/bottomNav';


export default async function Account() {
   const cookieStore = cookies();
   const supabase = createServerComponentClient({ cookies: () => cookieStore });
   const {
      data: { session },
   } = await supabase.auth.getSession();

   return (
      <main>
         <Navbar session={session}/>
         <AccountForm session={session} />
         <BottomNav session={session}/>
      </main>
   );
}
