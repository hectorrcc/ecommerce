import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Testing product list in customer view ", () => {
  test("Add product to cart", async ({ page }) => {
    const InitialShoppingCar = (await page.$eval(
      "#shoppingCarValues",
      (el) => el.textContent
    )) as string;

    const initialValue = parseInt(InitialShoppingCar, 10);

    await page.click("#addShoppingCar");

    await page.waitForTimeout(1000);

    const shoppingCarBefore = (await page.$eval(
      "#shoppingCarValues",
      (item) => item.textContent
    )) as string;

    const LaterValue = parseInt(shoppingCarBefore, 10);

    expect(LaterValue).toBe(initialValue + 1);
  });

  test("Navegar a la página de producto y agregar al carrito", async ({
    page,
  }) => {
    await page.click("#productDetail");

    await page.waitForSelector("#productDetailPage");

    const carritoInicial = (await page.$eval(
      "#shoppingCarValues",
      (element) => element.textContent
    )) as string;

    const initialValue = parseInt(carritoInicial, 10);

    await page.click("#addShoppingCar");

    await page.waitForTimeout(1000);

    const shoppingCarBefore = (await page.$eval(
      "#shoppingCarValues",
      (el) => el.textContent
    )) as string;

    const LaterValue = parseInt(shoppingCarBefore, 10);

    expect(LaterValue).toBe(initialValue + 1);
  });
});
