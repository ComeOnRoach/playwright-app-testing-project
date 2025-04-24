import {expect} from "@playwright/test";
import {test} from "../../test-variables";

test.describe("GlobalSQA => Drag and Drop", () => {
    test.beforeEach(async ({page, globalsQAUrl}) => {
        await page.goto(globalsQAUrl);
    })

    test("GlobalSQA => Drag and Drop => iframe", async ({page}) => {
        const frame = page.frameLocator('iframe[class="demo-frame lazyloaded"]');
        const trash = frame.locator("#trash");
        const welcomeConsentBtn = page.locator('.fc-dialog-container [aria-label="Consent"]');
        const box = await frame.locator('[class="ui-widget ui-helper-clearfix"]').boundingBox();
        const x = box.x + 650;
        const y = box.y + 50;
        
        await welcomeConsentBtn.click();
        await frame.getByText("High Tatras", { exact: true }).dragTo(trash);
        await page.waitForTimeout(500);
        await frame.getByText("High Tatras 2", { exact: true }).dragTo(trash);
        await page.waitForTimeout(500);


        await frame.getByText('High Tatras 3').hover();
        await page.mouse.down();
        await page.mouse.move(x, y);
        await page.mouse.up();

        await frame.getByText('High Tatras 4').hover();
        await page.mouse.down()
        await page.mouse.move(x, y);
        await page.mouse.up();


        await expect(trash.locator('li h5')).toHaveText(["High Tatras", "High Tatras 2", "High Tatras 3", "High Tatras 4" ]);

    })
} )