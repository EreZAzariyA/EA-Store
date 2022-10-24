class OrderModel {
      fullName: string;
      country: string;
      address: string;
      creditCard: { cardNumber: string, cvv: number, expirationDate: Date };
}
export default OrderModel