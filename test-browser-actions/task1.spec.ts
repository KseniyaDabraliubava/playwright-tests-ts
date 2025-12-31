import { test, expect } from '@playwright/test';

test('Task1: Find locator and check text', async ({ page }) => {
  await page.goto('https://books-pwakit.appspot.com/');
  
  await expect(page.locator('.books-desc')).toHaveText("Search the world's most comprehensive index of full-text books.");
});