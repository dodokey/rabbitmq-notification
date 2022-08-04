var defaultLogger;

//mount special function
if (Date.prototype.addHours === undefined) {
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };
}

var pkgs = {
  rabbitMQHelper: require("./rabbitMQHelper"),
  firebaseHelper: require("./firebaseHelper"),
};

var libObj = {
  init: (settings, lib) => {
    //init packages
    for (var pkg in pkgs) {
      switch (pkg) {
        default:
          pkgs[pkg].init(settings, lib);
          break;
      }
    }
  },
};

Object.assign(libObj, pkgs);
module.exports = libObj;
