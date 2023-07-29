import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import { Box, Container } from '@mui/system';
import DateRangePickerComponent from '../../components/DateRangePicker';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';

const BestPerformingGenere = (props) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <DateRangePickerComponent />
        <Card>
          <CardHeader title="Best Performing Genre" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader
                    title="HipHop"
                    action={
                      <IconButton aria-label="settings">
                        <MusicVideoIcon />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography variant="body1">$10,000 Sales</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Rock" />
                  <CardContent>
                    <Typography variant="body1">$5,000 in Sales</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Indie" />
                  <CardContent>
                    <Typography variant="body1">$2,000 in Sales</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Indie" />
                  <CardContent>
                    <Typography variant="body1">$2,000 in Sales</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Indie" />
                  <CardContent>
                    <Typography variant="body1">$2,000 in Sales</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Indie" />
                  <CardContent>
                    <Typography variant="body1">$2,000 in Sales</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Indie" />
                  <CardContent>
                    <Typography variant="body1">$2,000 in Sales</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Indie" />
                  <CardContent>
                    <Typography variant="body1">$2,000 in Sales</Typography>
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

export default BestPerformingGenere;
