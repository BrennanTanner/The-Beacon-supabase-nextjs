import AuthForm from './components/Forms/auth-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Navbar from './components/Navbar';
import BeaconCarousel from './components/Beacon/beaconCarousel';
import MainBody from './components/mainBody';

export default async function Home() {
   const cookieStore = cookies();
   const supabase = createServerComponentClient({ cookies: () => cookieStore });
   const {
      data: { session },
   } = await supabase.auth.getSession();

   if (session) {
      return (
            <MainBody session={session} />
      );
   } else {
      return <AuthForm />;
   }
}
