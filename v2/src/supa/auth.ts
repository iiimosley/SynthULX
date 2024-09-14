"use strict";

const firebase = require("../supa/config.js");
const DataFactory = require("./dataFactory.js");
const main = require("./main.js");
const view = require("./view.js");
const provider = new firebase.auth.GoogleAuthProvider();

module.exports.authUser = () => firebase.auth().signInWithPopup(provider);

module.exports.logout = () => firebase.auth().signOut();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    main.checkUser(user.uid);
    DataFactory.getPatches(user.uid).then((userPatches) => {
      view.userAuth(userPatches);
      view.userFeat();
    });
  } else {
    view.noUser();
    $("#patchData").hide();
  }
});
