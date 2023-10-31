import AuthForm from './components/auth-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Navbar from './components/Navbar';

export default async function Home() {
   const cookieStore = cookies();
   const supabase = createServerComponentClient({ cookies: () => cookieStore });
   const {
      data: { session },
   } = await supabase.auth.getSession();

   // const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

   // const [oneSignalInitialized, setOneSignalInitialized] = useState(false);

   // /**
   //  * Initializes OneSignal SDK for a given Supabase User ID
   //  * @param uid Supabase User ID
   //  */
   // const initializeOneSignal = async (uid) => {
   //    if (oneSignalInitialized) {
   //       return;
   //    }
   //    setOneSignalInitialized(true);
   //    await OneSignal.init({
   //       appId: oneSignalAppId,
   //       notifyButton: {
   //          enable: true,
   //       },

   //       allowLocalhostAsSecureOrigin: true,
   //    });

   //    await OneSignal.login(uid);
   // };

   if (session) {
      return (
         <main>
            <Navbar session={session} />
         </main>
      );
   } else {
      return <AuthForm />;
   }
}
