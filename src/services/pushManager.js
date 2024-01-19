//need to change this so that endpoints are pulled in with group members,
//then endpoints are sent to edge function in an array, from dataSenders.
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

const getBrowserName = () => {
   let browserInfo = navigator.userAgent;
   let browser;
   if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
      browser = 'Opera';
   } else if (browserInfo.includes('Edg')) {
      browser = 'Edge';
   } else if (browserInfo.includes('Chrome')) {
      browser = 'Chrome';
   } else if (browserInfo.includes('Safari')) {
      browser = 'Safari';
   } else if (browserInfo.includes('Firefox')) {
      browser = 'Firefox';
   } else {
      browser = 'unknown';
   }
   return browser;
};

// check if the device is in standalone mode
const isInStandaloneMode = () => {
   return window.navigator.standalone;
};

const subscribeButton = async () => {
   // Triggers popup to request access to send notifications
   //const result = await window.Notification.requestPermission();
   checkNotifications();
};

const sendPushSample = () => {
   const title = 'The Beacon Has been Lit!';
   const options = {
      body: 'Light your beacon in response',
      icon: '../../public/Pyre.svg',
      data: {
         url: 'https://www.lightthebeacon.app',
      },
   };
   navigator.serviceWorker.ready.then(function (serviceWorker) {
      serviceWorker.showNotification(title, options);
   });
};
// TODO: need to insert endpoint into database after service worker is created
async function checkNotifications() {
   if ('serviceWorker' in navigator && 'PushManager' in window) {
      if (window.Notification.permission != 'granted') {
         //
         //alert('line 41');
         if (requestPushNotification()) {
            //alert('line 43');
            // Register the service worker.
            if (getBrowserName() == 'Safari') {
               await navigator.serviceWorker.register('/swIOS.js', {
                  scope: './',
               });
            } else {
               await navigator.serviceWorker.register('/swIOS.js', {
                  scope: './',
               });
            }

            //alert(getRegistration());
            navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
               const options = {
                  userVisibleOnly: true,
                  // applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
                  applicationServerKey: urlB64ToUint8Array(
                     process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
                  ),
               };
               console.log(JSON.stringify(options));
               serviceWorkerRegistration.pushManager.subscribe(options).then(
                  async (pushSubscription) => {
                     console.log(pushSubscription.subscriptionId);
                     console.log(pushSubscription.endpoint);
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

                        alert(error);
                        console.log(error);
                        //alert('Error sending request!');
                     }
                  },
                  (error) => {
                     //alert('error line 98');
                     // alert(JSON.stringify(error));

                     alert(error);
                     console.error(error);
                  }
               );
            });
         }
      }
   } else {
      // Push notifications are not supported by the browser.
      // if(getBrowserName() == "Safari"){
      //    alert(
      //       'Push notifications are only available on saved websites. Save this page to your home screen to recieve notifications when beacons are lit!'
      //    );
      // }
      // else{
      alert(
         'Push notifications are not supported by the browser. If you want to be notified when your friends light the beacon, try updating your browser.'
      );
   }
   // }
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
               alert('ln 134');
               alert(e);
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
   // window.Notification.requestPermission((permission) => {
   //    alert('ln 178');
   //    alert(permission);
   //    return true;
   // }).catch((error) => {
   //    alert('ln 179');
   //    alert(error);
   //    return false;
   // });

   // alert('ln 184');

   window.Notification.requestPermission()
      .then(() => {
         alert('ln 186');
         return true;
      })
      .catch((error) => {
         alert('error line 190');
         alert(e);
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
   getBrowserName,
   subscribeButton,
   isInStandaloneMode,
   sendPushSample,
};
