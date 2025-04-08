import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200");
    await page.getByRole('link', { name: "Modal & Overlays" }).click();
    await page.getByRole('link', { name: "Tooltip" }).click();
})

test.describe("Modal & Overlays => Tooltip", ()=> {
    test("Modal & Overlays => Tooltip => Show Tooltip", async ({page}) => {
        const tooltipValue = "This is a tooltip";
        const btnWithTooltip = page.locator("nb-card", { hasText: 'Tooltip With Icon'});
        const tooltipWithIcon = page.locator("nb-tooltip");

        await btnWithTooltip.locator('[nbtooltipicon="home-outline"]').hover();
        await expect(tooltipWithIcon).toHaveText(tooltipValue);
    })
    
})