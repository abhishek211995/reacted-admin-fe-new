import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { baseUrl } from 'src/constants/constants';
import { SeverityPill } from '../Dashboard/ServityPill';
import { HttpRequest } from 'src/services/axios.service';



const LatestOrders = (props: any) => {
    const [Orders, setOrders] = useState([])
    const router = useNavigate()
    const http = new HttpRequest()
    const getOrders = async () => {
        const response = await http.axiosRequest("/get_all_orders", 'GET', true)
        setOrders(response?.data?.data);
        console.log("RESPONSE", response)
    }
    useEffect(() => {
        getOrders()

        return (() => {
            setOrders([])
        })
    }, []);
    return (

        <Card {...props}>
            <CardHeader title="Latest Orders" />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                    {Orders?.length > 0 ? <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Order Ref
                                </TableCell>
                                <TableCell>
                                    Customer
                                </TableCell>
                                <TableCell sortDirection="desc">
                                    <Tooltip
                                        enterDelay={300}
                                        title="Sort"
                                    >
                                        <TableSortLabel
                                            active
                                            direction="desc"
                                        >
                                            Date
                                        </TableSortLabel>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Orders.map((order) => (
                                <TableRow
                                    hover
                                    key={order.id}
                                >
                                    <TableCell>
                                        {order.iOrderId}
                                    </TableCell>
                                    <TableCell>
                                        {`${order.vBillingFirstName} ${order.vBillingLastName}`}
                                    </TableCell>
                                    <TableCell>
                                        {/* {format(, 'dd/MM/yyyy')} */}
                                        {new Date(order.dtAddedDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <SeverityPill
                                            color={(order.eOrderStatus === 'Completed' && 'success')
                                                || (order.eOrderStatus === 'Failed' && 'error')
                                                || 'warning'}
                                        >
                                            {order.eOrderStatus ?? "N.A."}
                                        </SeverityPill>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => {
                                            router(`/order/${order.iOrderId}`)
                                        }}>
                                            View Order
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> : <h3 style={{ textAlign: 'center' }}>No Orders Found</h3>}
                </Box>
            </PerfectScrollbar>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </Box>
        </Card>
    )

}


export default LatestOrders