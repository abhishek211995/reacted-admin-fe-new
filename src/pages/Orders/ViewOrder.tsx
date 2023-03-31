import { Box, Button, Card, CardHeader, Chip, Container, Divider, Grid, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack } from '@mui/system';
import { CalendarMonth } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'src/constants/constants';
import { useParams } from 'react-router';
import { HttpRequest } from 'src/services/axios.service';
import { Link } from 'react-router-dom';
import CustomizedMenus from 'src/components/DropDown/CustomizesMenus';
import { getAdminOrderDetails } from 'src/constants/Api';

const ViewOrder = () => {
    const [orderDetails, setOrderDetails] = useState<any>([]);
    const http = new HttpRequest()
    const {id}  = useParams();
    console.log('id', id)
    const fetchOrderDetails = async () => {
        const response = await http.axiosRequest(`${getAdminOrderDetails}?order_id=${id}`, 'GET', true,)
        setOrderDetails(response.data.data)
    }
    useEffect(() => {
        fetchOrderDetails()
    }, [id]);
    return (
        <>
            <Container maxWidth="lg">
                <Typography sx={{ mb: 3, display: "flex", alignItems: "center" }} component="p">
                    <Link to="/orders" >
                        <>
                            <ArrowBackIcon color="primary" sx={{ mr: 2 }} /> Back to Orders
                        </>
                    </Link>
                </Typography>
                <Typography sx={{ mb: 3 }} variant="h3" component="h1">
                    Order No {id}
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    sx={{ mb: 3 }}
                >
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                        Place on <CalendarMonth color="action" sx={{ ml: 1, mr: 1 }} /> {orderDetails?.billing_details?.order_date ?? '11/11/2023'}
                    </Typography>
                    <Stack spacing={2} direction="row" alignItems="center" flexWrap="wrap">
                        <CustomizedMenus />
                        <Button variant="contained" color={`${orderDetails?.billing_details?.order_status === 'Completed' ? 'success' : 'warning'}`}>
                            Order Status: {orderDetails?.billing_details?.order_status ?? 'N.A.'}
                        </Button>
                    </Stack>
                </Stack>
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
                        <Card>
                            <CardHeader subheader="" title="Order Details" />
                            <Divider />
                            <Box
                                sx={{
                                    p: 3,
                                }}
                            >
                                <List>
                                    <ListItem>
                                        <ListItemText sx={{ pl: "0px", fontWeight: 800, maxWidth: "300px" }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Customer Name
                                                </Typography>
                                            </Box>
                                        </ListItemText>
                                        <Box
                                            sx={{
                                                flex: "1 1 0%",
                                                mt: "0px",
                                            }}
                                        >
                                            <Typography sx={{ opacity: 0.75 }}>{orderDetails?.billing_details?.billing_first_name + " " + orderDetails?.billing_details?.billing_last_name ?? 'N.A.'}</Typography>
                                            <Typography sx={{ opacity: 0.75 }}>
                                                {orderDetails?.billing_details?.billing_address_line_1 ?? 'N.A.'}
                                            </Typography>
                                            <Typography sx={{ opacity: 0.75 }}>{orderDetails?.billing_details?.billing_city ?? 'N.A.'}</Typography>
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText sx={{ pl: "0px", fontWeight: 800, maxWidth: "300px" }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Order ID
                                                </Typography>
                                            </Box>
                                        </ListItemText>
                                        <Box
                                            sx={{
                                                flex: "1 1 0%",
                                                mt: "0px",
                                            }}
                                        >
                                            <Typography sx={{ opacity: 0.75 }}>{orderDetails?.order_item_details?.[0]?.order_item_id ?? 'N.A.'}</Typography>
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText sx={{ pl: "0px", fontWeight: 800, maxWidth: "300px" }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Date
                                                </Typography>
                                            </Box>
                                        </ListItemText>
                                        <Box
                                            sx={{
                                                flex: "1 1 0%",
                                                mt: "0px",
                                            }}
                                        >
                                            <Typography sx={{ opacity: 0.75 }}>01/01/2023 15:31</Typography>
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText sx={{ pl: "0px", fontWeight: 800, maxWidth: "300px" }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Sub Total
                                                </Typography>
                                            </Box>
                                        </ListItemText>
                                        <Box
                                            sx={{
                                                flex: "1 1 0%",
                                                mt: "0px",
                                            }}
                                        >
                                            <Typography sx={{ opacity: 0.75 }}>$ {orderDetails?.billing_details?.order_sub_total ?? 'N.A.'}</Typography>
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText sx={{ pl: "0px", fontWeight: 800, maxWidth: "300px" }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Tax
                                                </Typography>
                                            </Box>
                                        </ListItemText>
                                        <Box
                                            sx={{
                                                flex: "1 1 0%",
                                                mt: "0px",
                                            }}
                                        >
                                            <Typography sx={{ opacity: 0.75 }}>$180 ( 18% VAT )</Typography>
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText sx={{ pl: "0px", fontWeight: 800, maxWidth: "300px" }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Coupon Code
                                                </Typography>
                                            </Box>
                                        </ListItemText>
                                        <Box
                                            sx={{
                                                flex: "1 1 0%",
                                                mt: "0px",
                                            }}
                                        >
                                            <Typography sx={{ opacity: 0.75 }}>PROMO1 ( Discount - $80 )</Typography>
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText sx={{ pl: "0px", fontWeight: 800, maxWidth: "300px" }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Total
                                                </Typography>
                                            </Box>
                                        </ListItemText>
                                        <Box
                                            sx={{
                                                flex: "1 1 0%",
                                                mt: "0px",
                                            }}
                                        >
                                            <Typography sx={{ opacity: 0.75 }}>$ {orderDetails?.billing_details?.order_total ?? 'N.A.'}</Typography>
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText sx={{ pl: "0px", fontWeight: 800, maxWidth: "300px" }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Order Status
                                                </Typography>
                                            </Box>
                                        </ListItemText>
                                        <Box
                                            sx={{
                                                flex: "1 1 0%",
                                                mt: "0px",
                                            }}
                                        >
                                            <Chip label={`${orderDetails?.billing_details?.order_status ?? 'N.A.'}`} color={`${orderDetails?.billing_details?.order_status === 'Completed' ? 'success' : 'warning'}`} />
                                        </Box>
                                    </ListItem>
                                </List>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                        <Card>
                            <CardHeader title="Order Items" />
                            <Divider />
                            <Box>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Celebrity Name</TableCell>
                                                <TableCell>Review Status</TableCell>
                                                <TableCell>Review Expiry Date</TableCell>
                                                <TableCell>Amout Paid</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orderDetails?.order_item_details?.map((el, index) => {
                                                return (
                                                    <>
                                                        <TableRow key={index}>
                                                            <TableCell>{el?.celebrity_first_name + " " + el?.celebrity_last_name ?? 'N.A.'}</TableCell>
                                                            <TableCell>
                                                                <Chip label={el?.celebrity_payment_status} color={`${el?.celebrity_payment_status === 'Completed' ? 'success' : 'warning'}`} />
                                                            </TableCell>
                                                            <TableCell>01/01/2023</TableCell>
                                                            <TableCell>${el?.item_price ?? 'N.A.'}</TableCell>
                                                            <TableCell>
                                                                <Tooltip title="This will only change the order status as Refunded. You need to go to stripe and refund the amount for the Music Creator">
                                                                    <Button color="error" variant="contained">
                                                                        Refund
                                                                    </Button>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
};

export default ViewOrder