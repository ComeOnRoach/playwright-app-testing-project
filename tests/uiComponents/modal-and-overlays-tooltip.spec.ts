import { test, expect } from "@playwright/test";
import PageManager from "../../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().tooltipPage();
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