import React, {useState, useContext} from 'react';
import './UpdateUserData.css';
import { UserContext} from '../../AuthContext/AuthContext';
import  {storage, firebase} from '../../firebase/firebase';
import {useHistory, Link} from 'react-router-dom';
import { Form, Button, Card, Alert } from "react-bootstrap"


const UpdateUserData = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [repeatPassword, setRepeatPassword] = useState('');
const [error, setError] = useState(null);
const [name, setName] = useState('');
const history = useHistory();

const {
  updateEmail,
  user,
  updatePassword,
 updateUserName
} = useContext(UserContext);


//const new function in order to update the user data
//this is not an async function because we are resolving all the promises this component has in one place , Promise.all(promises); check docs for more info
const handleUserUpdate = (e) => {

  e.preventDefault();


  if(password !== repeatPassword) {

    setError('Password do not match');
    setPassword('');
    setRepeatPassword('');
  }

  //creating promises array in order to run all Promises at once
  const promises = [];


  if(email !== user.email) {
    promises.push(updateEmail(email))
  }

  if(password ) {
    promises.push(updatePassword(password))
  }
  if(name !== user.displayName ) {
    promises.push(updateUserName(name))
  }


  //resolving all the promises at once
  Promise.all(promises).then(() => {
    history.push("/dashboard");

  }).catch((error) => {
    setError('Failed to update profile' + ' ' + error.message)
    setName('')
    setPassword('');
    setRepeatPassword('');
  })

};


  return(
     <>
      <Card>
        <Card.Body>

          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleUserUpdate}>

             <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder={user?.displayName}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={user?.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep the same"

              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={!user} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>

  )
};


export default UpdateUserData;
