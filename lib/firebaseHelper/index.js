var admin = require("firebase-admin");

// init from app.js
var init = function (settings, lib) {
  //init admin app
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(settings.serviceAccountKey)),
    databaseURL: settings.databaseURL,
  });
};

const pushNotification = async function (content) {
  // The topic name can be optionally prefixed with "/topics/".
  // See documentation on defining a message payload.
  var message = {
    notification: {
      title: "Incoming message",
      body: content,
    },
    topic: "topic",
  };
  // Send a message to devices subscribed to the provided topic.
  try {
    let response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  init,
  pushNotification,
};
