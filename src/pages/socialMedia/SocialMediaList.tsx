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
  TablePagination,
  TableRow,
  Typography,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { baseUrl } from 'src/constants/constants';
import { HttpRequest } from 'src/services/axios.service';

export const SoclaiMediaList = (props) => {
  const catList = props.data;
  const [open, setOpen] = useState(false);
  const [msg, setMessage] = useState('');
  const http = new HttpRequest();
  const { onDeletePlatformItem } = props;

  async function deletePlatform(id: string) {
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data;'
      }
    };
    const formData = new FormData();
    const url = '/delete_social_media_platform';
    formData.append('platform_id', id);
    const response = await http.axiosRequest(
      url,
      'POST',
      true,
      {},
      formData,
      axiosConfig.headers
    );
    if (response.data.success) {
      setMessage(response.data.message);
      setOpen(true);
      onDeletePlatformItem();
    } else {
      console.log('Err');
    }
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
      <Card>
        <PerfectScrollbar>
          <Box>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell>Category Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {catList.map((platform, index) => (
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
                        {platform.platform_name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={platform.status} color="success" />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row">
                        <IconButton
                          aria-label="Instagram"
                          color="error"
                          size="small"
                          onClick={() => deletePlatform(platform.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
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
    </>
  );
};
