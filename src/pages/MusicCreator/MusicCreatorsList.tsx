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
  Alert
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import { EditOutlined } from '@mui/icons-material';
import { HttpRequest } from 'src/services/axios.service';
import { useNavigate } from 'react-router';
import { deleteCreator } from 'src/constants/constants';
import { SocialLinks } from 'src/components/SocialTile';

export const MusicCreatorList = () => {
  const [CreatorList, setCreatorList] = useState([]);
  const router = useNavigate();
  const http = new HttpRequest();
  const [severity, setSeverity] = useState<any>('success');
  const [open, setOpen] = useState(false);
  const [msg, setMessage] = useState('');

  const FetchCreatorList = async () => {
    const response = await http.axiosRequest('/get_music_creator', 'GET', true);
    if (response?.data?.success) {
      setCreatorList(response?.data?.data.reverse());
    } else {
      setOpen(true);
      setSeverity('error');
      setMessage(response.data?.message);
    }
  };
  const deleteMusicCreator = async (id) => {
    const formData = new FormData();
    formData.append('music_creator_id', id);
    const response = await http.axiosRequest(
      deleteCreator,
      'POST',
      true,
      {},
      formData,
      {
        'Content-Type': 'multipart/formdata'
      }
    );
    if (response.data?.success) {
      setOpen(true);
      setSeverity('success');
      setMessage(response.data.message);
      FetchCreatorList();
    } else {
      setOpen(true);
      setSeverity('error');
      setMessage(response.data.message);
    }
  };
  useEffect(() => {
    FetchCreatorList();
  }, []);
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Artist Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Social Media Links</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Registration Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CreatorList.map((creator, index) => (
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
                      {creator.first_name} {creator.last_name}
                    </Box>
                  </TableCell>
                  <TableCell>{creator?.artist_name ?? ''}</TableCell>
                  <TableCell>{creator.email} </TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <SocialLinks links={creator?.social_media_links} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label="Active" color="success" />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row">
                      {/* <Link
                        href={{
                          pathname: "/update/[role]/[userid]",
                          query: { role: 'music-creator', userid: creator?.user_id },
                        }}
                      > */}
                      <div
                        onClick={() => {
                          router(
                            `/create-music-creator/edit/${creator?.user_id}`
                          );
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
                        aria-label="deactivate"
                        color="error"
                        size="small"
                        onClick={() => {
                          deleteMusicCreator(creator?.user_id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          router(
                            `/create-music-creator/edit/${creator.user_id}`
                          )
                        }
                        aria-label="delete"
                        color="warning"
                        size="small"
                      >
                        <EditOutlined />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell>{creator.added_date} </TableCell>
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
    </Card>
  );
};
