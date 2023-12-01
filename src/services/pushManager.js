//need to change this so that endpoints are pulled in with group members,
//then endpoints are sent to edge function in an array, from dataSenders.
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

// TODO: need to insert endpoint into database after service worker is created
async function checkNotifications() {
   if ('serviceWorker' in navigator && 'PushManager' in window) {
      // const button = document.getElementById('subscribe');
      // button.addEventListener('click', async () => {
      //    alert(window.Notification.permission);
      //    // Triggers popup to request access to send notifications
      //    const result = await window.window.Notification.requestPermission();

      //    // If the user rejects the permission result will be "denied"
      //    alert(window.Notification.permission);
      //    if (result == 'granted') {
      //       alert('line 21');
      //       // You must use the service worker notification to show the notification
      //       // Using new Notification("Hello World", { body: "My first notification on iOS"}) does not work on iOS
      //       // despite working on other platforms
      //       const registration = getRegistration();
      //       await registration.showNotification('Hello World', {
      //          body: 'My first notification on iOS',
      //       });
      //    }
      // });

      // const button2 = document.getElementById('unsubscribe');
      // button2.addEventListener('click', async () => {
      //    var reg = await getRegistration()
      //    alert(JSON.stringify(reg));
      //    unRegisterServiceWorker();

      //    alert('permission: ' + window.Notification.permission);
      // });

      if (window.Notification.permission != 'granted') {
         //
         //alert('line 41');
         if (requestPushNotification()) {
            //alert('line 43');
            // Register the service worker.
            await navigator.serviceWorker.register('/sw.js', {
               scope: './',
            });
            //alert(getRegistration());
            navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
               const options = {
                  userVisibleOnly: true,
                  // applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
                  applicationServerKey: urlB64ToUint8Array(
                     process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
                  ),
               };
               serviceWorkerRegistration.pushManager.subscribe(options).then(
                  async (pushSubscription) => {
                     const pushData = pushSubscription.toJSON();
                     const {
                        data: { user },
                     } = await supabase.auth.getUser();

                     try {
                        let { error } = await supabase
                           .from('notification_subscription')
                           .upsert(
                              {
                                 user_id: user.id,
                                 endpoint: pushData.endpoint,
                                 keys: {
                                    auth: pushData.keys.auth,
                                    p256dh: pushData.keys.p256dh,
                                 },
                                 expiration_time: pushData.expirationTime,
                              },
                              { onConflict: 'user_id' }
                           );

                        if (error) throw error;
                        alert('Notifications Enabled!');
                     } catch (error) {
                        //alert('error line 84');
                        // alert(JSON.stringify(error));
                        console.error(error);
                        //alert('Error sending request!');
                     }
                  },
                  (error) => {
                     //alert('error line 98');
                     // alert(JSON.stringify(error));
                     console.error(error);
                  }
               );
            });
         }
      }
   } else {
      // Push notifications are not supported by the browser.
      alert(
         'Push notifications are not supported by the browser. If you want to be notified when your friends light the beacon, try updating your browser.'
      );
   }
}

// Get the current service worker registration.
function getRegistration() {
   return navigator.serviceWorker.getRegistration();
}

// Unregister a service worker, then update the UI.
async function unRegisterServiceWorker() {
   // Get a reference to the service worker registration.
   navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((subscription) => {
         subscription
            .unsubscribe()
            .then((successful) => {
               alert('youre unsubscribed');
            })
            .catch((e) => {
               console.error(e);
            });
      });
   });

   let registration = await getRegistration();
   // Await the outcome of the unregistration attempt
   // so that the UI update is not superceded by a
   // returning Promise.
   await registration.unregister();
   alert('service worker unregistered');
}

async function requestPushNotification() {
   window.Notification.requestPermission()
      .then(() => {
         return true;
      })
      .catch((error) => {
         alert('error line 150');
         // alert(JSON.stringify(error));
         console.error(error);
         return false;
      });
}
// Convert a base64 string to Uint8Array.
// Must do this so the server can understand the VAPID_PUBLIC_KEY.
const urlB64ToUint8Array = (base64String) => {
   const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
   const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
   const rawData = window.atob(base64);
   const outputArray = new Uint8Array(rawData.length);
   for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
   }
   return outputArray;
};

module.exports = {
   checkNotifications,
};
