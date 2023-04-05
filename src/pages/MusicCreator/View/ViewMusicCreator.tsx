import { Box, Container, Typography, Grid, Button } from '@mui/material';
import React from 'react';
import { MusicCreatorList } from '../MusicCreatorsList';
import { useNavigate } from 'react-router';

const ViewMusicCreator = () => {
  const nav = useNavigate();
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg" sx={{ padding: '12px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px'
          }}
        >
          <Typography sx={{ mb: 3 }} variant="h4">
            Music Creator
          </Typography>
          <Button
            variant="contained"
            component="label"
            onClick={() => nav('/Add-Music-Creator')}
          >
            Add Creator
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <MusicCreatorList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewMusicCreator;
