import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { FormikProvider, useFormik } from 'formik';
import { AddUserSchema } from 'src/utils/validators';

export const AddUserForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: ''
    },
    validationSchema: AddUserSchema,
    onSubmit: (data) => {
      handleSubmit(data);
    },
    enableReinitialize: true,
    validateOnChange: true
  });
  const handleSubmit = (data: any) => {};
  return (
    <FormikProvider value={formik}>
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader subheader="" title="Add User" />
          <Divider />
          <CardContent>
            <Typography sx={{ mb: 3 }} variant="h6">
              Basic Info
            </Typography>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Full name"
                  name="name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.name)}
                  helperText={formik.errors.name}
                  required
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.email)}
                  helperText={formik.errors.email}
                  required
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  variant="outlined"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.role)}
                  helperText={formik.errors.role}
                  required
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
            <Button
              color="primary"
              variant="contained"
              type="submit"
              // disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </Box>
        </Card>
      </form>
    </FormikProvider>
  );
};
