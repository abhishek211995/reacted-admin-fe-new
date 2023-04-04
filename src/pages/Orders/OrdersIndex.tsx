import { Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { Budget } from '../Components/Badges/Badge';

import LatestOrders from './OrdersList';
import RecentOrders from './RecentOrders';

const OrdersIndex = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            {/* <LatestOrders /> */}
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrdersIndex;
