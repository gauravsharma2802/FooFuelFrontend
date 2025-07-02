import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Food Fuel!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Order your favorite food, track your orders, and enjoy exclusive deals.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h5">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Favorites
              </Typography>
              <Typography variant="h5">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more stats as needed */}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={2}>
          {/* Placeholder for featured products */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Pizza Margherita</Typography>
                <Typography color="textSecondary">Classic delight with cheese & tomato</Typography>
                <Button variant="contained" sx={{ mt: 2 }}>Order Now</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Paneer Tikka</Typography>
                <Typography color="textSecondary">Spicy grilled paneer cubes</Typography>
                <Button variant="contained" sx={{ mt: 2 }}>Order Now</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home; 