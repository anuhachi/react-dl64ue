import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useIsAuthenticated } from 'react-auth-kit';
import { useHistory } from 'react-router-dom';

function Login() {
  const signIn = useSignIn();
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [errore, setErrore] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    setErrore(false);
    setLoading(true);
    e.preventDefault();
    axios
      .post('https://ordini-bioservicesrl.herokuapp.com/auth/local', formData)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.status === 200) {
          history.push('/');

          if (
            signIn({
              token: res.data.jwt,
              expiresIn: 60,
              tokenType: 'Bearer',
              authState: res.data.user,
            })
          ) {
            // Only if you are using refreshToken feature
            // Redirect or do-something
            history.push('/');
          } else {
            //Throw error
          }
        }
      })
      .catch((err) => {
        console.log('erroe', err);
        setLoading(false);
        setErrore(true);
      });
  };

  return (
    <div>
      <Card className="mx-auto mt-5" style={{ width: '18rem' }}>
        <Card.Body>
          {errore && (
            <Alert variant="danger">
              User o password errati,se l'errore persiste conattatre qui
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  setFormData({ ...formData, identifier: e.target.value })
                }
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Group>

            <Button
              variant="primary"
              className="mx-auto justify-content-center"
              type="submit"
              onClick={onSubmit}
              disabled={loading} 
            >
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
