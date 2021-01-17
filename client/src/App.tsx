import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import { auth } from './app/firebase';

const App = () => {
  const signedIn = !!auth.currentUser;
  return (
    <Router>
      <Route path="/">
        <LoginScreen />
      </Route>
    </Router>
  );
}

export default App;
