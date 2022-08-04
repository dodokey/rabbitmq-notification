# RabbitMQ Notification

## Environment

Node.js v16.15.1

## Project setup

1. Package install:

```bash
npm install
```

1. Adjust .env file:

   - Adjusted MySQL DB, RabbitMQ Settings.
   - Firebase databaseURL, serviceAccountKey.

2. Start server:

```bash
npm start
```

## Demo with Docker

```bash
docker-compose up
```

Then you will see [---- [*] notification.fcn Waiting for messages in . -----] means server run successfully and listening for notification!

<img width="1275" alt="貼上的影像_2022_8_4_下午9_54" src="https://user-images.githubusercontent.com/11568597/182865118-db6457b7-aca2-47db-9816-7f4a1270b29a.png">

## Demo

1. [GET] http://localhost:3000/send

   => Send a fake notification into rabbitMQ: notification.fcn

2. [GET] http://localhost:3000/getFcmJob

   => Get records in fcm_job table.

3. http://localhost:15672/ (Username/Password= guest)

   => Access [RabbitMQ Management] and you will see data had publish to notification.done

   <img width="1280" alt="貼上的影像_2022_8_4_下午10_03" src="https://user-images.githubusercontent.com/11568597/182866921-a25d37f4-d52c-4b94-828f-3b92e9ce08cb.png">
