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

   const notification = data.subscriptions.find(
      (subscription) => subscription.sender == true
   ).username;

   const results = data.subscriptions.map((subscription) => {
      if (subscription.profile && subscription.profile != 'null' && !subscription.sender) {
         const endpoint = subscription.profile.endpoint;
         const id = endpoint.substr(endpoint.length - 8, endpoint.length);
         if(endpoint.includes('https://web.push.apple.com/')){
            let pushData = JSON.stringify({
               "title": "Push title",
               "body": "Additional text with some description",
               "icon": "https://andreinwald.github.io/webpush-ios-example/images/favicon.png",
               "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1920px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
               "data": {
                   "url": "https://andreinwald.github.io/webpush-ios-example/success.html",
                   "message_id": "your_internal_unique_message_id_for_tracking"
               }
           });
           webpush.sendNotification(subscription.profile, pushData).then(async (result) => {
            //results.success.push({ id: id, result: result });
            console.log(result)
            return result.status;
         })
         .catch((error) => {
            //results.fail.push({ id: id, result: error });
            console.log(error)
            return error;
         });
   
         }else{
         webpush
            .sendNotification(subscription.profile, notification)
            .then(async (result) => {
               //results.success.push({ id: id, result: result });
               console.log(result)
               return result.status;
            })
            .catch((error) => {
               //results.fail.push({ id: id, result: error });
               console.log(error)
               return error;
            });
         return '201';
         }
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
