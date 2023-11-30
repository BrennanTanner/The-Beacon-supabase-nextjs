import AuthForm from './components/Forms/auth-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Navbar from './components/Navbar';
import BeaconCarousel from './components/Beacon/beaconCarousel';
import SEO from './seo';

export default async function Home() {
   const cookieStore = cookies();
   const supabase = createServerComponentClient({ cookies: () => cookieStore });
   const {
      data: { session },
   } = await supabase.auth.getSession();

   if (session) {
      return (
         <div>
         <SEO pageTitle="The Beacon" pageDescription="Notify your friends with the Beacon!"></SEO>
         <main style={{ backgroundImage: 'url("/space-w-alpha.png")' }}>
            <Navbar session={session} />
            <BeaconCarousel session={session} />
         </main>
         </div>
      );
   } else {
      return <AuthForm />;
   }
}
