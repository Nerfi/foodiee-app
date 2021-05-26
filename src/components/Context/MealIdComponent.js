import React, {useState, useEffect, createContext, useContext} from 'react';
import {firebase} from '../../firebase/firebase';
import { UserContext} from '../../AuthContext/AuthContext';


//1create the context hooks
const MealIdContext = createContext();

const MealIdComponent = (props) => {

  const [ids, setIds] = useState([]);
  const [saved, setSaved] = useState([]);
  const {user} = useContext(UserContext)
  const {uid} = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);



    useEffect(() => {

      const meals = async () => {

      let retrieveMeals = [];
      //setLoading(true)
      try {
        setLoading(true)

      let snapshot = await firebase.firestore()
          .collection('users')
          .doc(user?.uid)
          .collection('saved')
          .get()
         // setLoading(false);
        snapshot.forEach(doc => doc.exists ? retrieveMeals.push(doc.data()) : null )
      } catch(e) {
        setError(e.message)
      }

      setLoading(false);



      setSaved(retrieveMeals);
      setIds(saved.map(id => id.id))

      };

      //calling the function
      meals();

    },[user]);


    const values = {saved, ids, error, loading};

  return(
    <MealIdContext.Provider value={values}>
      {props.children}
    </MealIdContext.Provider>
  )
};

export {MealIdContext,MealIdComponent};
