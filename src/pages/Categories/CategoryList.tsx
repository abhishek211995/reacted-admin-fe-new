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

export const CategoryList = (props: any) => {
  const { onDeletePlatformItem } = props;
  const http = new HttpRequest();
  const [severity, setSeverity] = useState<any>('success');
  const [open, setOpen] = useState(false);
  const [msg, setMessage] = useState('');

  async function deletePlatform(id: string) {
    let data = { category_id: id };
    const formData = new FormData();
    formData.append('category_id', id);
    let headers = {
      'Content-Type': 'multipart/form-data;'
    };
    const response = await http.axiosRequest(
      '/delete_category',
      'POST',
      true,
      {},
      formData,
      headers
    );
    if (response.data.success === 0) {
      setSeverity('success');
      setMessage(response.data.message);
      setOpen(true);
      onDeletePlatformItem();
    } else {
      setSeverity('warning');
      setMessage(response.data.message);
      setOpen(true);
      onDeletePlatformItem();
    }
  }

  const categories = props.data;
  console.log(categories);
  return (
    <>
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
                  <TableCell>Slug</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={index} hover>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <img
                        src={
                          `http://s3-us-west-2.amazonaws.com/reacted/category/` +
                          category.category_name
                        }
                      />
                    </TableCell>
                    <TableCell>{category.category_name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      <Chip label="Active" color="success" />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row">
                        <IconButton
                          aria-label="Instagram"
                          color="error"
                          size="small"
                          onClick={() => deletePlatform(category.category_id)}
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
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
