import { test, expect } from "@playwright/test";

test('Task7: Download file and check content', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');
  
  const fs = require('fs');
  
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('text="example-upload.txt"').click()
  ]);
  
  const path = await download.path();
  const content = fs.readFileSync(path, 'utf-8');
  expect(content).toBe('This is Vinoth');
});