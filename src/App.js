import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/UI/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleMeal from './components/SingleMeal';
import NavbarFood from './components/UI/Navbar';
import RandomMeal from './components/RandomMeal';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Dashboard from './components/userProfile/Dashboard';
//importing the context
import {UserAuth} from './AuthContext/AuthContext';
import UpdateUserData from './components/UI/UpdateUserData';
import ForgotPassword from './components/userProfile/ForgotPassword';
//protected routes
import ProtectedRoutes from './Auth/ProtectedRoutes';
import {MealIdComponent} from './components/Context/MealIdComponent';

function App() {
  return (

    <div className="App">


      <Router>
      <UserAuth>
       <MealIdComponent>
         <NavbarFood/>
         <Switch>

         <Route path="/meal/:id" component={SingleMeal}/>
         <Route path="/random" component={RandomMeal}/>
         <Route path="/login" component={Login}/>
         <Route path="/signup" component={Signup}/>
         <Route path="/forgot-password" component={ForgotPassword}/>
         <ProtectedRoutes path={"/dashboard"} component={Dashboard} />
         <ProtectedRoutes path={"/update-user-data"} component={UpdateUserData} />
         <Route exact  path="/" component={Home} />
         </Switch>
          </MealIdComponent>

         </UserAuth>
      </Router>


    </div>
  );
}

export default App;


