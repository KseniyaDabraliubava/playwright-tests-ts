import { test, expect } from "@playwright/test";

test('Task8: Call JS confirm and check result', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
  page.on('dialog', dialog => dialog.accept());
  await page.locator('button:has-text("Click for JS Confirm")').click();
  
  await expect(page.locator('#result')).toHaveText('You clicked: Ok');
});