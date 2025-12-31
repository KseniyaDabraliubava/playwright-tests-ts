import { test, expect } from "@playwright/test";

test('Task6: Check file upload', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
  
  await page.locator('#file-upload').setInputFiles('test.txt');
  await page.locator('#file-submit').click();
  
  await expect(page.locator('#uploaded-files')).toHaveText('test.txt');
});