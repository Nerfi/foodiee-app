import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './FoodCard.css'

function FoodCard(props) {

  const {
    image,
    title,
    id
  } = props;

  return(
    <Card className="cardComponent">

      <Card.Img variant="top" src={image} />
      <Card.Body>

      <Link to={`meal/${id}`}>
        <Card.Title> <strong>{title}</strong></Card.Title>
      </Link>
        <Link to={`meal/${id}`}>
         <Button variant="primary">See Recipe</Button>
        </Link>
      </Card.Body>
      </Card>
  )
};

export default FoodCard;
