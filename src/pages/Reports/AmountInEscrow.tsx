import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import DateRangePickerComponent from 'src/components/DateRangePicker';
import axios from 'axios';
import { baseUrl } from 'src/constants/constants';
import moment from 'moment';

let formData = new FormData();
formData.append('from_date', '2022-07-01');
formData.append('to_date', '2023-07-24');
const AmountInEscrow = (props: any) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .post(baseUrl + '/status_wise_amount_in_escrow', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${localStorage
            .getItem('access_key')
            ?.replaceAll('"', '')}`
        }
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error?.message, 'status_wise_amount_in_escrow api error');
      });
  };
  const dateSelected = (val: any) => {
    if (val) {
      formData.set('from_date', moment(val[0]).format('YYYY-MM-DD'));
      formData.set('to_date', moment(val[1]).format('YYYY-MM-DD'));
      getData();
    } else {
      formData.set('from_date', moment().format('YYYY-MM-DD'));
      formData.set('to_date', moment().format('YYYY-MM-DD'));
      getData();
    }
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <DateRangePickerComponent
          dateSelected={(val: any) => dateSelected(val)}
        />
        <Card>
          <CardHeader title="Amount In Escrow" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Total Amount" />
                  <CardContent>
                    <Typography variant="body1">
                      $
                      {data?.all_amout
                        ? data?.all_amout
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : 0}{' '}
                      Sales
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Paid" />
                  <CardContent>
                    <Typography variant="body1">
                      $
                      {data?.paid_amout
                        ? data?.paid_amout
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={4}>
                <Card>
                  <CardHeader title="Amount In Escrow" />
                  <CardContent>
                    <Typography variant="body1">
                      $
                      {data?.amout_in_escrow
                        ? data?.amout_in_escrow
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : 0}{' '}
                      in Sales
                    </Typography>
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
