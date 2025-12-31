import { test, expect } from "@playwright/test";

test('Task10: Check iframe content', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');
  
  const frame = page.frameLocator('#mce_0_ifr');
  
  const buttons = ["File", "Edit", "View", "Format"];
  for (const button of buttons) {
    await expect(page.locator(`.tox-mbtn:has-text("${button}")`)).toBeDisabled();
  }
  
  await expect(frame.locator('#tinymce')).toHaveText('Your content goes here.');
});