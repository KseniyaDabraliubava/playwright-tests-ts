import { test, expect, Page } from "@playwright/test";
<<<<<<< HEAD
import "../tests/custom-matchers";
=======
>>>>>>> 04879ee (Homework 21)

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

  async getCartBadgeCount() {
    return await this.page.locator(".shopping_cart_badge").textContent();
  }

  async sortProducts(option: string) {
    await this.page.selectOption(".product_sort_container", option);
  }

  async getFirstProductName() {
    return await this.page
      .locator(".inventory_item_name")
      .first()
      .textContent();
  }

  async openCart() {
    await this.page.click(".shopping_cart_link");
  }
}

// Cart
class CartPage {
  constructor(private page: Page) {}

  async getCartItems() {
    return await this.page.locator(".cart_item").count();
  }

  async removeItem(itemName: string) {
    await this.page.click(`button[data-test="remove-${itemName}"]`);
  }

  async checkout() {
    await this.page.click("#checkout");
  }
}

test.describe("UI Tests", () => {
  // Test 1
  test("1. Success login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator(".title")).toContainText("Products");
  });

  // Test 2
  test("2. Unsuccess login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login("invalid_user", "wrong_password");
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Username and password do not match",
    );
  });

  // Test 3
  test("3. Add products to cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    const cartBadge = await inventoryPage.getCartBadgeCount();
    expect(cartBadge).toBe("1");
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    const itemsCount = await cartPage.getCartItems();
<<<<<<< HEAD
    expect(itemsCount).toHaveItemsInCart(1);
=======
    expect(itemsCount).toBe(1);
>>>>>>> 04879ee (Homework 21)
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

    let cartBadge = await inventoryPage.getCartBadgeCount();
    expect(cartBadge).toBe("2");
    await inventoryPage.openCart();
    let itemsCount = await cartPage.getCartItems();
    expect(itemsCount).toBe(2);
    await cartPage.removeItem("sauce-labs-backpack");
    itemsCount = await cartPage.getCartItems();
    expect(itemsCount).toBe(1);
    cartBadge = await page.locator(".shopping_cart_badge").textContent();
    expect(cartBadge).toBe("1");
    await cartPage.removeItem("sauce-labs-bike-light");
    itemsCount = await cartPage.getCartItems();
    expect(itemsCount).toBe(0);
    const cartBadgeElement = page.locator(".shopping_cart_badge");
    await expect(cartBadgeElement).not.toBeVisible();
  });

  // Test 5
<<<<<<< HEAD
  test("5. Sort products from lowest to highest price", async ({
    page,
    context,
  }) => {
    await context.tracing.start({ screenshots: true, snapshots: true }); // Start tracing
=======
  test("5. Sort products from lowest to highest price", async ({ page }) => {
>>>>>>> 04879ee (Homework 21)
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.sortProducts("lohi");
    const prices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    const priceValues = prices.map((p) => parseFloat(p.replace("$", "")));
    for (let i = 0; i < priceValues.length - 1; i++) {
      expect(priceValues[i]).toBeLessThanOrEqual(priceValues[i + 1]);
    }
<<<<<<< HEAD
    await context.tracing.stop({ path: "trace.zip" }); // Stop tracing and save it to a file
  });

  // Test 6
  test("6. FAILED - Add product with wrong assertion", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    const cartBadge = await inventoryPage.getCartBadgeCount();
    expect(cartBadge).toBe("5"); // Error
  });

  // Test 7
  test("7. FIXED - Add product with correct assertion", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    const cartBadge = await inventoryPage.getCartBadgeCount();
    expect(cartBadge).toBe("1"); // Fixed
=======
>>>>>>> 04879ee (Homework 21)
  });
});
