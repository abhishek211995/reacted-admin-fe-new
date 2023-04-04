import { Card } from '@mui/material';
// import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from '../../content/applications/Transactions/RecentOrdersTable';
import { subDays } from 'date-fns';
import { OrderData } from 'src/models/crypto_order';
import { OrderItem } from 'src/interface/OrderTypes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { HttpRequest } from 'src/services/axios.service';

function RecentOrders() {

  const [Orders, setOrders] = useState([]);
  const router = useNavigate();
  const http = new HttpRequest();
  const getOrders = async () => {
    const response = await http.axiosRequest('/get_all_orders', 'GET', true);
    setOrders(response?.data?.data);
  };
  useEffect(() => {
    getOrders();

    return () => {
      setOrders([]);
    };
  }, []);

  return (
    <Card>
      <RecentOrdersTable orderDetails={Orders} />
    </Card>
  );
}

export default RecentOrders;
