import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const products = [
  { id: 1, name: 'Pizza Margherita', desc: 'Classic delight with cheese & tomato', price: 299 },
  { id: 2, name: 'Paneer Tikka', desc: 'Spicy grilled paneer cubes', price: 199 },
  { id: 3, name: 'Veg Burger', desc: 'Loaded with fresh veggies', price: 149 },
];

const Products = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="textSecondary">{item.desc}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>₹{item.price}</Typography>
                <Button variant="contained" sx={{ mt: 2 }}>Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products; 