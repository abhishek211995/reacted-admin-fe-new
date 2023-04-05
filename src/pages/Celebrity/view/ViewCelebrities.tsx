import { Typography, Grid, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { CelebrityList } from './CelebrityList';
import { useNavigate } from 'react-router';

const ViewCelebrities = () => {
  const nav = useNavigate();
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px'
          }}
        >
          <Typography sx={{ mb: 3 }} variant="h4">
            Celebrities
          </Typography>
          <Button
            variant="contained"
            component="label"
            onClick={() => nav('/celebrity/create')}
          >
            Add Celebrity
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <CelebrityList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewCelebrities;
