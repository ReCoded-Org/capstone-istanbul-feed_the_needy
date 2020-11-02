import * as firebase from "firebase";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDOMxk9JKarwunNDvSItx3OQCb2YmjH7tw",
  authDomain: "foodoncoupon.firebaseapp.com",
  databaseURL: "https://foodoncoupon.firebaseio.com",
  projectId: "foodoncoupon",
  storageBucket: "foodoncoupon.appspot.com",
  messagingSenderId: "905971863153",
  appId: "1:905971863153:web:ef22442bbd8b5d5db515d0",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
