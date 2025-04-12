import {test, expect} from '@playwright/test';
import DatepickerPage from '../../page-objects/datepikerPage';

test.describe("Forms => Datepicker => Common Datepicker", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("http://localhost:4200");
        await page.getByRole('link', {name: "Forms"}).click();
        await page.getByRole("link", {name: "Datepicker"}).click();
    })

    test("Forms => Datepicker => Common Datepicker => X day before current day", async ({page}) => {
        const onDatepickerPage = new DatepickerPage(page);
        await onDatepickerPage.selectCommonDatepickerDateFromToday(-40);
    })

    test("Forms => Datepicker => Datepicker With Range => X day before current day", async ({ page }) => {
        const onDatepickerPage = new DatepickerPage(page);
        await onDatepickerPage.selectDatepickerWithRangeDateFromToday(-40, 30);
    })
})