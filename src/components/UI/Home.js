import React from 'react';
import './Home.css';
import DisplayFood from '../DisplayFood';
import AboutUs from './AboutUs';


function Home(props){

  return(
    <div>
      <div className="maingDivHome">
        <div className="info__home">
         <h2>Always Choose Good</h2>
         <a href="#menu" className="btn"> Our menu !</a>
         <a href="/random" className="btn">Feeling adventurous?</a>
        </div>
      </div>
      <AboutUs/>
      <DisplayFood/>
    </div>
  );
};

export default Home;
