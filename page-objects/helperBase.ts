import { Page } from "@playwright/test";


class HelperBase{
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }
}

export default HelperBase;