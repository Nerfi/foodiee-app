import React,{ useContext} from  'react';
import './Dashboard.css';

import { UserContext} from '../../AuthContext/AuthContext';
import FoodCard from '../UI/FoodCard';
import {useHistory} from 'react-router-dom';
import Spinner from '../UI/Spinner';
import {MealIdContext} from '../Context/MealIdComponent';



const Dashboard = () => {

  const {user} = useContext(UserContext);
  //meal id context
  const {saved, error, loading} = useContext(MealIdContext);
  //using history object
  const history = useHistory();


  if (loading) return <Spinner/>

  return(
    <div className="dashboard">
    {error && <p>something went wrong...{error}</p>}
      <div className="userData">

        <img src={user ? user.photoURL : ''}
        alt="userProfile"
        style={{ borderRadius: '50%', height: '20vh'}}/>

       <div className="userInfo">
       <h3>{ user?.displayName }</h3>
       <p>{user?.email}</p>
       </div>
       <div className="changeDataBtn">

       <i class="fa fa-edit" style={{fontSize: '28px'}} onClick={() => history.push("/update-user-data")}></i>
       <p>update your profile</p>
       </div>
      </div>

      <div className="savedMeals">

      <div className="titleDasboard">
       <h2>My saved meals </h2>
      </div>

        <div className="savedMealsCard">
        { saved?.map(meal => <FoodCard {...meal} key={meal.id} />)}

        </div>

      </div>
    </div>
  )
};

export default Dashboard;
