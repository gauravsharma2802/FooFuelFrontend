import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement sign up logic
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoFocus
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </Box>
        <Typography align="center" variant="body2">
          Already have an account?{' '}
          <MuiLink component={Link} to="/login">
            Sign In
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUpPage; 