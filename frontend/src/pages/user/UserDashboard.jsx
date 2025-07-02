import { useState } from 'react';
import { useNavigate, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Fastfood as ProductsIcon,
  ShoppingBag as OrdersIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import Home from './Home';
import Products from './Products';
import Orders from './Orders';
import Profile from './Profile';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/user/dashboard/home' },
  { text: 'Products', icon: <ProductsIcon />, path: '/user/dashboard/products' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/user/dashboard/orders' },
  { text: 'Profile', icon: <PersonIcon />, path: '/user/dashboard/profile' },
];

const UserDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Get user info from localStorage (placeholder fallback)
  let user = { uname: 'User', uemail: 'user@example.com' };
  try {
    const userData = localStorage.getItem('userData');
    if (userData) user = JSON.parse(userData);
  } catch { /* ignore error, fallback to default user */ }

  const drawer = (
    <Box sx={{ width: 260, height: '100%', bgcolor: 'primary.main', color: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Logo/Brand */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'primary.dark', borderBottom: '1px solid #ffffff22' }}>
        <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, fontSize: 28 }}>🍔</Avatar>
        <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 1 }}>
          Food Fuel
        </Typography>
      </Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
          {user.uname ? user.uname[0] : 'U'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'white' }}>
            {user.uname || 'User'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
            {user.uemail || 'user@example.com'}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ bgcolor: 'white', opacity: 0.2, my: 1 }} />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => setDrawerOpen(false)}
            sx={{
              my: 0.5,
              borderRadius: 2,
              bgcolor: location.pathname === item.path ? 'secondary.main' : 'inherit',
              color: location.pathname === item.path ? 'primary.main' : 'white',
              '&:hover': {
                bgcolor: location.pathname === item.path ? 'secondary.main' : 'primary.light',
                color: 'primary.main',
              },
              transition: 'all 0.2s',
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'white' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: 'white', opacity: 0.2, my: 1 }} />
      <List>
        <ListItem button onClick={handleLogout} sx={{ borderRadius: 2, color: 'white', '&:hover': { bgcolor: 'error.main', color: 'white' } }}>
          <ListItemIcon sx={{ color: 'white' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.main' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, letterSpacing: 1 }}>
            Food Fuel - User Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Permanent drawer for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260, bgcolor: 'primary.main', color: 'white' },
        }}
        open
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 3 },
          width: { sm: `calc(100% - 260px)` },
          mt: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', bgcolor: 'white', borderRadius: 3, boxShadow: 3, p: { xs: 2, sm: 4 }, minHeight: '80vh' }}>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="home" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard; 