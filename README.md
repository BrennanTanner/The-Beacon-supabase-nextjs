
## What is the Beacon?

The Beacon is a simple messaging service that allows users to notify a group of friends that a beacon has been lit. Communication is limited to sending one simple signal. This was a creative project meant to stretch me and create a usable application. 

<img src="/public/images/image1.png" width="250" > <img src="/public/images/image2.png" width="250" >


Try it at: [lightthebeacon.app](https://www.lightthebeacon.app/)


## The stack

The beacon is built with the following tools:
- Next.js
- Supabase SQL database, Edge functions, and Javascript Client
- Vercel hosting & web functions
- Graphics created by me :)

## The story

I have a friend who plays a lot of Xbox. This friend is always asking me and others to play Xbox with him, daily even. He used to type out whole messages, but his texts have slowly devolved into single words or even single emojis. We all know what is meant by these messages, and when one of us is willing to play Xbox with him, they send an emoji back. This reminded me of *the Beacons of Gondor* in *the Lord of the Rings*, He is lighting his beacon and we are choosing whether or not we will heed his call. 

I decided to make this into a web app. I chose a stack and started working. I was already familiar with React.js and MongoDB, so I decided to stretch myself by using Next.js and Supabase's SQL DB. Learning SQL was trickier than expected, but Supabase honestly made it really easy to manage. The hardest part of this project was learning something that I was completely unaware of...

#### PWAs
I wanted my app to be able to send notifications to users, even when the webpage was not currently open in the browser. With a lot of research, I learned about "Progressive Web Apps" and their capabilities. Put simply, a PWA is an app that is "downloadable" through the browser ([Read more about PWAs here](https://web.dev/articles/what-are-pwas)). To turn my webpage into a PWA, I needed to:
  - Create a manifest for the browser
  - Register a service worker to run in the background
  - Set up the service worker to receive notification data

This was much harder than expected. Service workers are finicky and it took me a good amount of time to get mine to receive notifications. Even after getting test notifications to appear, there was another issue. I wanted my PWA to be downloadable on Apple devices and Apple's method of delivering push notifications is a bit different than Google's. Apple just recently pushed out the ability for PWAs to be downloadable from Safari and to receive notifications, so documentation and web tutorials were rather limited. Many tutorials I found were outdated and unusable for my needs. This was incredibly difficult for me. I eventually got my PWA to be downloadable on IOS (although receiving push notifications is still buggy). 


#### Web Functions
I use two different web functions in this app. I use one through Supabase that receives a beacon group's unique ID and uses the ID to query the database to get all the users associated with that beacon group. This Supabase web function then sends an array of user data to another web function hosted on Vercel. There, the function loops through the users and delivers a notification payload to each user in the array. This functionality was a lengthy process for me, but I can honestly say that the greatest part of this project was the overwhelming joy of finally receiving a notification from my browser, sent from another device through the internet. It was absolute bliss. 

## Plans for the future

I plan to finish cleaning up bugs so that notifications can be enabled on every type of device. With that, I need to also make sure that notifications can be delivered to IOS devices. There is some basic functionality that has yet to be added, like removing friends and deleting groups. I plan on making this app public after that is finished, or at least advertising it more on social media. One last issue I face is cost. In the odd case that people actually use this app and I get more than a few hundred users, I would quickly use up my free-tier data on Supabase and Vercel. I would need to find a way to monetize the app, and I have no idea how I would do that. I am not a fan of invasive adds or selling user data, so it would most likely be a subscription thing. Oh well, problems for a future (and very lucky) Brennan to deal with.


### Thanks for stopping by!
