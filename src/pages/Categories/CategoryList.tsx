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

export const CategoryList = (props) => {
    const { onDeletePlatformItem } = props;

    const [severity, setSeverity] = useState<any>("success");
    const [open, setOpen] = useState(false);
    const [msg, setMessage] = useState("");

    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data;",
        },
    };


    function deletePlatform(id) {
        let data = { category_id: id };
        const url = baseUrl + "/delete_category";

        axios
            .post(url, data, axiosConfig)
            .then((response) => {
                if (response.data.success === 0) {
                    setSeverity("warning");
                }
                setMessage(response.data.message);
                setOpen(true);
                onDeletePlatformItem();
            })
            .catch((error) => {
                console.log(error, "Category Error");
            });
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
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                onClose={() => setOpen(false)}
            >
                <Alert sx={{ width: "100%", color: "#fff" }} variant="filled" severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
};
