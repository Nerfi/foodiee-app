import  React,{useState} from 'react';
import './RandomMeal.css';
import FoodCard from './UI/FoodCard';
import TagsSelection from './UI/TagsSelection';
import {apiHelper} from '../API/api';
import Spinner from './UI/Spinner';


function RandomMeal() {

  const [random, setRandom] = useState([]);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_SECRET = process.env.REACT_APP_FOOD_KEY;

const select = (eventKey) => {
  //checking if we have already the values on the state array
  setTags((tags) => {

    if (tags.includes(eventKey)) {
      return tags;
     }

     return [...tags, eventKey];

  });
};


 //make API call when the user has selected the tags and click the button
  const fetchRandom = async () => {

      //joining the user tags
      setLoading(true)
      const selectedTags = tags.join();
      const url = `https://api.spoonacular.com/recipes/random?number=6&tags=${selectedTags}&apiKey=${API_SECRET}`;
      //making the request
      await apiHelper(url)
        .then(res => setRandom({res: res.recipes}))
        .catch(e => setError(e.message))
        setLoading(false)
 };

if (loading) return  <Spinner/>


return (
    <div className='content' >
      <div>{error && <p>something went wrong...</p>}</div>

      <TagsSelection select={select} tags={tags}/>

     <div className="button">
      <button onClick={fetchRandom}>Search for random recipies</button>
     </div>

     <div className="displayMeals">
     {
      random.res? (random.res.length?  random?.res?.map(meal => <FoodCard {...meal} key={meal.id}/> ) :<p>nothing was return</p>) : null
    }
    </div>


  </div>
)

};

export default RandomMeal;

