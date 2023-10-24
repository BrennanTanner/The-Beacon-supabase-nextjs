import AuthForm from './components/auth-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AccountForm from './components/account-form';
import Navbar from './components/Navbar';
import BottomNav from './components/bottomNav';

export default async function Home() {
   const cookieStore = cookies();
   const supabase = createServerComponentClient({ cookies: () => cookieStore });
   const {
      data: { session },
   } = await supabase.auth.getSession();
   
   if (session) {
      return (
         <main>
            <Navbar session={session} />
            <AccountForm session={session} />
         </main>
      );
   } else {
      return <AuthForm />;
   }
}
