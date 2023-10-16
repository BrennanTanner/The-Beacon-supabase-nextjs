import AuthForm from './auth-form';
import Navbar from './Navbar';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const cookieStore = cookies();
const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
const {
   data: { session },
} = await supabase.auth.getSession();

export default function Home() {
   return (
      <main>
         <Navbar />
         <div className='col-6 auth-widget'>{!session ?? <AuthForm />}</div>
      </main>
   );
}
