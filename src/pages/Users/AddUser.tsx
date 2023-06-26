import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { AddUserForm } from './AddUserForm';

const AddUser = () => {
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
          Add User
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <AddUserForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddUser;
