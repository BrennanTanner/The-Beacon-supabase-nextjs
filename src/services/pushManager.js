//need to change this so that endpoints are pulled in with group members,
//then endpoints are sent to edge function in an array, from dataSenders.
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

// TODO: need to insert endpoint into database after service worker is created
async function checkNotifications() {
   if ('serviceWorker' in navigator && 'PushManager' in window) {
      

      const button = document.getElementById("subscribe");
      button.addEventListener("click", async () => {
         alert(Notification.permission);
        // Triggers popup to request access to send notifications
        const result = await window.Notification.requestPermission();
    
        // If the user rejects the permission result will be "denied"
        alert(Notification.permission);
        if (result == "granted") {
         alert('line 21');
          // You must use the service worker notification to show the notification
          // Using new Notification("Hello World", { body: "My first notification on iOS"}) does not work on iOS
          // despite working on other platforms
          await registration.showNotification("Hello World", {
            body: "My first notification on iOS",
          });
        }
      });

      const button2 = document.getElementById("unsubscribe");
      button2.addEventListener("click", async () => {
   
        alert(navigator.serviceWorker.getRegistration())
        unRegisterServiceWorker()

        alert("permission: " + Notification.permission);
      });


      if (Notification.permission != 'granted') {
         //
         
         if (requestPushNotification()) {
            // Register the service worker.
            await navigator.serviceWorker.register('/sw.js',{
               scope: "./",
             });

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
                           .upsert({
                              user_id: user.id,
                              endpoint: pushData.endpoint,
                              keys: {
                                 auth: pushData.keys.auth,
                                 p256dh: pushData.keys.p256dh,
                              },
                              expiration_time: pushData.expirationTime,
                           }, { onConflict: 'user_id' });

                        if (error) throw error;
                        alert('Notifications Enabled!');
                     } catch (error) {
                        alert(error);
                        //alert('Error sending request!');
                     }

                     // The push subscription details needed by the application
                     // server are now available, and can be sent to it using,
                     // for example, the fetch() API.
                  },
                  (error) => {
                     // During development it often helps to log errors to the
                     // console. In a production environment it might make sense to
                     // also report information about errors back to the
                     // application server.
                     alert(error);
                  }
               );
            });
         }

         //   // Save the push subscription to the database.
         //   savePushSubscription(pushSubscription);
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
            alert("youre unsubscribed");
          })
          .catch((e) => {
            alert("unsubscribe failed");
            alert(e);
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
   Notification.requestPermission()
      .then(() => {
         return true;
      })
      .catch((error) => {
         alert('request was rejected');
         alert(error);
         return false;
      });
}

async function createPushNotification() {
   // Create and send a test notification to the service worker.
   let randy = Math.floor(Math.random() * 100);
   let notification = {
      title: 'Test ' + randy,
      options: { body: 'Test body ' + randy },
   };
   // Get a reference to the service worker registration.
   let registration = await getRegistration();
   // Check that the service worker registration exists.
   if (registration) {
      // Check that a service worker controller exists before
      if (navigator.serviceWorker.controller) {
         navigator.serviceWorker.controller.postMessage(notification);
      } else {
         alert('No service worker controller found. Try a soft reload.');
      }
   }
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
