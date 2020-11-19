import firebase from 'firebase/app'

import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyB5iQaZRjcIi3hUiNnFp8bN24WVzsdlz20",
  authDomain: "ebird-photo-gallery.firebaseapp.com",
  databaseURL: "https://ebird-photo-gallery.firebaseio.com",
  projectId: "ebird-photo-gallery",
  storageBucket: "ebird-photo-gallery.appspot.com",
  messagingSenderId: "1072248205883",
  appId: "1:1072248205883:web:e0864face95b40ce64221e",
  measurementId: "G-ZC3Y49XMD9"
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.log(e)
}
let db = firebase.database()

export function getDatabase() {
  return db
}
