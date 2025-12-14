import { expect } from "@playwright/test";

expect.extend({
  toHaveItemsInCart(actualCount: number, expectedCount: number) {
    const pass = actualCount === expectedCount;

    return {
      message: () =>
        pass
          ? `Expected cart not to have ${expectedCount} items, but it has ${actualCount}`
          : `Expected cart to have ${expectedCount} items, but found ${actualCount}`,
      pass: pass,
    };
  },
});
