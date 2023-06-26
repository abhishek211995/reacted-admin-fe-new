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
import { useState } from 'react';
import { baseUrl } from 'src/constants/constants';
import { HttpRequest } from 'src/services/axios.service';

export const CategoryComponent = (props) => {
  const { onCategorySubmit } = props;
  const http = new HttpRequest();
  const [severity, setSeverity] = useState<any>('success');
  const [open, setOpen] = useState(false);
  const [msg, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      category_name: '',
      slug: '',
      image: ''
    },
    validationSchema: Yup.object().shape({
      category_name: Yup.string().required('Genre Title is required')
    }),
    onSubmit: (data) => {
      handleSubmit(data);
      console.log(data);
    }
  });

  const handleSubmit = async (data: any) => {
    let formdata = new FormData();

    //Object.keys(data).forEach(k=>{
    formdata.append('category_name', data.category_name);
    formdata.append('slug', data.slug);
    formdata.append('image', data.image);
    //});
    console.log(formdata);

    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data;'
      }
    };
    const response = await http.axiosRequest(
      '/add_category',
      'POST',
      true,
      {},
      formdata,
      axiosConfig.headers
    );

    if (response.status === 200) {
      if (response.data.success === 1) {
        setSeverity('success');
      } else if (response.data.success === 0) {
        setSeverity('warning');
      } else {
        setSeverity('error');
      }
      setOpen(true);
      onCategorySubmit();
      console.log('in success response', response);
      setMessage(response.data.message);
      formik.resetForm();
    } else {
      console.log('ERR', response.data?.message);
      setSeverity('error');
      setOpen(true);
      setMessage('Failed to create category, please try again later!!!');
    }
    // axios
    //   .post(baseUrl + '/add_category', data, axiosConfig)
    //   .then((response) => {
    //     onCategorySubmit();
    //     if (response.data.success === 1) {
    //       setSeverity('success');
    //     } else if (response.data.success === 0) {
    //       setSeverity('warning');
    //     } else {
    //       setSeverity('error');
    //     }
    //     setOpen(true);
    //     console.log('in success response', response);
    //     setMessage(response.data.message);
    //     formik.resetForm();
    //   })
    //   .catch((error) => {
    //     setSeverity('error');
    //     setOpen(true);
    //     setMessage('Failed to create category, please try again later!!!');
    //   });
  };

  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="" title="Add Genre" />
        <Divider />
        <CardContent>
          <Typography sx={{ mb: 3 }} variant="h6">
            Basic Info
          </Typography>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Genre Title"
                name="category_name"
                required
                variant="outlined"
                value={formik.values.category_name}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.category_name)}
                helperText={formik.errors.category_name}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Genre Slug"
                name="slug"
                required
                variant="outlined"
                value={formik.values.slug}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <Button variant="contained" component="label">
                Upload Genre Icon
                <input type="file" hidden name="catIcon" />
              </Button>
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
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Add Genre
          </Button>
        </Box>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={() => setOpen(false)}
      >
        <Alert
          sx={{ width: '100%', color: '#fff' }}
          variant="filled"
          severity={severity}
        >
          {msg}
        </Alert>
      </Snackbar>
    </form>
  );
};
