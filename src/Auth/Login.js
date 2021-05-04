import React,{useState, useContext} from 'react';
import { firebase} from '../firebase/firebase';
import './Login.css';
import {useHistory, Link} from 'react-router-dom';
import { UserContext} from '../AuthContext/AuthContext';
import { Form, Button, Card, Alert } from "react-bootstrap"


function Login () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, user} = useContext(UserContext);
  const [error, setError] = useState("")
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      await login(email, password)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

  }

  return (
    <div  style={{marginTop: '55px'}}>
      <Card className="cardComponent">
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button disabled={!email || !password} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  )
}

export default Login;

