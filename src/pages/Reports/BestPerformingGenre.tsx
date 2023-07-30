import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { baseUrl } from 'src/constants/constants';
import moment from 'moment';

let formData = new FormData();
formData.append('from_date', '');
formData.append('to_date', '');
const BestPerformingGenere = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .post(baseUrl + '/highest_performing_category', formData, {
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
        console.log(error?.message, 'highest_performing_category api error');
      });
  };
  const dateSelected = (val: any) => {
    if (val) {
      formData.set('from_date', moment(val[0]).format('YYYY-MM-DD'));
      formData.set('to_date', moment(val[1]).format('YYYY-MM-DD'));
      getData();
    } else {
      formData.set('from_date', '');
      formData.set('to_date', '');
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
          <CardHeader title="Best Performing Genre" />
          <CardContent>
            <Grid container spacing={3}>
              {data &&
                data.map((value: any, index: any) => (
                  <Grid item md={4} xs={4} key={index}>
                    <Card>
                      <CardHeader
                        title={value.category_name}
                        action={
                          <IconButton aria-label="settings">
                            <MusicVideoIcon />
                          </IconButton>
                        }
                      />
                      <CardContent>
                        <Typography variant="body1">
                          $
                          {value.category_count.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ','
                          )}{' '}
                          Sales
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default BestPerformingGenere;
