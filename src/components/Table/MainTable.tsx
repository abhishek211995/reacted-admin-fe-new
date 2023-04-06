import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrderStatus, OrderItemData } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { useNavigate } from 'react-router';
import { RemoveRedEyeOutlined, RemoveRedEyeRounded } from '@mui/icons-material';
import BulkActions from 'src/content/applications/Transactions/BulkActions';

interface RecentOrdersTableProps {
  className?: string;
  orderDetails: OrderItemData[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    'In PRogress': {
      text: 'Failed',
      color: 'error'
    },
    Completed: {
      text: 'Completed',
      color: 'success'
    },
    Pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const status = map[cryptoOrderStatus];

  return <Label color={status?.color}>{status?.text}</Label>;
};

const applyFilters = (
  orderDetails: OrderItemData[],
  filters: Filters
): OrderItemData[] => {
  return orderDetails.filter((order) => {
    let matches = true;

    if (filters.status && order?.eOrderStatus !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  orderDetails: OrderItemData[],
  page: number,
  limit: number
): OrderItemData[] => {
  return orderDetails.slice(page * limit, page * limit + limit);
};

export const RecentOrdersTable: FC<RecentOrdersTableProps> = ({
  orderDetails
}) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'Completed',
      name: 'Completed'
    },
    {
      id: 'Pending',
      name: 'Pending'
    },
    {
      id: 'In Progress',
      name: 'In Progress'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked ? orderDetails.map((order) => order?.iOrderId) : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(orderDetails, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < orderDetails.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === orderDetails.length;
  const theme = useTheme();

  const router = useNavigate();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Orders"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>Order Details</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((order) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                order?.iOrderId
              );
              return (
                <TableRow
                  hover
                  key={order?.iOrderId}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, order?.iOrderId)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order?.vBillingFirstName + ' ' + order?.vBillingLastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {new Date(order?.dtAddedDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order?.iOrderId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order?.vOrderPaymentTransactionId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {order?.eOrderStatus}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order?.eOrderTotal}
                      {/* {order.cryptoCurrency} */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(order?.eOrderSubTotal).format(`$ 0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(order?.eOrderStatus)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        onClick={() => {
                          router(`/order/${order.iOrderId}`);
                        }}
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Order" arrow>
                      <IconButton
                        onClick={() => {
                          router(`/order/${order.iOrderId}`);
                        }}
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <RemoveRedEyeRounded fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  orderDetails: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  orderDetails: []
};

export default RecentOrdersTable;
