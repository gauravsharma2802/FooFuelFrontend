import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Tabs, Tab, TextField, Button, Alert } from '@mui/material';
import { loginAdmin, loginUser } from '../../api/authApi';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [credentials, setCredentials] = useState({
    useremail: '',
    userPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeTab === 0) {
        // Admin login
        await loginAdmin(credentials);
        navigate('/admin/dashboard');
      } else {
        // User login
        await loginUser(credentials);
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Food Fuel Management System
        </Typography>
        
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
          <Tab label="Admin Login" />
          <Tab label="User Login" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label={activeTab === 0 ? "Admin Email" : "User Email"}
            name="userEmail"
            type="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="userPassword"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;