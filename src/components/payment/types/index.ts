export enum PaymentStatusEnum {
  ON_BUY,
  TRIAL,
  CONFIRMED
}

export interface IPaymentTable {
  name: string
  status: PaymentStatusEnum
  billImage: string
  createdAt: string
}
