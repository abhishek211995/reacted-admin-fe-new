import { Typography, Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { AccountProfile } from './AccountProfile';
import { AccountProfileDetails } from './AccountProfileDetails';

const Account = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Account
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Account;
