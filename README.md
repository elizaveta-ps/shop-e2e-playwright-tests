# Guest User E2E Flow (demo project)

This is a demo end-to-end test automation project for an e-commerce application using Playwright. The goal of this project is to practice UI and API testing, as well as automate the checkout flow.

## Tested application:

- UI: https://valentinos-magic-beans.click
- API: https://api.valentinos-magic-beans.click

## 📌 User Journey:

1. Browse product catalog
2. Add product to cart
3. Verify product details and price in cart
4. Proceed to checkout
5. Fill in customer and payment information
6. Place an order
7. Receive tracking code
8. Navigate to tracking page using the code
9. Verify delivered product matches the ordered product

## 🛠 Tech Stack: 
- Playwright
- TypeScript
- Node.js
- npm

## 🚀 How to run tests

```bash
# Install dependencies
npm install

# Run tests
npx playwright test

# Open report
npx playwright show-report
```
