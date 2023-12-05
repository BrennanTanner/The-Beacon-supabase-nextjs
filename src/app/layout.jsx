import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
   
   title: 'The Beacon',
   description: 'Light the Beacon', 
   'apple-touch-icon': { sizes: '180x180', url: '/apple-touch-icon.png' },

   icon: { type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },

   icon: { type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },

   manifest: { url: '/manifest.webmanifest' },

   'mask-icon': { color: '#5bbad5', url: '/safari-pinned-tab.svg' },

   icon: { type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },

   icon: { type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },

   'msapplication-TileColor': '#da532c',
   'theme-color': '#ffffff',
};

export default function RootLayout({ children }) {
   return (
      <html lang='en'>
         <body className={inter.className}>{children}</body>
      </html>
   );
}
