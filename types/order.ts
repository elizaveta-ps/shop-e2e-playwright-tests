import { CustomerData } from './customer';

export type OrderItem = {
    productId: string;
    quantity: number;
}

export type OrderPayload = {
    customerDetails: CustomerData;
    items: OrderItem[];
}