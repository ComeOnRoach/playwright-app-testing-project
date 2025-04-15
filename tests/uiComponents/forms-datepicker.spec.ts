import {test} from '@playwright/test';
import PageManager from '../../page-objects/pageManager';

test.describe("Forms => Datepicker => Common Datepicker", () => {
    test.beforeEach(async ({page}) => {
        const pm = new PageManager(page);
        await pm.navigateTo().datepickerPage();
    })

    test("Forms => Datepicker => Common Datepicker => X day before current day", async ({page}) => {
        const pm = new PageManager(page);
        await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(-40);
    })

    test("Forms => Datepicker => Datepicker With Range => X day before current day", async ({ page }) => {
        const pm = new PageManager(page);
        await pm.onDatepickerPage().selectDatepickerWithRangeDateFromToday(-40, 30);
    })
})