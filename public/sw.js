// Show notification when received
self.addEventListener('push', (event) => {
   /**
    Assuming the payload string is a valid JSON and can be parsed and contains a minimum of valid
    fields... possible fields can be:
    title: String,
    body: String,
    icon: String,
    badge: String,
    image: String,
    vibrate: Array,
    sound: String,
    dir: String,
    tag: String,
    requireInteraction: Boolean,
    renotify: Boolean,
    silent: Boolean,
    timestamp: Date
  */
   let data = event.data;

   console.log(data);
   // show
   self.registration
      .showNotification(data.title, data.body)
      .catch((error) => {
         console.log(error);
      });
});
