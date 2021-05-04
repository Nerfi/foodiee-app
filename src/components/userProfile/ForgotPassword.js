import React, {  useState, useContext } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { UserContext} from '../../AuthContext/AuthContext';
import { Link } from "react-router-dom"

 const ForgotPassword = () => {

  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [email, setNewEmail] = useState('');
  const {resetPassword, user} = useContext(UserContext);




  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      await resetPassword(email)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }
  }

  return (
    <div style={{paddingTop: '55px'}}>
      <Card style={{ alignItems: 'center'}}>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setNewEmail(e.target.value)} required />
            </Form.Group>
            <Button disabled={!email} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  )
}

export default ForgotPassword;
