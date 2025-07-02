import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Container, Stack, TextField, InputAdornment, Grid, Card, CardContent, Avatar, MenuItem, Select, FormControl, Link as MuiLink
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FastfoodIcon from '@mui/icons-material/Fastfood';

// Updated, reliable Unsplash images
const heroFoodImg = 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80';
const businessImg = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80'; // New: people eating at a table
const restaurantImg = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';
const deliveryImg = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'; // New: delivery person on bike

const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Austin', 'Jacksonville', 'San Francisco', 'Columbus', 'Fort Worth',
  'Indianapolis', 'Charlotte', 'Seattle', 'Denver', 'Washington',
];

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
];

const LandingPage = () => {
  const [address, setAddress] = useState('');
  const [deliverTime, setDeliverTime] = useState('now');
  const location = useLocation();

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', fontFamily: 'Poppins, Montserrat, sans-serif' }}>
      {/* Background Image */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          background: `url('/food.jpg') center/cover no-repeat, #f5f5f5`,
          filter: 'blur(6px) brightness(0.85)',
          opacity: 1,
        }}
      />
      {/* Overlay for readability */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(255,255,255,0.3)', zIndex: 1 }} />

      {/* Navigation Bar with gradient */}
      <AppBar position="fixed" elevation={4} sx={{
        background: 'linear-gradient(90deg, #1976d2 0%, #ff9800 100%)',
        borderBottom: '1px solid #eee',
        zIndex: 10,
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
      }}>
        <Toolbar sx={{ minHeight: 72 }}>
          {/* Logo + Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <FastfoodIcon sx={{ color: 'white', fontSize: 36, mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 1, color: 'white', fontFamily: 'inherit' }}>
              Food Fuel
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} sx={{ mr: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={Link}
                to={link.to}
                variant="text"
                sx={{
                  fontWeight: 700,
                  color: location.pathname === link.to ? '#fff' : 'rgba(255,255,255,0.85)',
                  borderBottom: location.pathname === link.to ? '2px solid #fff' : '2px solid transparent',
                  borderRadius: 0,
                  fontSize: 17,
                  px: 2,
                  transition: 'all 0.2s',
                  '&:hover': { color: '#fff', bgcolor: 'transparent', borderBottom: '2px solid #fff' },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/login" variant="outlined" sx={{ borderRadius: 8, fontWeight: 700, color: '#fff', borderColor: '#fff', bgcolor: 'transparent', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: '#fff', color: '#fff' } }}>
              Log in
            </Button>
            <Button component={Link} to="/signup" variant="contained" sx={{ borderRadius: 8, fontWeight: 700, bgcolor: '#fff', color: '#1976d2', '&:hover': { bgcolor: '#ffe0b2', color: '#ff9800' } }}>
              Sign up
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content (zIndex: 2) */}
      <Box sx={{ position: 'relative', zIndex: 2, pt: { xs: 10, md: 12 } }}>
        {/* Hero Section */}
        <Box sx={{ width: '100%', minHeight: { xs: 500, md: 520 }, bgcolor: 'transparent', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'stretch', justifyContent: 'center', px: { xs: 2, md: 0 }, pt: 4 }}>
          {/* Left: Headline and Search */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', pl: { md: 10 }, pr: { md: 2 }, py: { xs: 2, md: 0 } }}>
            <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: 32, md: 48 }, mb: 4, color: 'black', letterSpacing: -1 }}>
              Order delivery near you
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center', mb: 1 }}>
              <TextField
                fullWidth
                placeholder="Enter delivery address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2, bgcolor: '#fafafa', fontWeight: 500 },
                }}
                sx={{ input: { color: 'black', fontWeight: 500 }, minWidth: 220, boxShadow: 1 }}
              />
              <FormControl sx={{ minWidth: 120, bgcolor: '#fafafa', borderRadius: 2 }}>
                <Select
                  value={deliverTime}
                  onChange={e => setDeliverTime(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Deliver time' }}
                  sx={{ borderRadius: 2, fontWeight: 500 }}
                >
                  <MenuItem value="now">Deliver now</MenuItem>
                  <MenuItem value="later">Schedule for later</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" color="inherit" sx={{ bgcolor: 'black', color: 'white', borderRadius: 2, px: 4, fontWeight: 700, height: 56, boxShadow: 2 }}>
                Search here
              </Button>
            </Box>
            <MuiLink component={Link} to="/login" underline="hover" sx={{ mt: 1, color: 'black', fontWeight: 500, fontSize: 16 }}>
              Or Sign In
            </MuiLink>
          </Box>
          {/* Right: Food Image */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 320 }}>
            <Box
              component="img"
              src={heroFoodImg}
              alt="Burger and fries"
              sx={{ width: { xs: '100%', md: 440 }, maxWidth: 500, borderRadius: 6, boxShadow: 6, objectFit: 'cover', objectPosition: 'center', background: '#f5f5f5', border: '4px solid #fff', minHeight: 220 }}
            />
          </Box>
        </Box>

        {/* Business/Restaurant/Delivery Cards */}
        <Container maxWidth="lg" sx={{ mt: 8, mb: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 4, boxShadow: 2, p: 0, overflow: 'hidden', height: '100%', bgcolor: '#fff' }}>
                <Box component="img" src={businessImg} alt="Feed your employees" sx={{ width: '100%', height: 180, objectFit: 'cover', bgcolor: '#f5f5f5' }} />
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: 'black' }}>Feed your employees</Typography>
                  <MuiLink href="#" underline="hover" sx={{ fontWeight: 500, color: 'primary.main' }}>Create a business account</MuiLink>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 4, boxShadow: 2, p: 0, overflow: 'hidden', height: '100%', bgcolor: '#fff' }}>
                <Box component="img" src={restaurantImg} alt="Your restaurant, delivered" sx={{ width: '100%', height: 180, objectFit: 'cover', bgcolor: '#f5f5f5' }} />
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: 'black' }}>Your restaurant, delivered</Typography>
                  <MuiLink href="#" underline="hover" sx={{ fontWeight: 500, color: 'primary.main' }}>Add your restaurant</MuiLink>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 4, boxShadow: 2, p: 0, overflow: 'hidden', height: '100%', bgcolor: '#fff' }}>
                <Box component="img" src={deliveryImg} alt="Deliver with Food Fuel" sx={{ width: '100%', height: 180, objectFit: 'cover', bgcolor: '#f5f5f5' }} />
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: 'black' }}>Deliver with Food Fuel</Typography>
                  <MuiLink href="#" underline="hover" sx={{ fontWeight: 500, color: 'primary.main' }}>Sign up to deliver</MuiLink>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Cities Near Me Section */}
        <Container maxWidth="lg" sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3, color: 'black' }}>Cities near me</Typography>
          <Box sx={{ width: '100%', height: 320, bgcolor: '#f5f5f5', borderRadius: 4, mb: 3, overflow: 'hidden', boxShadow: 2 }}>
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              style={{ border: 0, width: '100%', height: '100%' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12623316.393835353!2d-96.796988!3d37.09024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
            ></iframe>
          </Box>
          <Grid container spacing={2}>
            {cities.map((city) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={city}>
                <Typography sx={{ color: 'black', fontWeight: 500, fontSize: 16 }}>{city}</Typography>
              </Grid>
            ))}
          </Grid>
          <MuiLink href="#" underline="hover" sx={{ display: 'block', mt: 2, fontWeight: 600, color: 'primary.main', textAlign: 'right' }}>
            View all 500+ cities
          </MuiLink>
        </Container>
      </Box>

      {/* Footer Bar */}
      <Box sx={{ bgcolor: '#a97c2f', color: 'white', py: 2, textAlign: 'center', fontWeight: 600, fontSize: 18, letterSpacing: 1, zIndex: 2, position: 'relative' }}>
        $0 Delivery Fee with Food Fuel Premium
      </Box>
    </Box>
  );
};

export default LandingPage; 