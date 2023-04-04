import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

export interface OrderDetailsInterface {
  order_details: OrderDetail[];
  order_items: OrderItem[];
}

export interface OrderDetail {
  iOrderId: string;
  vBillingFirstName: string;
  vBillingLastName: string;
  vBillingEmail: string;
  vBillingPhone: string;
  vBillingAddressLine1: string;
  vBillingAddressLine2: string;
  vBillingCity: string;
  vBillingState: string;
  vBillingZip: string;
  vBillingCountry: string;
  eOrderSubTotal: string;
  eOrderTax: string;
  eOrderCoupon: string;
  eOrderDiscount: string;
  eOrderTotal: string;
  vOrderPaymentTransactionId: string;
  vPaymentData: string;
  eMusicCreatorId: string;
  eOrderStatus: string;
  dtAddedDate: string;
  dtUpdatedDate: any;
}

export interface OrderItem {
  iOrderItemId: string;
  iOrderId: string;
  iMusicCreatorId: string;
  iCelebrityId: string;
  iMusicUploadKey: string;
  vItemPrice: string;
  vMusicReviewKey: any;
  eItemReviewStatus: string;
  eCelebrityPaymentStatus: string;
  dtAddedDate: string;
  dtUpdatedDate: any;
  dtExpiryDate: string;
  iUserCelebrityId: string;
  iUsersId: string;
  vTitle: string;
  vTagLine: string;
  vShortDescription: string;
  vLongDescription: string;
  vCategories: string;
  vSocialMediaLinks: string;
  dPrice: string;
  vAccountName: string;
  vAccountNumber: string;
  vBankName: string;
  vBankCode: string;
  vBankAddress: string;
  vPaypalId: any;
  eIsFeatured: string;
  vW9Form: string;
}

