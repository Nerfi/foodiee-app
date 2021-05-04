import React from 'react';
import {Nav} from 'react-bootstrap';

function TagsSelection(props) {

  return(
     <Nav className="justify-content-center"   onSelect={props.select} >
        <Nav.Item >
          <Nav.Link className={props.tags.includes('vegetarian') ?  'disabled' :  ''}  eventKey="vegetarian" >Vegetarian</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={props.tags.includes('vegan')  ? 'disabled' :  ''} eventKey="vegan">Vegan</Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link className={props.tags.includes('gluten Free')  ? 'disabled' :  ''} eventKey="gluten Free">Gluten Free</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={props.tags.includes('Dairy Free')  ? 'disabled' :  ''} eventKey="Dairy Free" >
            Dairy Free
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={props.tags.includes('very helthy')  ? 'disabled' :  ''} eventKey="very helthy" >
            Very Healthy
          </Nav.Link>
        </Nav.Item>

   </Nav>
  )
}

export default TagsSelection;
