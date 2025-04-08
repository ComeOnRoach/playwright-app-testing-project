import { Locator, Page } from "@playwright/test";

class NavigationList {
    private readonly page: Page;
    readonly formLayotsMenuItem: Locator;
    readonly datepikerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly toastrMenuItem: Locator;
    readonly tooltipMenuIterm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formLayotsMenuItem = page.getByTitle("Form Layout");
        this.datepikerMenuItem = page.getByTitle("Datepicker");
        this.smartTableMenuItem = page.getByTitle("Smart Table");
        this.toastrMenuItem = page.getByTitle("Toastr");
        this.tooltipMenuIterm = page.getByTitle("Tooltip");
    }

    async formLayoutPage() {
        await this.selectGroupMenuItem("Forms");
        await this.formLayotsMenuItem.click();
    }

    async datepickerPage(){
        await this.selectGroupMenuItem("Forms");
        await this.datepikerMenuItem.click();
    }
    
    async smartTablePage(){
        await this.selectGroupMenuItem("Tables & Data");
        await this.smartTableMenuItem.click();
    }

    async toastrPage(){
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.toastrMenuItem.click();
    }

    async tooltipPage(){
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.tooltipMenuIterm.click();
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const isExpanded = await groupMenuItem.getAttribute('aria-expanded');

        if (isExpanded === "false"){
            await groupMenuItem.click();                       
        }
    }

}


export default NavigationList;