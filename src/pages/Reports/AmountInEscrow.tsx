import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid } from '@mui/material';
import { Box, Container } from '@mui/system';

const AmountInEscrow = (props) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Card>
          <CardHeader title="Amount In Escrow" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Total Amount" />
                  <CardContent>
                    <Typography variant="body1">$20,000 Sales</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Paid" />
                  <CardContent>
                    <Typography variant="body1">$8,000</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Amount In Escrow" />
                  <CardContent>
                    <Typography variant="body1">$12,000 in Sales</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AmountInEscrow;
