var express = require("express");
var router = express.Router();
let publishToQueue;
let mysqlHelper;

const init = function (settings, lib) {
  publishToQueue = lib.rabbitMQHelper.publishToQueue;
  mysqlHelper = lib.mysqlHelper;
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET localhost:3000/send */
router.get("/send", function (req, res, next) {
  var msg = `{ "identifier": "fcm-msg-a1beff5ac", "type": "device", "deviceId": "string", "text": "Notification message"}`;
  publishToQueue("notification.fcn", msg);
  res.send("This is localhost:3000/send");
});

/* GET localhost:3000/send */
router.get("/getFcmJob", async function (req, res, next) {
  result = await mysqlHelper.getFcmJob();
  res.json(result);
});

module.exports = { init, router };
