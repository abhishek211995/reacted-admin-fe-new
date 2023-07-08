import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Snackbar,
  Alert,
  Switch,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Grid,
  Typography
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { HttpRequest } from 'src/services/axios.service';
import { deleteCelebrity } from 'src/constants/constants';
import { setIsFeaturedUrl } from 'src/constants/constants';
import { SocialLinks } from 'src/components/SocialTile';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Formik } from 'formik';
import { format } from 'date-fns';
import { SpecialCelebSchema } from '../../../utils/validators';

export const CelebrityList = (props) => {
  const [celebList, setcelebList] = useState([]);

  // const { celebList } = props;
  const http = new HttpRequest();
  const FetchList = async () => {
    const response = await http.axiosRequest('/get_celebrity', 'GET', true, {});
    if (response.data?.success) {
      setcelebList(response?.data?.data.reverse());
    }
  };

  useEffect(() => {
    FetchList();
  }, []);
  return (
    <Card>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Social Media Links</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Is Featured</TableCell>
              <TableCell>Set as 24hrs Specials</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Registration Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {celebList.map((cat, index) => (
              <CelebTile
                fetchList={() => FetchList()}
                celeb={cat}
                key={index}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
      {/*<TablePagination
      component="div"
      count={customers.length}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleLimitChange}
      page={page}
      rowsPerPage={limit}
      rowsPerPageOptions={[5, 10, 25]}
                />*/}
    </Card>
  );
};

const CelebTile = (props: { celeb: any; fetchList: () => void }) => {
  const { celeb, fetchList } = props;
  const [severity, setSeverity] = useState<any>('success');
  const [open, setOpen] = useState(false);
  const [msg, setMessage] = useState('');
  const http = new HttpRequest();
  const [dialogOpen, setdialogOpen] = useState(false);
  const router = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [isFeatured, setIsFeatured] = useState(false);
  useEffect(() => {
    setIsFeatured(celeb.is_featured === 'Yes');
  }, [celeb]);
  const dialogHandleClickOpen = () => {
    setdialogOpen(true);
  };

  const dialogHandleClickClose = () => {
    setdialogOpen(false);
  };

  const handleCelebDelete = async (id) => {
    const formData = new FormData();
    formData.append('celebrity_id', id);
    const response = await http.axiosRequest(
      deleteCelebrity,
      'POST',
      true,
      {},
      formData,
      {
        'Content-Type': 'multipart/formdata'
      }
    );
    if (response?.data?.success) {
      setOpen(true);
      setSeverity('success');
      setMessage(response.data.message);
      fetchList();
    } else {
      setOpen(true);
      setSeverity('error');
      setMessage(response.data.message);
    }
  };
  const setFeatured = async (id) => {
    const form_data = new FormData();
    form_data.append('celebrity_id', id);
    form_data.append('featured_status', '1');
    const response = await http.axiosRequest(
      setIsFeaturedUrl,
      'POST',
      true,
      {},
      form_data,
      {
        'Content-Type': 'multipart/formdata'
      }
    );
    if (response?.data?.success) {
      setOpen(true);
      setSeverity('success');
      setMessage(response.data.message);
      setIsFeatured(true);
      //FetchList();
    } else {
      setOpen(true);
      setSeverity('error');
      setMessage(response.data.message);
    }
  };

  const removeFeatured = async (id) => {
    const form_data = new FormData();
    form_data.append('celebrity_id', id);
    form_data.append('featured_status', '0');
    const response = await http.axiosRequest(
      setIsFeaturedUrl,
      'POST',
      true,
      {},
      form_data,
      {
        'Content-Type': 'multipart/formdata'
      }
    );
    if (response?.data?.success) {
      setOpen(true);
      setSeverity('success');
      setMessage(response.data.message);
      setIsFeatured(false);
    } else {
      setOpen(true);
      setSeverity('error');
      setMessage(response.data.message);
    }
  };

  const handleIsFeaturedChange = (id) => {
    if (!isFeatured) {
      setFeatured(id);
    } else {
      removeFeatured(id);
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        // onClose={() => setOpen(false)}
      >
        <Alert
          sx={{ width: '100%', color: '#fff' }}
          variant="filled"
          severity={severity}
        >
          {msg}
        </Alert>
      </Snackbar>
      <TableRow hover>
        <TableCell padding="checkbox">
          <Checkbox />
        </TableCell>
        <TableCell>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Avatar sx={{ mr: 2 }}>AB</Avatar>
            {celeb.title}
          </Box>
        </TableCell>
        <TableCell>{celeb.email}</TableCell>
        <TableCell>
          <Stack direction="row">
            <SocialLinks links={celeb?.social_media_links} />
          </Stack>
        </TableCell>
        <TableCell>
          <Chip label={celeb?.status ?? 'N.A.'} color="success" />
        </TableCell>
        <TableCell>
          <Switch
            // defaultChecked={isFeatured}
            checked={isFeatured}
            onChange={() => {
              handleIsFeaturedChange(celeb?.user_id);
            }}
          />
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            size="small"
            onClick={dialogHandleClickOpen}
          >
            24hrs Special
          </Button>
        </TableCell>
        <TableCell>
          <Stack direction="row">
            {/* <Link
            href={{
              pathname: "/update/[role]/[userid]",
              query: { role: 'celebrity', userid: cat?.user_id },
            }}
          > */}
            <div
              onClick={() => {
                router(`/celebrity/update/${celeb?.user_id}`);
              }}
            >
              <IconButton aria-label="ViewDetails" color="primary" size="small">
                <VisibilityIcon color="primary" />
              </IconButton>
            </div>

            <IconButton
              aria-label="Delete"
              color="error"
              size="small"
              onClick={() => {
                handleCelebDelete(celeb?.user_id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </TableCell>
        <TableCell>{celeb.added_date}</TableCell>
      </TableRow>

      <Dialog open={dialogOpen} onClose={dialogHandleClickClose}>
        <Formik
          initialValues={{ start_date: null, end_date: null, percent_off: 0 }}
          onSubmit={async (data: {
            start_date: Date;
            end_date: Date;
            percent_off: number;
          }) => {
            console.log('form submit', data);
            const formData = new FormData();
            formData.append(
              'start_date',
              format(data.start_date, 'dd-MM-yyyy')
            );
            formData.append('end_date', format(data.end_date, 'dd-MM-yyyy'));
            formData.append('percent_off', data.percent_off.toString());
            formData.append('celebrity_id', celeb?.user_id);
            const response = await http.axiosRequest(
              'add_celebrity_as_special',
              'POST',
              true,
              {},
              formData,
              {
                'Content-Type': 'multipart/formdata'
              }
            );
            if (response.data.success === 1) {
              setOpen(true);
              setSeverity('success');
              setMessage(response.data.message);
            } else {
              setOpen(true);
              setSeverity('error');
              setMessage(response.data.message);
            }
            dialogHandleClickClose();
          }}
          validationSchema={SpecialCelebSchema}
          validateOnMount={false}
          component={(formikProps) => (
            <>
              <DialogTitle>Add Celebrity As 24 Hours Special</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Select Start Date"
                        minDate={new Date()}
                        value={formikProps.values.start_date}
                        onChange={(value) =>
                          formikProps.setFieldValue('start_date', value)
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <Typography color={'red'} fontSize={12}>
                        {formikProps.errors?.start_date}
                      </Typography>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        minDate={formikProps.values.start_date ?? new Date()}
                        label="Select End Date"
                        value={formikProps.values.end_date}
                        onChange={(value) =>
                          formikProps.setFieldValue('end_date', value)
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <Typography color={'red'} fontSize={12}>
                        {formikProps.errors?.end_date}
                      </Typography>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Off in Percentage (%)"
                      name="percent_off"
                      variant="outlined"
                      type="number"
                      required
                      onChange={formikProps.handleChange('percent_off')}
                    />
                    <Typography color={'red'} fontSize={12}>
                      {formikProps.errors?.percent_off}
                    </Typography>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={dialogHandleClickClose}>Cancel</Button>
                <Button
                  type="submit"
                  onClick={() => formikProps.handleSubmit()}
                >
                  Set Celebrity as 24 Hrs Special
                </Button>
              </DialogActions>
            </>
          )}
        />
      </Dialog>
    </>
  );
};
