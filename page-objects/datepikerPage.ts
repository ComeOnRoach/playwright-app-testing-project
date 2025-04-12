import { Locator, Page, expect } from "@playwright/test";

class DatepickerPage{

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    /**
     * 
     * @param numberOfDaysFromToday
     * Enter a positive or negative integer indicating the number of days from today (e.g., -5 for 5 days ago, 3 for 3 days from now).
     */
    async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number,){
        const formSelector = this.page.locator("nb-card", { hasText: "Common Datepicker" }).getByRole('textbox');
        const date = new Date();

        await this.daySelector(numberOfDaysFromToday, "Common Datepicker", date);
        const expectedDate = await this.getExpectedDate(numberOfDaysFromToday, "Common Datepicker");

        await expect(formSelector).toHaveValue(expectedDate);
    }
    
    /**
    * 
    * @param {number} startDayNumberOfDaysFromToday - A positive or negative integer representing the number of days from today. For example, -5 indicates 5 days ago and 3 indicates 3 days from now.
    * @param {number} endDayNumberOfDaysFromStartDay - A positive or negative integer representing the number of days from the start day. For example, -3 indicates 3 days before the start day, and 4 indicates 4 days after the start day.
    */
    async selectDatepickerWithRangeDateFromToday(startDayNumberOfDaysFromToday: number, endDayNumberOfDaysFromStartDay: number){
        const datepickerWithRange = this.page.locator("nb-card", { hasText: "Datepicker With Range" }).getByRole("textbox");
        const expectedDate = await this.getExpectedDate(startDayNumberOfDaysFromToday, "Datepicker With Range", endDayNumberOfDaysFromStartDay);
        const date = new Date();
        
        await datepickerWithRange.click();
        await this.daySelector(startDayNumberOfDaysFromToday, "Datepicker With Range", date);
        await this.daySelector(endDayNumberOfDaysFromStartDay, "Datepicker With Range", date);

        await expect(datepickerWithRange).toHaveValue(expectedDate);
    }

    private async daySelector(numberOfDays: number, datepickerName: string, date: Date){
        const formSelector = this.page.locator("nb-card", { hasText: datepickerName }).getByRole("textbox");
        let formClassAttribute = await this.getSelectedForm(datepickerName);
        date.setDate(date.getDate() + numberOfDays);
        const expectedDay = (date.getDate()).toString();
        const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
        const monthLong = date.toLocaleString("en-EU", { month: "long" });
        const expectedYear = date.getFullYear();
        const calendarExpectedMonthAndYear = ` ${monthLong} ${expectedYear} `;
        const calendarSelection = this.page.locator(formClassAttribute).getByText(expectedDay, { exact: true });
        // const monthYearBtn = this.page.locator('nb-card-header button[class="appearance-ghost size-medium shape-rectangle icon-end status-basic nb-transition"]');
        const monthYearBtn = this.page.locator('nb-calendar-view-mode button');
        
        await formSelector.click();
        
        let currentMonthYear = await monthYearBtn.textContent();
        let currentMonth = currentMonthYear.replace(/[0-9\s]+/g, "");
        
        while (currentMonthYear !== calendarExpectedMonthAndYear) {
            const currentYear = currentMonthYear.replace(/[a-zA-Z\s]+/g, "");
            if (expectedYear !== parseInt(currentYear)) {
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
    }

    private async getSelectedForm(datepickerName: string){
        let classAttribute: string;
        datepickerName === "Common Datepicker" && (classAttribute = '[class="day-cell ng-star-inserted"]');
        datepickerName === "Datepicker With Range" && (classAttribute = '[class="range-cell day-cell ng-star-inserted"]');
        datepickerName === "Datepicker With Disabled Min Max Values" && (classAttribute = '[class="day-cell ng-star-inserted"]');

        return classAttribute;
    }

    private async getExpectedDate(numberOfDays: number, datepickerName: string, endDayNumberOfDaysFromStartDay?: number){
        let expectedDate: string;
        
        datepickerName === "Common Datepicker" && (() => {
            const date = new Date();
            date.setDate(date.getDate() + numberOfDays);
            const expectedDay = (date.getDate()).toString();
            const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
            const expectedYear = date.getFullYear();
            expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`;
        })()

        datepickerName === "Datepicker With Range" && (() => {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() + numberOfDays);
            const expectedStartDay = (startDate.getDate()).toString();
            const expectedStartMonthShort = startDate.toLocaleString("en-US", { month: "short" });
            const expectedStartYear = startDate.getFullYear();

            const endDate = startDate;
            startDate.setDate(endDate.getDate() + endDayNumberOfDaysFromStartDay);
            const expectedEndDay = (endDate.getDate()).toString();
            const expectedEndDayMonthShort = endDate.toLocaleString("en-US", { month: "short" });
            const expectedEndDayYear = endDate.getFullYear();

            expectedDate = `${expectedStartMonthShort} ${expectedStartDay}, ${expectedStartYear} - ${expectedEndDayMonthShort} ${expectedEndDay}, ${expectedEndDayYear}`;
        })()

        return expectedDate;
    }

}

export default DatepickerPage;