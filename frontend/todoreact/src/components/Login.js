// src/components/Login.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Card, CardContent, CardActions, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import the Axios instance
import TaskList from './TaskList'; // Import the TaskList component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true); // Set logged-in state to true
      navigate('/tasks'); // Redirect to the tasks page
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ padding: 20 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: 20 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: 20 }}
            />
            <CardActions>
              <Button type="submit" fullWidth variant="contained">
                Login
              </Button>
            </CardActions>
          </form>
          <Typography variant="body2" align="center" style={{ marginTop: 10 }}>
            Don't have an account? <Link href="/signup" variant="body2">Sign Up</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
