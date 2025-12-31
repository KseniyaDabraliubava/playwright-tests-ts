
import { test, expect } from '@playwright/test';

test('Task2: Open new window and check URL and title', async ({ page, context }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');
  
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('text="Click Here"').click()
  ]);
  
  await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new');
  await expect(newPage).toHaveTitle('New Window');
});