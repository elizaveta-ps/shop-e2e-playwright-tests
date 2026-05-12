import { expect, test } from '@playwright/test';
import { customerData } from '../../test-data/customer-data';
import { OrderPayload } from '../../types/order';
import { Products } from '../../types/product';

test('API Guest user order flow', { tag: '@API' }, async ({ request }) => {
    let products: Products;
    let productId: string;
    let orderId: string;
    let orderPayload: OrderPayload;

    await test.step('GET /products - should return the product list', async () => {
        const response = await request.get('/products');

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toBe('application/json');

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('success', true);
        expect(Array.isArray(responseBody.data)).toBe(true);
        expect(responseBody.data.length).toBeGreaterThan(0);

        products = responseBody.data;
    });

    await test.step('should select first product ID', async () => {
        productId = products[0].id;
    });

    await test.step('POST /orders - should create order and return order ID', async () => {
        orderPayload = {
            customerDetails: {
                firstName: customerData.firstName,
                lastName: customerData.lastName,
                email: customerData.email,
                address: customerData.address,
                city: customerData.city,
                zipCode: customerData.zipCode,
                country: customerData.country,
            },
            items: [{ productId, quantity: 1}],
        }

        const ordersResponse = await request.post('/orders', {
            data: orderPayload,
        });

        expect(ordersResponse.status()).toBe(201);
        expect(ordersResponse.headers()['content-type']).toBe('application/json');

        const ordersResponseBody = await ordersResponse.json();

        expect(ordersResponseBody).toHaveProperty('success', true);
        expect(ordersResponseBody).toHaveProperty('data');
        expect(ordersResponseBody.data).toHaveProperty('orderId');
        expect(ordersResponseBody.data).toHaveProperty('message', 'Order created successfully');

        orderId = ordersResponseBody.data.orderId;

        expect(typeof orderId).toBe('string');
        expect(orderId.length).toBeGreaterThan(0);
        expect(orderId).toMatch(/^[A-Z0-9]+$/);
    });

    await test.step('POST /orders/lookup should return order details by orderId', async () => {
        const trackOrderResponse = await request.post('/orders/lookup', {
            data: {
                email: orderPayload.customerDetails.email,
                orderId: orderId
            },
        });

        expect(trackOrderResponse.status()).toBe(200);
        expect(trackOrderResponse.headers()['content-type']).toBe('application/json');

        const trackOrderResponseBody = await trackOrderResponse.json();

        expect(trackOrderResponseBody).toHaveProperty('success', true);
        expect(trackOrderResponseBody).toHaveProperty('data');
        expect(trackOrderResponseBody.data).toHaveProperty('orderId', orderId);
        expect(trackOrderResponseBody.data.items.length).toBeGreaterThan(0);

        const orderedProduct = trackOrderResponseBody.data.items[0];
        expect(orderedProduct.productId).toBe(productId);
    });
});