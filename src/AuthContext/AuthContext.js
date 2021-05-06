import React,{useState, useEffect, createContext} from 'react';
import {firebase, storage}from '../firebase/firebase';

  // 1- creating the context Hook
 const UserContext = createContext();

 /*
  we create a fucntion that Will handle the changes on the state, in this
  case  we will listen to when the Auth state changes in the user, it might be
  sign in, login out sign up,HOC
*/

 function UserAuth (props) {

  const [user, setUser] = useState();


   /* every context object has a provider , the mission of this provider is to
    PROVIDE the value that we pass in as a defualt value , that way all the components
    around this HOC will be able to use this state
    */

    const signUp = (email, password) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
    };

    const login = (email, password) => {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    };

    const logOut = () => {
      return firebase.auth().signOut()
    };

    const resetPassword = (email) => {
      return firebase.auth().sendPasswordResetEmail(email)
    };

  const updateEmail = (email) => {
    return user.updateEmail(email)
   };

   const updatePassword =(password) => {
    return user.updatePassword(password)
  }

  const updateUserName = (name, image) => {
    //this method takes in an object with two properties,
    // displayName, and photoUrl
    return user.updateProfile({displayName: name, photoURL: image})
  }



   useEffect(() => {
      //onauthStatechange is a hook that will listen whenever the user is logged in or logged out  in the app just that
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;

  },[user]);

   const value = {
    user,
    login,
    signUp,
    logOut,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUserName
   /* setUserProfilePhoto*/
   };


    return(
      <UserContext.Provider value={value}>
        {props.children}
      </UserContext.Provider>
    )

 };

export {UserContext, UserAuth};

