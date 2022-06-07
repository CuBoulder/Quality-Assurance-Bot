
import { test, expect, Page } from '@playwright/test';
const urlList = [
  'https://www.google.com',
  'https://catalog.colorado.edu/continuing-education/'
];
for( let url of urlList) {

    test.beforeEach(async ({ page }) => {
        await page.goto(url);
      });
      
test('basic test ' + url, async ({ page }) => {
    await page.goto(url);
    const logo = page.locator('.page-title');
    await expect(logo).toHaveText('Continuing Education Catalog');
  });

  test('basic test fail ' + url, async ({ page }) => {
    await page.goto(url);
    const logo = page.locator('.page-title');
    await expect(logo).toHaveText('Contining Education Catalog');
  });
}