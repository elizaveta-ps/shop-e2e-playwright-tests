import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
    readonly url: string;
    readonly orderIdInput: Locator;
    readonly emailInput: Locator;
    readonly trackOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.url = '/contact';
        this.orderIdInput = this.page.getByTestId('contact-order-id-input');
        this.emailInput = this.page.getByTestId('contact-email-input');
        this.trackOrderButton = this.page.getByTestId('contact-track-order-button');
    }

    async open() {
        await this.page.goto(this.url);
    }

    async fillOrderId(orderId: string) {
        await this.orderIdInput.fill(orderId);
    }
    
    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async trackOrderClick() {
        await this.trackOrderButton.click();
    }
}