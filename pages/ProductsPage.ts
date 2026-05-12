import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { parsePrice } from '../utils/parsePrice';

export class ProductsPage extends BasePage {
    readonly url: string;
    readonly product: Locator;

    constructor(page: Page) {
        super(page);
        this.url = '/products';
        this.product = this.page.locator('[data-test-id^="product-card-"]').filter({
            has: this.page.getByRole('button', { name: 'Add to Cart' }),
        });
    }

    async open() {
        await this.page.goto(this.url);
    }

    async getProductTitle(index: number): Promise<string> {
        return await this.product.nth(index)
            .getByRole('heading', { level: 3 })
            .innerText();
    }

    async getProductPrice(index: number): Promise<number> {
        const priceText = await this.product.nth(index)
            .locator('span.text-2xl.font-bold')
            .innerText();

        return parsePrice(priceText);
    }

    async addToCartClick(index: number) {
        await this.product.nth(index)
            .getByRole('button', { name: 'Add to Cart' })
            .click();
    }
}