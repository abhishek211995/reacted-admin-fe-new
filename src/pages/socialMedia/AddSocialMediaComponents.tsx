import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Divider,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  Snackbar,
  Alert
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { platform } from 'os';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { baseUrl } from 'src/constants/constants';

export const AddSocialMediaComponent = (props) => {
  const [open, setOpen] = useState(false);
  const [msg, setMessage] = useState('');

  const { onSubmitForm } = props;

  const router = useNavigate();

  const formik = useFormik({
    initialValues: {
      platform_name: '',
      link: ''
    },
    validationSchema: Yup.object().shape({
      platform_name: Yup.string().required('Title is required')
    }),
    onSubmit: (data) => {
      //Router.push("/").catch(console.error);
      handleSubmit(data);
      console.log(data);
    }
  });

  const url = baseUrl + '/add_social_media';

  const handleSubmit = (data) => {
    let formdata = new FormData();

    //Object.keys(data).forEach(k=>{
    formdata.append('platform_name', data.platform_name);
    formdata.append('link', data.link);
    //});
    console.log(formdata);

    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data;'
      }
    };

    axios
      .post(url, data, axiosConfig)
      .then((response) => {
        if (response.data.success == 1) {
          setOpen(true);
          setMessage(response.data.message);
          onSubmitForm();
          formik.resetForm();
        }
      })
      .catch((error) => {
        console.log(error, 'Cat Error');
      });
  };

  //console.log(formik);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        onClose={() => setOpen(false)}
      >
        <Alert
          sx={{ width: '100%', color: '#fff' }}
          variant="filled"
          severity="success"
        >
          {msg}
        </Alert>
      </Snackbar>
      <form autoComplete="off" onSubmit={formik.handleSubmit} noValidate>
        <Card>
          <CardHeader subheader="" title="Add Social Media Platform" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="platform_name"
                  required
                  variant="outlined"
                  value={formik.values.platform_name}
                  error={Boolean(formik.errors.platform_name)}
                  helperText={formik.errors.platform_name}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Link"
                  name="link"
                  required
                  variant="outlined"
                  value={formik.values.link}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button color="primary" variant="contained" type="submit">
              Add Social Media Platform
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};
