import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { ContactPage } from '../../pages/ContactPage';
import { OrderDetailsPage } from '../../pages/OrderDetailsPage';
import { OrderConfirmationPage } from '../../pages/OrderConfirmationPage';
import { customerData } from '../../test-data/customer-data';

test('Guest checkout flow', { tag: '@UI' }, async ({ page }) => {
    let orderId: string;
    let orderedProductTitle: string;
    let orderedProductPrice: number;

    const customerEmail = customerData.email;
    const index = 0;

    await test.step('Add product to cart', async () => {
        const productsPage = new ProductsPage(page);
        await productsPage.open();
        
        orderedProductTitle = await productsPage.getProductTitle(index);
        orderedProductPrice = await productsPage.getProductPrice(index);

        await productsPage.addToCartClick(index);
    });

    await test.step('Open Cart Page', async () => {
        await page.getByTestId('header-cart-button').click();
    });

    await test.step('Verify product data and proceed to checkout', async () => {
        const cartPage = new CartPage(page);

        const cartProductTitle = await cartPage.getProductTitle(index);
        const cartProductTotalPrice = await cartPage.getProductTotalPrice(index);
        const subtotal = await cartPage.getSubtotalPrice();

        expect(orderedProductTitle).toBe(cartProductTitle);
        expect(orderedProductPrice).toEqual(cartProductTotalPrice);
        expect(cartProductTotalPrice).toEqual(subtotal);

        cartPage.checkoutClick();
    });

    await test.step('Fill checkout form and place order', async () => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.fillContactDetails();
        await checkoutPage.fillShippingDetails();
        await checkoutPage.fillPaymentDetails();
        await checkoutPage.placeOrderClick();
    });

    await test.step('Verify order confirmation and get OrderId', async () => {
        const orderConfirmationPage = new OrderConfirmationPage(page);

        orderId = await orderConfirmationPage.getOrderId();
        const orderEmail = await orderConfirmationPage.getCustomerEmail();

        expect(orderId).toBeTruthy();
        expect(orderEmail).toBe(customerEmail);
    });

    await test.step('Submit tracking form and track order', async () => {
        const contactPage = new ContactPage(page);
        contactPage.open();

        await contactPage.fillOrderId(orderId);
        await contactPage.fillEmail(customerEmail);
        await contactPage.trackOrderClick();
    });

    await test.step('Verify order details', async () => {
        const orderDetailsPage = new OrderDetailsPage(page);

        const orderPageCustomerEmail = await orderDetailsPage.getCustomerEmail();
        const orderedItemTitle = await orderDetailsPage.getItemTitle(0);
        const orderedItemPrice = await orderDetailsPage.getItemPrice(0);

        expect(orderPageCustomerEmail).toBe(customerEmail);
        expect(orderedItemTitle).toBe(orderedProductTitle);
        expect(orderedItemPrice).toEqual(orderedProductPrice);
    });
});
