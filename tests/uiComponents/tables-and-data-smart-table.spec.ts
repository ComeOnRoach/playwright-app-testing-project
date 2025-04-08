import {test, expect} from "@playwright/test";
import { refCount } from "rxjs/operators";

test.describe("Tables & Data => Smart Table", () => {
    test.beforeEach( async ({page}) => {
        await page.goto("http://localhost:4200")
        await page.getByRole("link", { name: "Tables & Data" }).click();
        await page.getByRole("link", { name: "Smart Table" }).click();
    })

    test ("Smart Table => Delete First Row", async({page}) => {
        const email = "mdo@gmail.com";
        const row = page.getByRole("table").locator('tr', { hasText: email });
        const trashBtnFirstRow = row.locator(".nb-trash");
        page.on("dialog", dialog => {
            dialog.accept();
        })

        await trashBtnFirstRow.click();

        expect(row).not.toBe(email);
    })

    test("Smart Table => Modify Row", async({page}) => {
        const rowId = "3";
        const inputValue = "55";

        const targetedRow = page.getByRole("row").filter({has: page.getByText(rowId, {exact: true})})
        const targetedRowEditMode = page.locator("input-editor").getByPlaceholder("Age");
        const saveIcon = page.locator(".nb-checkmark");

        await targetedRow.locator(".nb-edit").click();
        await targetedRowEditMode.fill(inputValue);
        await saveIcon.click();

        await expect(targetedRow.getByRole("cell").nth(6)).toHaveText(inputValue);
    })

    test("Smart Table => check Ages search", async ({ page }) => {
        const allSelectedRows = page.locator('tbody');
        const ages = ["25", "28", "35", "55", "200"];
        const email = "mdo@gmail.com";
        const ageField = page.getByRole("textbox", {name: "Age"});

        for( const age in ages ){
            await page.waitForTimeout(500);
            await ageField.fill(ages[age]);

            for (const row of await allSelectedRows.all()){
                const noDataFoundMessage = " No data found ";
                const ageColumn = row.locator("td").nth(6);
                const noDataFoundRow = page.getByRole('row', { name: noDataFoundMessage });
                if (ages[age] !== ages[(ages.length - 1)]) {
                    await expect(ageColumn).toHaveText(ages[age]);
                } else{
                    await expect(noDataFoundRow).toHaveText(noDataFoundMessage)
                }
            }

        }
    })
})