import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import './spinner.css';

const spinner = ( ) => (

  <div className="loader">
    <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default spinner;

