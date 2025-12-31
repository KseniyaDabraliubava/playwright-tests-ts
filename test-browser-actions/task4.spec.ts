import { test, expect } from "@playwright/test";

test('Task4: Drag element A onto element B', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  
  await page.locator('#column-a').dragTo(page.locator('#column-b'));
  
  await expect(page.locator('#column-a')).toHaveText('B');
  await expect(page.locator('#column-b')).toHaveText('A');
});