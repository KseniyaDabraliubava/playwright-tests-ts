import { test, expect, Page } from "@playwright/test";

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

class InventoryPage {
  constructor(private page: Page) {}

  async sortProducts(option: string) {
    await this.page.selectOption(".product_sort_container", option);
  }
}

test.describe("Screenshot Tests", () => {
  test("Sort products with screenshot validation", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.sortProducts("lohi");

    // Screenshot assertion - проверка всей страницы
    await expect(page).toHaveScreenshot("sorted-products-page.png");

    // Screenshot assertion - проверка списка товаров
    await expect(page.locator(".inventory_list")).toHaveScreenshot(
      "inventory-list.png",
    );
  });
});
