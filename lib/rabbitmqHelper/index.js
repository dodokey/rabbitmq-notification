var amqp = require("amqplib/callback_api");
let mqHost;
let firebaseHelper;
let mysqlHelper;

// init from app.js
var init = function (settings, lib) {
  mqHost = settings.MQ_HOST;
  //createListener notification.fcn
  createQueueListener("notification.fcn", doWhenFcn);
  firebaseHelper = lib.firebaseHelper;
  mysqlHelper = lib.mysqlHelper;
};

const doWhenFcn = async function (msg) {
  const stringMsg = msg.content.toString();
  console.log("[*] notification.fcn Received %s", stringMsg);
  const objMsg = JSON.parse(stringMsg);
  try {
    //push to FCN
    await firebaseHelper.pushNotification(objMsg.text);
    console.log(`[*] Successful PUSH FCN, msg: ${objMsg.text}`);

    //save to db
    let doneMsg = {
      identifier: objMsg.identifier,
      deliverAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    await mysqlHelper.insert(doneMsg);
    console.log(`[*] Successful insert DB, identifier: ${doneMsg.identifier}`);

    //send to done
    let doneQueueName = "notification.done";
    doneMsg = JSON.stringify(doneMsg);
    publishToQueue(doneQueueName, doneMsg);
    console.log(`[*] Successful Sent to ${doneQueueName}, msg: ${doneMsg}`);
  } catch (error) {
    throw error;
  }
};

const createQueueListener = function (queueName, doWhen) {
  amqp.connect(mqHost, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      channel.assertQueue(queueName, { durable: false });
      console.log(` ---- [*] ${queueName} Waiting for messages in . -----`);
      channel.consume(queueName, doWhen, { noAck: true });
    });
  });
};

const publishToQueue = function (queueName, msg) {
  amqp.connect(mqHost, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      channel.assertQueue(queueName, { durable: false });
      channel.sendToQueue(queueName, Buffer.from(msg));
    });
  });
};

module.exports = {
  init,
  publishToQueue,
};
