import { Box, Typography, Card, CardContent, Button, Avatar } from '@mui/material';

const Profile = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Card sx={{ maxWidth: 400, mt: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 56, height: 56 }}>G</Avatar>
            <Box>
              <Typography variant="h6">Gaurav Sharma</Typography>
              <Typography color="textSecondary">gs205436@gmail.com</Typography>
              <Typography color="textSecondary">+91 9000000000</Typography>
            </Box>
          </Box>
          <Button variant="outlined" sx={{ mt: 3 }}>Edit Profile</Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile; 