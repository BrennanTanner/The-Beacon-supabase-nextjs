'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { darkThemeOptions } from '../../styles/mui-theme-dark';
import { lightThemeOptions } from '../../styles/mui-theme-light';


export default function AuthForm() {
   const supabase = createClientComponentClient();
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
     const mode = prefersDarkMode ? 'dark' : 'light'

     const customTheme = {
      'light': {
            colors: {
              brand: 'hsl(153 60.0% 53.0%)',
              brandAccent: 'hsl(154 54.8% 45.1%)',
              brandButtonText: 'white',
              defaultButtonBackground: 'white',
              defaultButtonBackgroundHover: '#eaeaea',
              defaultButtonBorder: 'lightgray',
              defaultButtonText: 'gray',
              dividerBackground: '#eaeaea',
              inputBackground: 'transparent',
              inputBorder: 'lightgray',
              inputBorderHover: 'gray',
              inputBorderFocus: 'gray',
              inputText: 'black',
              inputLabelText: 'gray',
              inputPlaceholder: 'darkgray',
              messageText: 'gray',
              messageTextDanger: 'red',
              anchorTextColor: 'gray',
              anchorTextHoverColor: 'darkgray',
            },
            space: {
              spaceSmall: '4px',
              spaceMedium: '8px',
              spaceLarge: '16px',
              labelBottomMargin: '8px',
              anchorBottomMargin: '4px',
              emailInputSpacing: '4px',
              socialAuthSpacing: '4px',
              buttonPadding: '10px 15px',
              inputPadding: '10px 15px',
            },
            fontSizes: {
              baseBodySize: '13px',
              baseInputSize: '14px',
              baseLabelSize: '14px',
              baseButtonSize: '14px',
            },
            fonts: {
              bodyFontFamily: `Vollkorn SC, sans-serif`,
              buttonFontFamily: `Vollkorn SC, sans-serif`,
              inputFontFamily: `ui-sans-serif, sans-serif`,
              labelFontFamily: `ui-sans-serif, sans-serif`,
            },
            // fontWeights: {},
            // lineHeights: {},
            // letterSpacings: {},
            // sizes: {},
            borderWidths: {
              buttonBorderWidth: '1px',
              inputBorderWidth: '1px',
            },
            // borderStyles: {},
            radii: {
              borderRadiusButton: '4px',
              buttonBorderRadius: '4px',
              inputBorderRadius: '4px',
            },
      },
      'dark': {
  colors: {
    brand: '#ab8651',
    brandAccent: '#967648',
    brandButtonText: 'white',
    defaultButtonBackground: 'white',
    defaultButtonBackgroundHover: '#eaeaea',
    defaultButtonBorder: 'lightgray',
    defaultButtonText: 'gray',
    dividerBackground: '#eaeaea',
    inputBackground: 'transparent',
    inputBorder: 'lightgray',
    inputBorderHover: 'gray',
    inputBorderFocus: 'gray',
    inputText: 'black',
    inputLabelText: 'gray',
    inputPlaceholder: 'darkgray',
    messageText: 'gray',
    messageTextDanger: 'red',
    anchorTextColor: 'gray',
    anchorTextHoverColor: 'darkgray',
  },
  space: {
    spaceSmall: '4px',
    spaceMedium: '8px',
    spaceLarge: '16px',
    labelBottomMargin: '8px',
    anchorBottomMargin: '4px',
    emailInputSpacing: '4px',
    socialAuthSpacing: '4px',
    buttonPadding: '10px 15px',
    inputPadding: '10px 15px',
  },
  fontSizes: {
    baseBodySize: '13px',
    baseInputSize: '14px',
    baseLabelSize: '14px',
    baseButtonSize: '14px',
  },
  fonts: {
    bodyFontFamily: `ui-sans-serif, sans-serif`,
    buttonFontFamily: `ui-sans-serif, sans-serif`,
    inputFontFamily: `ui-sans-serif, sans-serif`,
    labelFontFamily: `ui-sans-serif, sans-serif`,
  },
  // fontWeights: {},
  // lineHeights: {},
  // letterSpacings: {},
  // sizes: {},
  borderWidths: {
    buttonBorderWidth: '1px',
    inputBorderWidth: '1px',
  },
  // borderStyles: {},
  radii: {
    borderRadiusButton: '4px',
    buttonBorderRadius: '4px',
    inputBorderRadius: '4px',
  },
      },
    }
    const theme = createTheme(
      prefersDarkMode ? darkThemeOptions : lightThemeOptions
   );
   

   return (
      <ThemeProvider theme={theme}>
      <Box sx={{margin: 'auto', padding: '10px', width: { xs: '90%', md: '33%' }, }}>

         <Typography variant='h3'>The Beacon</Typography>
      <Auth
         supabaseClient={supabase}
         
         appearance={{theme: customTheme}}
         theme={mode}
         providers={['google']}
         redirectTo={`${process.env.NEXT_PUBLIC_URL}/auth/callback`}
      />
      </Box>
      </ThemeProvider>
   );
}
