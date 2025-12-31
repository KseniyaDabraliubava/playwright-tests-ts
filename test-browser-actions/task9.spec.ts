import { test, expect } from "@playwright/test";

test('Task9: Get page title using evaluate', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/tables');
  
  const title = await page.evaluate(() => document.title);
  
  expect(title).toBe('The Internet');
});