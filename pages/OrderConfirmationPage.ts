import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {

    async getOrderId(): Promise<string> {
        return await this.page.getByText('Your Order ID is:')
            .locator('..')
            .locator('p.tracking-wider')
            .innerText();
    }

    async getCustomerEmail(): Promise<string> {
        return await this.page.getByText('A confirmation email will be sent to')
            .locator('strong')
            .innerText();
    }

    async trackOrderClick() {
        await this.page
            .getByRole('button', { name: 'Track Your Order' })
            .click();
    }
}