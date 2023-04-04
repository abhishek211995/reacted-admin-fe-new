export type CryptoOrderStatus = 'Completed' | 'Pending' | 'In Progress';

export interface OrderData {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}
export interface OrderItemData {
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
  eOrderStatus: 'Completed' | 'Pending' | 'In Progress';
  dtAddedDate: string;
  dtUpdatedDate: any;
}
