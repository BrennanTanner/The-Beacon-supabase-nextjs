import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import webpush from 'web-push';

export async function POST(request: NextRequest) {
   const data = await request.json();

   //needs to just take array of endpoints and distribute notifications to each

   webpush.setVapidDetails('mailto:test@test.test', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY);

   const notification = JSON.stringify({
      title: 'Hello, Notifications!',
      options: {
         body: `ID: 100`,
      },
   });

   console.log(data.subscriptions);
   const results = data.subscriptions.forEach(async (subscription) => {
      const endpoint = subscription.endpoint;
      const id = endpoint.substr(endpoint.length - 8, endpoint.length);
      const results = { success: [], fail: [] };

      await webpush
         .sendNotification(subscription, notification)
         .then((result) => {
            results.success.push({ id: id, result: result });
         })
         .catch((error) => {
            return results.fail.push({ id: id, result: error });
         });
   });

   return NextResponse.json(
      {
         results: results,
      },
      {
         status: 201,
      }
   );
}
