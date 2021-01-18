import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";

const UserContext = React.createContext<firebase.auth.Auth | undefined>(undefined);
export default UserContext;