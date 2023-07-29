import { Typography, Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { baseUrl } from 'src/constants/constants';
import { AddSocialMediaComponent } from './AddSocialMediaComponents';
import { SoclaiMediaList } from './SocialMediaList';

const SocialMediaIndex = () => {
  const [socialmedialist, setSocialMediaList] = useState([]);

  const url = baseUrl + '/get_all_social_media_platforms';
  const getSocialMediaList = useCallback(() => {
    axios
      .get(url)
      .then((response) => {
        //console.log(response);
        setSocialMediaList(response.data.data.reverse());
        console.log(response.data.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, [url]);
  useEffect(() => {
    getSocialMediaList();
  }, [getSocialMediaList]);

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
          Social Media Platforms
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={5} md={5} xs={12}>
            <AddSocialMediaComponent
              onSubmitForm={() => getSocialMediaList()}
            />
          </Grid>
          <Grid item lg={7}>
            <SoclaiMediaList
              data={socialmedialist}
              onDeletePlatformItem={() => getSocialMediaList()}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SocialMediaIndex;
