import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { customerData } from '../test-data/customer-data';

export class CheckoutPage extends BasePage {
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.placeOrderButton = this.page.getByTestId('place-order-button');
    }

    async fillContactDetails() {
        await this.page.getByTestId('checkout-firstname-input').fill(customerData.firstName);
        await this.page.getByTestId('checkout-lastname-input').fill(customerData.lastName);
        await this.page.getByTestId('checkout-email-input').fill(customerData.email);
    }

    async fillShippingDetails() {
        await this.page.getByTestId('checkout-address-input').fill(customerData.address);
        await this.page.getByTestId('checkout-city-input').fill(customerData.city);
        await this.page.getByTestId('checkout-zipcode-input').fill(customerData.zipCode);
        await this.page.getByTestId('checkout-country-input').fill(customerData.country);
    }

    async fillPaymentDetails() {
        await this.page.getByTestId('checkout-cardname-input').fill(customerData.payment.nameOnCard);
        await this.page.getByTestId('checkout-cardnumber-input').fill(customerData.payment.cardNumber);
        await this.page.getByTestId('checkout-cardexpiry-input').fill(customerData.payment.cardExpiry);
        await this.page.getByTestId('checkout-cardcvc-input').fill(customerData.payment.cardCVC);
    }

    async placeOrderClick() {
        await this.placeOrderButton.click();
    }
}