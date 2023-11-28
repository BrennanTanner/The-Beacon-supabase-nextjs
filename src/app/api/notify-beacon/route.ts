import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import webpush from 'web-push';

export async function POST(request: NextRequest) {
   const data = await request.json();

   //needs to just take array of endpoints and distribute notifications to each

   webpush.setVapidDetails(
      'mailto:test@test.test',
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY
   );

   const notification = JSON.stringify({
      text: "hi",
      title: "Hello, Notifications!",
      options: {
        body: `ID: ${Math.floor(Math.random() * 100)}`
      }
    });
 
   //console.log(data.subscriptions);
   //const results = { success: [], fail: [] }
   const results = data.subscriptions.map((subscription) => {
      console.log(subscription)
      if (subscription.profile && subscription.profile != 'null' ) {
         const endpoint = subscription.profile.endpoint;
         const id = endpoint.substr(endpoint.length - 8, endpoint.length);

         webpush
            .sendNotification(subscription.profile, notification)
            .then(async (result) => {

               
               //results.success.push({ id: id, result: result });
               return result.status;
            })
            .catch((error) => {
               //results.fail.push({ id: id, result: error });
               return error;
            });
            return '201';
      } else {
         return '404';
      }
   });

   return NextResponse.json(
      {
         results: await results,
      },
      {
         status: 201,
      }
   );
}
