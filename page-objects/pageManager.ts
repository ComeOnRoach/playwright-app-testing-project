import { Page } from "@playwright/test";
import NavigationList from "./navigationList";
import FormLayoutsPage from "./formLayoutsPage";
import DatepickerPage from "./datepikerPage";

class PageManager{
    private readonly page: Page;
    private readonly navigationList: NavigationList;
    private readonly formLayoutsPage: FormLayoutsPage;
    private readonly datepickerPage: DatepickerPage;

    constructor(page: Page){
        this.page = page;
        this.navigationList = new NavigationList(this.page);
        this.formLayoutsPage = new FormLayoutsPage(this.page);
        this.datepickerPage = new DatepickerPage(this.page);        
    }

    navigateTo(){
        return this.navigationList;
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage;
    }

    onDatepickerPage(){
        return this.datepickerPage;
    }

}

export default PageManager;