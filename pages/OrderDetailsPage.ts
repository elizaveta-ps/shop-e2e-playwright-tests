import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { parsePrice } from '../utils/parsePrice';

export class OrderDetailsPage extends BasePage {
    readonly productWrapper: Locator;

    constructor(page: Page) {
        super(page);
        this.productWrapper = this.page.locator('.flex.justify-between.items-center');
    }

    async getCustomerName(): Promise<string> {
        const name = await this.page
            .getByText('Name:')
            .locator('..')
            .innerText();

        return name.replace(/^Name:\s*/, '');
    }

    async getCustomerEmail(): Promise<string> {
        const name = await this.page
            .getByText('Email:')
            .locator('..')
            .innerText();

        return name.replace(/^Email:\s*/, '');
    }

    async getItemTitle(index: number): Promise<string> {
        return await this.productWrapper
            .locator('p.font-semibold.text-coffee-800')
            .innerText();
    }

    async getItemPrice(index: number): Promise<number> {
        const priceText = await this.productWrapper
            .locator('p.font-mono.text-coffee-900')
            .innerText();

        return parsePrice(priceText);
    }
}