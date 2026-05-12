import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: {
    baseURL: 'https://valentinos-magic-beans.click',
    testIdAttribute: 'data-test-id',
  },
  projects: [
    { 
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://api.valentinos-magic-beans.click',
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'content-type': 'application/json',
        }
      },
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
      },
      testIgnore: 'api/**/*.spec.ts',
    },
  ],
});