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

   'apple-touch-startup-image': {
      media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      url: '/splash/828x1792.png',
   },

   'apple-touch-startup-image': {
      media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      url: '/splash/1242x2688.png',
   },

   'apple-touch-startup-image': {
      media: 'screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      url: '/splash/1125x2436.png',
   },

   'apple-touch-startup-image': {
      media: 'screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      url: '/splash/1242x2208.png',
   },

   'apple-touch-startup-image': {
      media: 'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      url: '/splash/750x1334.png',
   },

   'apple-touch-startup-image': {
      media: 'screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      url: '/splash/2048x2732.png',
   },

   'apple-touch-startup-image': {
      media: 'screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      url: '/splash/1668x2224.png',
   },

   'apple-touch-startup-image': {
      media: 'screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      url: '/splash/640x1136.png',
   },

   'apple-touch-startup-image': {
      media: 'screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      url: '/splash/1668x2388.png',
   },

   'apple-touch-startup-image': {
      media: 'screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      url: '/splash/1536x2048.png',
   },
};

export default function RootLayout({ children }) {
   return (
      <html lang='en'>
         <body className={inter.className}>{children}</body>
      </html>
   );
}
