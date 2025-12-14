import { test, Page } from "@playwright/test";

// Login
class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/v1/");
  }

  async login(username: string, password: string) {
    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
    await this.page.click("#login-button");
  }
}

// Products
class InventoryPage {
  constructor(private page: Page) {}

  async addItemToCart(itemName: string) {
    await this.page.click(`button[data-test="add-to-cart-${itemName}"]`);
  }

  async sortProducts(option: string) {
    await this.page.selectOption(".product_sort_container", option);
  }

  async openCart() {
    await this.page.click(".shopping_cart_link");
  }
}

// Cart
class CartPage {
  constructor(private page: Page) {}

  async removeItem(itemName: string) {
    await this.page.click(`button[data-test="remove-${itemName}"]`);
  }
}

test.describe("UI Tests", () => {
  // Test 1
  test("1. Success login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await page.waitForURL("**/inventory.html");
  });

  // Test 2
  test("2. Unsuccess login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login("invalid_user", "wrong_password");
    await page.locator('[data-test="error"]').waitFor();
  });

  // Test 3
  test("3. Add products to cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    await page.locator(".shopping_cart_badge").waitFor();
    await inventoryPage.openCart();
    await page.waitForURL("**/cart.html");
  });

  // Test 4
  test("4. Remove products from cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    await inventoryPage.addItemToCart("sauce-labs-bike-light");
    await inventoryPage.openCart();
    await cartPage.removeItem("sauce-labs-backpack");
    await cartPage.removeItem("sauce-labs-bike-light");
  });

  // Test 5
  test("5. Sort products from lowest to highest price", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.sortProducts("lohi");
    await page.locator(".inventory_item_price").first().waitFor();
  });
});