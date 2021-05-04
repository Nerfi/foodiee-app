import React, {useState, useContext, useRef} from 'react';
import {firebase, storage} from '../firebase/firebase';
import './Signup.css';
import { useHistory, Link } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap"
import {UserContext} from '../AuthContext/AuthContext';


function Signup () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name,setName] = useState('');
  const [error, setError] = useState(null);
  const {signUp} = useContext(UserContext);
  const history = useHistory();

  //testing state
  const [selcectedPhoto, setSelectedPhoto] = useState(null);
  //ref
  let imgRef = useRef();

    const handleSubmit = async (e) => {

      e.preventDefault();

      if (!name || !selcectedPhoto) {
        return;
      }

      //checking that the two passwrods are the same
      if(password !== repeatPassword) {
        return setError('Passwords do not match')
      }

      try {

        await signUp(email, password).then( res => {
          if(res) {

              res.user.updateProfile({
                displayName: name,
                photoURL: selcectedPhoto
              })

            history.push('/');
          }

        //creatin user document
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
          email: email,
          name: name
        });


     })

      }catch(e) {
        setError(e.message);
      }

    };


    const onFileChange = async (e) => {

    imgRef = e.target.files[0];
    const uploadTask  = storage.ref().child('images/' +  imgRef.name).put(imgRef);
    await uploadTask
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
    setSelectedPhoto(url);
  });
}


  return(

<div className="signupContainer" style={{marginTop: '100px'}}>
      <Card className="cardComponent">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>

            <Form.Group id="img">
              <Form.Label>Select profile picture</Form.Label>
              <Form.Control
                type="file"
                onChange={onFileChange}
                required
              />

            </Form.Group>

          <Form.Group id="name">

              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} required onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
            </Form.Group>
            <Button disabled={!email && !password} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  )
}

export default Signup;

