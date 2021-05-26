import React, {useState,useEffect, useContext} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import './SingleMeal.css';
import {apiHelper} from '../API/api';
import {firebase} from '../firebase/firebase';
import { UserContext} from '../AuthContext/AuthContext';
import Spinner from './UI/Spinner';
import {MealIdContext} from './Context/MealIdComponent';


function SingleMeal(props) {


  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const [s,setS] = useState({})
  const [loading, setLoading] = useState(false);
    //contexts
  const {user}  = useContext(UserContext);
  const {saved} = useContext(MealIdContext);


  const [cliked, setCliked] = useState(false);
  const [clickIngredients, setClickIngredients] = useState(false);
  const [savedMealError, setSavedMealError] = useState(null);


  const history= useHistory();

  let {params} = useRouteMatch();
  //secret key
  const API_SECRET = process.env.REACT_APP_FOOD_KEY;


  //storing the ids  in an array of just ids
  const ids = saved.map(item => item.id);


  useEffect(() => {

      const fetchSingleMeal = async () => {
        setLoading(old => !old)

        const url = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_SECRET}`;
        await apiHelper(url)
          .then(res => setResponse(res))
          .catch(e =>  setError(e.message))

       setLoading(old => !old)
      }
      //calling the fucntion
      fetchSingleMeal();

  },[params.id]);



if(loading)return <Spinner/>

  //deconstructing the object response
  const {
    image,
    title,
    summary,
    sourceUrl,
    spoonacularScore,
    analyzedInstructions,
    cuisines,
    diets,
    dishTypes,
    vegan,
    vegetarian,
    extendedIngredients,
    id
  } = response;



  //extracting data from API steps response
  const stepsAndMeasures = object => {
      return object?.slice(0,2).map(step => (
        <div key={step.name}>
         <p>{step.name.toUpperCase()}</p>
         <div className="unitsAndAmount">
          <p className='amount'>{step.measures.us.amount}</p>
          <p>{step.measures.us.unitShort}</p>
         </div>
        </div>
     ));
  }

  /* function in order to listen when the user click and then displayig more or less content*/
  const stepsAndMeasuresFull = object => {
    return object?.map(step => (
        <div key={step.name}>
         <p>{step.name.toUpperCase()}</p>
         <div className="unitsAndAmount">
          <p className='amount'>{step.measures.us.amount}</p>
          <p>{step.measures.us.unitShort}</p>
         </div>
        </div>
     ));

  }


///replacing html tags
const replaceBtag = string => string.replace(/<.*?>/g, '')

const displaySteps = array => {
  return array && (
    <ol>
      {array[0]?.steps?.slice(0,2).map((step, index) => <li key={index}> {step.step}</li>)}
    </ol>
    )
  };

//crear otro function para desplegar todos los pasos en caso
//de que el user asi lo desee

const fullSteps = array => {
  return array && (
    <ol>
      {array[0]?.steps?.map((step, index) => <li key={index}> {step.step}</li>)}
    </ol>
    );

};



//adding to firebase
const addToDb = async (e) => {

 e.preventDefault();
//redirecting the user in case there is no one logged in
if (!user) {
  history.push("/login");
}


    try {
    await firebase.firestore()
    .collection('users')
    .doc(user.uid)
    .collection('saved')
    .add({
    image,
    title,
    summary,
    sourceUrl,
    spoonacularScore,
    analyzedInstructions,
    cuisines,
    diets,
    dishTypes,
    vegan,
    vegetarian,
    extendedIngredients,
    id
    })
    .then(res =>  setS(res))


    } catch(e) {
      setSavedMealError(e.message)
    }
return user

}

  return (
    <div className="container">
    {error  && error}
    {savedMealError && savedMealError}
      <div className="background" style={{backgroundImage: `url(${image})`, borderStyle: 'solid'}}>
       <div className="saveIcon">
       </div>
        <div className="mealTitle">
         {title}
        </div>

        <div className="savedBtn"  onClick={addToDb}>
        {


          ids.includes(response.id) ? '' : <i className=" extraClass fa fa-bookmark"   style={{ width: '120px', marginTop: '37rem'}}></i>

        }
        </div>


      </div>

        <div className="descriptionRecipe">
         {summary && replaceBtag(summary)}
         <div className="originalUrl">
           <strong> <span>You can find the original recipe here:</span> </strong>
           <p><a href={sourceUrl} target="_blank">See recipe</a></p>
         </div>

        </div>
    <div className="displayStepsAndIngredients">
      <div className="ingredientsMeal">
       <h2>Ingrediensts</h2>
       {clickIngredients ? stepsAndMeasuresFull(extendedIngredients) : stepsAndMeasures(extendedIngredients) }
       <p onClick={() => setClickIngredients(!clickIngredients)}>{clickIngredients ? 'Read Less' : 'Read More'}</p>

      </div>

      <div className="mealSteps">
      <h2>Method</h2>
       {cliked ? fullSteps(analyzedInstructions) : displaySteps(analyzedInstructions)}
       <p onClick={() => setCliked(!cliked)}>{cliked ? 'Read Less' : ' Read More'}</p>

      </div>
  </div>

  </div>
  )
};

export default SingleMeal;
