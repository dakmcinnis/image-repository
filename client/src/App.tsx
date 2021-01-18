import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import firebase from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCEUfBiMqDOYDB38XEX0cc1HBBdOAgjYIs",
  authDomain: "shopify-backend-summer-2021.firebaseapp.com",
  projectId: "shopify-backend-summer-2021",
  storageBucket: "shopify-backend-summer-2021.appspot.com",
  messagingSenderId: "311782313611",
  appId: "1:311782313611:web:7abbe68ea5393ccd470e8e"
};;

firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route exact path="/home" component={HomeScreen} />
        </Switch>
        <Redirect path="/" to="/login" />
      </Router>
    </div>
  );
}

export default App;
