// src/components/Signup.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Card, CardContent, CardActions, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import the Axios instance

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/signup', { username, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ padding: 20 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ marginBottom: 20 }}
            />
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
                Sign Up
              </Button>
            </CardActions>
          </form>
          <Typography variant="body2" align="center" style={{ marginTop: 10 }}>
            Already have an account? <Link href="/login" variant="body2">Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
