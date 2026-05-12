import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { parsePrice } from '../utils/parsePrice';

export class CartPage extends BasePage {
    readonly product: Locator;
    readonly checkoutButton: Locator;
    
    constructor(page: Page) {
        super(page);
        this.product = this.page.getByTestId('cart-item');
        this.checkoutButton = this.page.getByTestId('proceed-to-checkout');
    }

    async getProductTitle(index: number): Promise<string> {
        return await this.product.nth(index)
            .getByRole('heading', { level: 3 })
            .innerText();
    }

    async getProductTotalPrice(index: number): Promise<number> {
        const priceText = await this.product.nth(index)
            .locator('div.text-right')
            .locator('p.font-bold')
            .innerText();

        return parsePrice(priceText);
    }

    async getSubtotalPrice(): Promise<number> {
        const priceText = await this.page
            .getByText('Subtotal')
            .locator('..')
            .locator('span.font-semibold')
            .innerText();

        return parsePrice(priceText);
    }

    async checkoutClick() {
        await this.checkoutButton.click();
    }
}