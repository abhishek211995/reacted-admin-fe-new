import { useCallback, useEffect, useState } from "react";
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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { baseUrl } from 'src/constants/constants';

export const CustomerSupportList = (props: any) => {
    const [contactFormList, setcontactFormList] = useState([]);

    const getContactFormList = useCallback(() => {
        axios
            .get(baseUrl + "/get_contact_us")
            .then((response) => {
                //console.log(response);
                setcontactFormList(response.data.data.reverse());
            })
            .catch((response) => {
                console.log(response);
            });
    }, []);

    useEffect(() => {
        getContactFormList();
    }, [getContactFormList]);



    return (
        <Card>
            <PerfectScrollbar>
                <Box>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox color="primary" />
                                </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Added Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contactFormList.map((cf, index) => (
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
                                            {cf.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{cf.email}</TableCell>
                                    <TableCell>{cf.phone}</TableCell>
                                    <TableCell>{cf.message}</TableCell>
                                    <TableCell>
                                        <Chip label="Active" color="success" />
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row">
                                            <IconButton aria-label="Instagram" color="error" size="small">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>12-08-2022</TableCell>
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
    );
};
