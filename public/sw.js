// Show notification when received
self.addEventListener('message', (event) => {
   let notification = event.data;
   self.registration.showNotification(
     notification.title,
     notification.options
   ).catch((error) => {
     console.log(error);
   });
 });