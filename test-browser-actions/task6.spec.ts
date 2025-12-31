import { test, expect } from "@playwright/test";
import path from 'path';


test('Test6: Check file upload', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');

  await page
    .locator('#file-upload')
    .setInputFiles(path.resolve(__dirname, 'files/test.txt'));

  await page.locator('#file-submit').click();

  await expect(page.locator('h3')).toHaveText('File Uploaded!');
  await expect(page.locator('#uploaded-files')).toHaveText('test.txt');
});