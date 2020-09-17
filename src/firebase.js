import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyD8Xq8VzcpmWZ9ZWDnj30GP_DrlEmyVWjw",
    authDomain: "react-blog-demo-62374.firebaseapp.com",
    databaseURL: "https://react-blog-demo-62374.firebaseio.com",
    projectId: "react-blog-demo-62374",
    storageBucket: "react-blog-demo-62374.appspot.com",
    messagingSenderId: "493928861725",
    appId: "1:493928861725:web:7de74fe1ac034e8096b6f4",
    measurementId: "G-BQ525VB49V"
};
firebase.initializeApp(config);
export default firebase;