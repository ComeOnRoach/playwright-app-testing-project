import { test, expect } from "@playwright/test";

test.describe("IoT Dashboard => Temperature", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("http://localhost:4200");
    })

    test("IoT Dashboard => Temperature => 30C", async ({page}) => {
        const expectedResult = " 30  Celsius ";
        const temperatureTab = page.locator(".content-active ngx-temperature-dragger");
        const boundingBox = await temperatureTab.boundingBox();
        const x = boundingBox.x + boundingBox.x / 2;
        const y = boundingBox.y;

        await temperatureTab.scrollIntoViewIfNeeded();

        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x+100, y);
        await page.mouse.move(x + 100, y + 300);
        await page.mouse.up();

        await expect(temperatureTab).toHaveText(expectedResult);    
    })

    test("IoT Dashboard => Temperature => 12C", async ({ page }) => {
        const expectedResult = " 12  Celsius ";
        const temperatureTab = page.locator(".content-active ngx-temperature-dragger");
        const boundingBox = await temperatureTab.boundingBox();
        const x = boundingBox.x + boundingBox.x / 2;
        const y = boundingBox.y;

        await temperatureTab.scrollIntoViewIfNeeded();

        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x - 100, y);
        await page.mouse.move(x - 100, y + 300);
        await page.mouse.up();

        await expect(temperatureTab).toHaveText(expectedResult);
    })
})