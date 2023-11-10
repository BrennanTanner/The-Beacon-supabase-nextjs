'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthForm() {
   const supabase = createClientComponentClient();

   return (
      <Auth
         supabaseClient={supabase}
         view='magic_link'
         appearance={{ theme: ThemeSupa }}
         theme='dark'
         showLinks={false}
         providers={['google']}
         redirectTo={`${process.env.NEXT_PUBLIC_URL}/auth/callback`}
      />
   );
}