const ViewOrder = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsInterface>();
  const http = new HttpRequest();
  const { id } = useParams();
  const fetchOrderDetails = async () => {
    const response = await http.axiosRequest(
      `${getAdminOrderDetails}?order_id=${id}`,
      'GET',
      true
    );
    setOrderDetails(response.data.data);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, [id]);
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
          component="p"
        >
          <Link to="/orders">
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
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            Place on <CalendarMonth color="action" sx={{ ml: 1, mr: 1 }} />{' '}
            {orderDetails?.order_details?.[0]?.dtUpdatedDate ?? '11/11/2023'}
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            flexWrap="wrap"
          >
            <CustomizedMenus />
            <Button
              variant="contained"
              color={`${
                orderDetails?.order_details?.[0]?.eOrderStatus === 'Completed'
                  ? 'success'
                  : 'warning'
              }`}
            >
              Order Status:{' '}
              {orderDetails?.order_details?.[0]?.eOrderStatus ||
              orderDetails?.order_details?.[0]?.eOrderStatus?.length > 0
                ? orderDetails?.order_details?.[0]?.eOrderStatus
                : 'N.A.'}
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
                  p: 3
                }}
              >
                <List>
                  <ListItem>
                    <ListItemText
                      sx={{ pl: '0px', fontWeight: 800, maxWidth: '300px' }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>
                          Customer Name
                        </Typography>
                      </Box>
                    </ListItemText>
                    <Box
                      sx={{
                        flex: '1 1 0%',
                        mt: '0px'
                      }}
                    >
                      <Typography sx={{ opacity: 0.75 }}>
                        {orderDetails?.order_details?.[0]?.vBillingFirstName +
                          ' ' +
                          orderDetails?.order_details?.[0]?.vBillingLastName ??
                          'N.A.'}
                      </Typography>
                      <Typography sx={{ opacity: 0.75 }}>
                        {orderDetails?.order_details?.[0]
                          ?.vBillingAddressLine1 ?? 'N.A.'}
                      </Typography>
                      <Typography sx={{ opacity: 0.75 }}>
                        {orderDetails?.order_details?.[0]?.vBillingCity ??
                          'N.A.'}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      sx={{ pl: '0px', fontWeight: 800, maxWidth: '300px' }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>
                          Order ID
                        </Typography>
                      </Box>
                    </ListItemText>
                    <Box
                      sx={{
                        flex: '1 1 0%',
                        mt: '0px'
                      }}
                    >
                      <Typography sx={{ opacity: 0.75 }}>
                        {orderDetails?.order_items?.[0]?.iOrderItemId ?? 'N.A.'}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      sx={{ pl: '0px', fontWeight: 800, maxWidth: '300px' }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Date</Typography>
                      </Box>
                    </ListItemText>
                    <Box
                      sx={{
                        flex: '1 1 0%',
                        mt: '0px'
                      }}
                    >
                      <Typography sx={{ opacity: 0.75 }}>
                        01/01/2023 15:31
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      sx={{ pl: '0px', fontWeight: 800, maxWidth: '300px' }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>
                          Sub Total
                        </Typography>
                      </Box>
                    </ListItemText>
                    <Box
                      sx={{
                        flex: '1 1 0%',
                        mt: '0px'
                      }}
                    >
                      <Typography sx={{ opacity: 0.75 }}>
                        ${' '}
                        {orderDetails?.order_details?.[0]?.eOrderSubTotal ??
                          'N.A.'}
                      </Typography>
                    </Box>
                  </ListItem>

                  {/* <Divider />
                  <ListItem>
                    <ListItemText
                      sx={{ pl: '0px', fontWeight: 800, maxWidth: '300px' }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>
                          Coupon Code
                        </Typography>
                      </Box>
                    </ListItemText>
                    <Box
                      sx={{
                        flex: '1 1 0%',
                        mt: '0px'
                      }}
                    >
                      <Typography sx={{ opacity: 0.75 }}>
                        PROMO1 ( Discount - $80 )
                      </Typography>
                    </Box>
                  </ListItem> */}
                  <Divider />
                  <ListItem>
                    <ListItemText
                      sx={{ pl: '0px', fontWeight: 800, maxWidth: '300px' }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Total</Typography>
                      </Box>
                    </ListItemText>
                    <Box
                      sx={{
                        flex: '1 1 0%',
                        mt: '0px'
                      }}
                    >
                      <Typography sx={{ opacity: 0.75 }}>
                        ${' '}
                        {orderDetails?.order_details?.[0]?.eOrderTotal ??
                          'N.A.'}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      sx={{ pl: '0px', fontWeight: 800, maxWidth: '300px' }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>
                          Order Status
                        </Typography>
                      </Box>
                    </ListItemText>
                    <Box
                      sx={{
                        flex: '1 1 0%',
                        mt: '0px'
                      }}
                    >
                      <Chip
                        label={`${
                          orderDetails?.order_details?.[0]?.eOrderStatus?.length
                            ? orderDetails?.order_details?.[0]?.eOrderStatus
                            : 'N.A.'
                        }`}
                        color={`${
                          orderDetails?.order_details?.[0]?.eOrderStatus ===
                          'Completed'
                            ? 'success'
                            : 'warning'
                        }`}
                      />
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
                      {orderDetails?.order_items?.map((el, index) => {
                        return (
                          <>
                            <TableRow key={index * 2}>
                              <TableCell>{el?.vTitle ?? 'N.A.'}</TableCell>
                              <TableCell>
                                <Chip
                                  label={el?.eCelebrityPaymentStatus}
                                  color={`${
                                    el?.eCelebrityPaymentStatus === 'Completed'
                                      ? 'success'
                                      : 'warning'
                                  }`}
                                />
                              </TableCell>
                              <TableCell>01/01/2023</TableCell>
                              <TableCell>${el?.dPrice ?? 'N.A.'}</TableCell>
                              <TableCell>
                                <Tooltip title="This will only change the order status as Refunded. You need to go to stripe and refund the amount for the Music Creator">
                                  <Button color="error" variant="contained">
                                    Refund
                                  </Button>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          </>
                        );
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
  );
};

export default ViewOrder;
