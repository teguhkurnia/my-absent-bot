const firebase = require("firebase");
require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyANVzt70g1dn-lPDAUuuIKOqIepZWl1F74",
  authDomain: "app-absent.firebaseapp.com",
  databaseURL: "https://app-absent.firebaseio.com",
  projectId: "app-absent",
  storageBucket: "app-absent.appspot.com",
  messagingSenderId: "914191222760",
  appId: "1:914191222760:web:18febfa88032e10755865d",
  measurementId: "G-6RCFN6YLH5",
};

const app = firebase.initializeApp(firebaseConfig);
console.log("db connect");

module.exports.fs = app.firestore();
