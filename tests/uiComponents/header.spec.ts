import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
})

test.describe("Header Theme Drop-Down List", () => {

    test("Header Theme Drop-Down List => All Options check", async ({page}) => {
        const headerListBtn = page.locator("[status='primary']").getByRole('button');
        const allThemesSelector = page.getByRole('list').locator("nb-option");

        await headerListBtn.click();
        await expect(allThemesSelector).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

    })

    test("Header Theme Drop-Down List => All Options Background and Button text", async ({ page }) => {
        const headerListBtn = page.locator("[status='primary']").getByRole('button');
        const allThemesSelector = page.getByRole('list').locator("nb-option");

        const colors = {
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)",
            "Light": "rgb(255, 255, 255)",
        }

        for (const color in colors) {
            await headerListBtn.click();
            await allThemesSelector.filter({ hasText: color }).click();
            await expect(headerListBtn).toHaveText(color);
            await expect(headerListBtn).toHaveCSS("background-color", colors[color]);
        }
    })

})
