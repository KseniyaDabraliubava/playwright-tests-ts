import { test, expect } from "@playwright/test";

test('Task5: Check key presses', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/key_presses');

  await page.keyboard.press('Control');
  await expect(page.locator('#result')).toHaveText('You entered: CONTROL');
  
  // Kseniya 
  await page.keyboard.press('A');
  await expect(page.locator('#result')).toHaveText('You entered: A');
});