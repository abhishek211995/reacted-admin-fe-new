import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { baseUrl } from 'src/constants/constants';
import Logo from 'src/components/LogoSign';
import useAuth from 'src/contexts/AuthContext';

const Login = () => {
  const router = useNavigate();
  const theme: any = useTheme();
  const [severity, setSeverity] = useState<any>('success');
  const [open, setOpen] = useState(false);
  const [msg, setMessage] = useState('');
  const { signIn, signOut, loading } = useAuth();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
  });

  useEffect(() => {
    const access_key = localStorage.getItem('access_key');
    const role_id = localStorage.getItem('role_id');
    if (access_key && role_id) {
      router('/');
    } else router('/login');
  }, []);

  const handleSubmit = async (data) => {
    try {
      const { email, password } = data;
      const response = await axios.post(`${baseUrl}/login`, data, {
        params: {
          email,
          password
        }
      });
      console.log('RESPONSE', response?.data?.data);
      if (
        response.status === 200 &&
        response.data.success &&
        response?.data?.data?.[0]?.role_id1 === '1'
      ) {
        console.log('Logging in');
        const userData = {
          name: response.data?.data[0].first_name,
          email: response.data.data[0].email,
          userId: response.data.data[0].user_id,
          access_token: response.data.data[0].access_token,
          role_id: response.data.data[0].role_id,
          role_id1: response.data.data[0].role_id1,
          phone: response.data.data[0].phone
        };
        setSeverity('success');
        setMessage(response.data.message);
        setOpen(true);
        signIn(userData);
        router('/');
      } else {
        console.log('Login Failed - Your are not allowed to Login');
        setOpen(true);
        setSeverity('error');
        setMessage('Your are not allowed to Login');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      handleSubmit(data);
    }
  });
  // const loginUser = (data) => {
  //   axios.post(`${loginUrl}?email=${data.email}&password=${data.password}`)
  //     .then(res => {
  //       if (res.data.success) {
  //         // console.log('DATA', res.data)
  //         console.log('push')
  //         const token = res.data.data[0].access_token;
  //         const user = res.data.data[0]
  //         localStorage.setItem('reacted-admin-token', token)
  //         signIn(user, token)
  //         setSeverity('success')
  //         setMessage(res.data.message)
  //         setOpen(true)
  //         replace("/")
  //       } else {
  //         setOpen(true)
  //         setSeverity('error')
  //         setMessage(res.data.message)
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err.message)
  //     })
  // }
  return (
    <>
      {loading && <div>Loading...</div>}
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background?.light,
            py: 5,
            px: 3,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Logo />
          {/* <NextLink href="/" passHref>
                        <Button
                            sx={{ ml: 2, alignSelf: "flex-start" }}
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Dashboard
                        </Button>
                    </NextLink> */}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 1 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
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
    </>
  );
};

export default Login;
