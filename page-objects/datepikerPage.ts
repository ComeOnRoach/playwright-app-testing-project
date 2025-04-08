import { Page, expect } from "@playwright/test";

class DatepickerPage{

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    /**
     * 
     * @param numberOfDaysFromToday - enter number of days from today
     */
    async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number){
        const date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDay = (date.getDate()).toString();
        const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
        const monthLong = date.toLocaleString("en-EU", { month: "long" });
        const expectedYear = date.getFullYear();
        const expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`;
        const calendarMonthYear = ` ${monthLong} ${expectedYear} `;
        const formPickerField = this.page.locator("nb-card", { hasText: "Common Datepicker" }).getByRole("textbox");
        const calendarSelection = this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDay, { exact: true });

        await formPickerField.click({force: true});

        const monthYearBtn = this.page.locator('nb-card-header button[class="appearance-ghost size-medium shape-rectangle icon-end status-basic nb-transition"]');
        let currentMonthYear = await monthYearBtn.textContent();

        const currentdate = new Date();
        let currentMonth = currentdate.toLocaleString("en-EU", { month: "long" });;
        while (currentMonthYear !== calendarMonthYear) {
            const currentYear = currentdate.getFullYear();
            if (expectedYear !== currentYear) {
                await monthYearBtn.click();
                await this.page.locator("nb-calendar-picker").getByText(expectedYear.toString(), { exact: true }).click();
                await this.page.locator("nb-calendar-picker").getByText(expectedMonthShort).click();
            } else {
                const months = {
                    "January": 1,
                    "February": 2,
                    "March": 3,
                    "April": 4,
                    "May": 5,
                    "June": 6,
                    "July": 7,
                    "August": 8,
                    "September": 9,
                    "October": 10,
                    "November": 11,
                    "December": 12
                };
                if (months[monthLong] > months[currentMonth]) {
                    const nextMonthBtn = this.page.locator("nb-card-header .next-month");
                    await nextMonthBtn.click();
                    currentMonth = Object.entries(months).find(([key, value]) => value === (months[currentMonth] + 1))[0];
                }
                if (months[monthLong] < months[currentMonth]) {
                    const prevMonthBtn = this.page.locator("nb-card-header .prev-month");
                    await prevMonthBtn.click();
                    currentMonth = Object.entries(months).find(([key, value]) => value === (months[currentMonth] - 1))[0];
                }
            }
            currentMonthYear = await monthYearBtn.textContent();
        }

        await calendarSelection.click();
        await expect(formPickerField).toHaveValue(expectedDate);


    }

}

export default DatepickerPage;