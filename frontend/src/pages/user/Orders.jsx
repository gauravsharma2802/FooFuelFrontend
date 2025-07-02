import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';

const orders = [
  { id: '#ORD-001', date: '2024-06-01', status: 'Delivered', total: 499 },
  { id: '#ORD-002', date: '2024-06-02', status: 'In Transit', total: 299 },
  { id: '#ORD-003', date: '2024-06-03', status: 'Processing', total: 199 },
];

const Orders = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} key={order.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">{order.id}</Typography>
                    <Typography color="textSecondary">{order.date}</Typography>
                  </Box>
                  <Chip label={order.status} color={
                    order.status === 'Delivered' ? 'success' :
                    order.status === 'In Transit' ? 'warning' : 'info'
                  } />
                </Box>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>Total: ₹{order.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Orders; 