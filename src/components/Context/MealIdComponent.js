import React, {useState, useEffect, createContext, useContext} from 'react';
import {firebase} from '../../firebase/firebase';
import { UserContext} from '../../AuthContext/AuthContext';


//1create the context hooks
const MealIdContext = createContext();

const MealIdComponent = (props) => {

  const [ids, setIds] = useState([]);
  const [saved, setSaved] = useState([]);
  const {user, uid} = useContext(UserContext)


    useEffect(() => {

      const meals = async () => {


      let retrieveMeals = [];
      //setLoading(true)

      let snapshot = await firebase.firestore()
          .collection('users')
          .doc(user.uid)
          .collection('saved')
          .get()
         // setLoading(false);

      snapshot.forEach(doc => doc.exists ? retrieveMeals.push(doc.data()) : null )
      setSaved(retrieveMeals);

      };

      //calling the function
      meals();

    },[]);

    const values = {saved}

  return(
    <MealIdContext.Provider value={values}>
      {props.children}
    </MealIdContext.Provider>
  )
};

export {MealIdContext,MealIdComponent};
