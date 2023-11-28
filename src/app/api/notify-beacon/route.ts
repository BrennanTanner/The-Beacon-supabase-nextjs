import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import webpush from 'web-push';

export async function POST(request: NextRequest) {
   const data = await request.json();
   const _PrivateKey_ = process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY;
   const _PublicKey_ = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

   //needs to just take array of endpoints and distribute notifications to each

   webpush.setVapidDetails('mailto:test@test.test', _PublicKey_, _PrivateKey_);

   const notification = JSON.stringify({
      title: 'Hello, Notifications!',
      options: {
         body: `ID: 100`,
      },
   });

   const subscription = {
      endpoint:
         'https://fcm.googleapis.com/fcm/send/cupot3r9RKc:APA91bGV7x0OGUjO7XkLz8NTx7GvxySBi6KvcohfzTgPoCIe7hceYewqFTImkOAT-kS4Q5R0K8jU-fnukpKD-oSNPLQ_QQ83wM_dXfDMtBApwE1CsuDH_CtZR27rZjVwgOUorWA7Vhhm',
      keys: {
         auth: 'QYi3yTv-QtVkQ_LtKzVLrw',
         p256dh:
            'BJHI-gjWVnqsXaxpJmPoLNbNK950gVjj9eIt7ntZOfVn-yWDik6ToVCuVNRiIoo4vNa55e3WNwWSqVOXtIHZFq4',
      },
      expiration_time: null,
   };

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
