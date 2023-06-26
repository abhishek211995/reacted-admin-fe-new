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
  Grid
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

export const CelebrityList = (props) => {
  const [celebList, setcelebList] = useState([]);
  const [severity, setSeverity] = useState<any>('success');
  const [open, setOpen] = useState(false);
  const [msg, setMessage] = useState('');

  const [dialogOpen, setdialogOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dialogHandleClickOpen = () => {
    setdialogOpen(true);
  };

  const dialogHandleClickClose = () => {
    setdialogOpen(false);
  };

  const [isFeatured, setIsFeatured] = useState('1');

  // const { celebList } = props;
  const router = useNavigate();
  const http = new HttpRequest();
  console.log(celebList);
  const FetchList = async () => {
    const response = await http.axiosRequest('/get_celebrity', 'GET', true, {});
    if (response.data?.success) {
      setcelebList(response?.data?.data.reverse());
    } else {
      setOpen(true);
      setSeverity('error');
      setMessage(response.data.message);
    }
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
      FetchList();
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
      FetchList();
    } else {
      setOpen(true);
      setSeverity('error');
      setMessage(response.data.message);
    }
  };

  const handleIsFeaturedChange = (id) => {
    if (isFeatured) {
      setFeatured(id);
    } else {
      removeFeatured(id);
    }
    setIsFeatured('0');
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
              <TableRow key={index} hover>
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
                    {cat.title}
                  </Box>
                </TableCell>
                <TableCell>{cat.email}</TableCell>
                <TableCell>
                  <Stack direction="row">
                    <SocialLinks links={cat?.social_media_links} />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip label={cat?.status ?? 'N.A.'} color="success" />
                </TableCell>
                <TableCell>
                  <Switch
                    defaultChecked={cat?.is_featured == 'Yes' ? true : false}
                    onChange={() => {
                      handleIsFeaturedChange(cat?.user_id);
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
                        router(`/celebrity/update/${cat?.user_id}`);
                      }}
                    >
                      <IconButton
                        aria-label="ViewDetails"
                        color="primary"
                        size="small"
                      >
                        <VisibilityIcon color="primary" />
                      </IconButton>
                    </div>
                    {/* </Link> */}

                    <IconButton
                      aria-label="Delete"
                      color="error"
                      size="small"
                      onClick={() => {
                        handleCelebDelete(cat?.user_id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell>{cat.added_date}</TableCell>
              </TableRow>
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

      <Dialog open={dialogOpen} onClose={dialogHandleClickClose}>
        <DialogTitle>Add Celebrity As 24 Hours Special</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Start Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select End Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Off in Percentage (%)"
                name="first_name"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogHandleClickClose}>Cancel</Button>
          <Button onClick={dialogHandleClickClose}>
            Set Celebrity as 24 Hrs Special
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
