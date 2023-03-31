import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
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
    Alert,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { baseUrl } from 'src/constants/constants';

export const SoclaiMediaList = (props) => {
    const catList = props.data;
    const [open, setOpen] = useState(false);
    const [msg, setMessage] = useState("");

    const { onDeletePlatformItem } = props;

    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data;",
        },
    };

    function deletePlatform(id) {
        let data = { platform_id: id };
        const url = baseUrl + "/delete_social_media_platform";
        axios
            .post(url, data, axiosConfig)
            .then((response) => {
                setMessage(response.data.message);
                setOpen(true);
                onDeletePlatformItem();
            })
            .catch((error) => {
                console.log(error?.message, "Cat Error");
            });
    }

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                onClose={() => setOpen(false)}
            >
                <Alert sx={{ width: "100%", color: "#fff" }} variant="filled" severity="success">
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
                                                    alignItems: "center",
                                                    display: "flex",
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
