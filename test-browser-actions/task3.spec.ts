import { test, expect } from "@playwright/test";

test("Task3: Hover over image and check text", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/hovers");

  await page.locator(".figure").nth(2).hover();

  await expect(page.locator(".figure").nth(2).locator("h5")).toBeVisible();
  await expect(page.locator(".figure").nth(2).locator("h5")).toHaveText("name: user3",);
});
