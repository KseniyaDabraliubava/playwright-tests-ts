import { test as setup } from "@playwright/test";

setup("Authenticate as problem_user", async ({ page }) => {
  await page.goto("/");

  await page.fill("#user-name", "problem_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");

  await page.waitForSelector(".inventory_list");
  await page.waitForURL("**/inventory.html");

  await page.context().storageState({ path: "problem-user-state.json" });
});
