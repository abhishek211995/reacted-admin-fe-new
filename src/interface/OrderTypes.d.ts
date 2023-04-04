export interface OrderItem {
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
