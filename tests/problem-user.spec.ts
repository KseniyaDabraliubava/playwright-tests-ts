import { test, expect } from "@playwright/test";

// Test 1: Temporaryly skipped test
test.skip("Skipped test for problem_user", async ({ page }) => {
  await page.goto("/inventory.html");
  expect(true).toBe(true);
});

// Test 2: Check empty cart with @problem
test("@problem The cart is empty at start", async ({ page }) => {
  await page.goto("/inventory.html");

  const cartBadge = page.locator(".shopping_cart_badge");

  await expect(cartBadge).toHaveCount(0);
});

// Test 3: Parametrized page load tests
const pages = [
  { url: "/inventory.html", name: "Inventory Page" },
  { url: "/cart.html", name: "Cart Page" },
];

for (const pageData of pages) {
  test(`Check load page: ${pageData.name}`, async ({ page }) => {
    await page.goto(pageData.url);

    await expect(page).toHaveURL(new RegExp(pageData.url));

    const logo = page.locator(".app_logo");
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText("Swag Labs");
  });
}

// Test 4: logout test
test("Check logout function", async ({ page }) => {
  await page.goto("/inventory.html");

  await page.click("#react-burger-menu-btn", { timeout: 10000 });
  await page.waitForSelector(".bm-menu", { state: "visible", timeout: 10000 });

  await page.click("#logout_sidebar_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(page.locator("#login-button")).toBeVisible();
});
