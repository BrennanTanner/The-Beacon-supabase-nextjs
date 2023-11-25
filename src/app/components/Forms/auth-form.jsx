'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Box, Typography } from '@mui/material';

export default function AuthForm() {
   const supabase = createClientComponentClient();

   return (
      <Box sx={{margin: 'auto', padding: '10px', width: { xs: '90%', md: '33%' }, }}>
         <Typography variant='h3'>Login</Typography>
      <Auth
         supabaseClient={supabase}
         view='magic_link'
         appearance={{ theme: ThemeSupa }}
         theme='dark'
         showLinks={false}
         providers={['google']}
         redirectTo={`${process.env.NEXT_PUBLIC_URL}/auth/callback`}
      />
      </Box>
   );
}
