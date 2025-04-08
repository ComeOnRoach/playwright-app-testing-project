import { Page, expect } from "@playwright/test";

class FormLayoutsPage {

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    /**
     * Method will out Inline Form with user details
     * @param name 
     * Provide an name for Name field
     * @param email 
     * Provide an email for Email field
     * @param checkbox 
     * Provide 'true' or 'false' for the checkbox
     */
    async submitInlineFormWithNameEmailCheckbox(name: string, email: string, checkbox: boolean) {
        const usingTheGrid = this.page.locator("nb-card", { hasText: "Inline form" });
        const form = usingTheGrid.locator("form");
        const nameField = usingTheGrid.getByPlaceholder("Jane Doe");
        const emailField = usingTheGrid.getByPlaceholder("Email");
        const checkboxBtn = usingTheGrid.getByRole("checkbox", { name: "Remember me" });
        const submitBtn = usingTheGrid.getByRole("button");

        await nameField.fill(name);
        await emailField.fill(email);
        checkbox && await checkboxBtn.click({ force: true });
        !checkbox && await checkboxBtn.uncheck({ force: true });
        await submitBtn.click();

        await expect(nameField).toHaveValue(name);
        await expect(emailField).toHaveValue(email);
        checkbox && await expect(checkboxBtn).toBeChecked();
        !checkbox && await expect(checkboxBtn).not.toBeChecked();
        await expect(form).toHaveClass(/ng-submitted/);
    }

    /**
     * Method will out Using the Grid with user details
     * @param email 
     * Provide an email for Email field
     * @param password 
     * Provide an password for Password field
     * @param radio 
     * Provide an radio button option name
     */
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, radio: string){
        const usingTheGrid = this.page.locator("nb-card", { hasText: "Using the Grid"});
        const form = usingTheGrid.locator("form");
        const emailField = usingTheGrid.getByPlaceholder("Email");
        const passwordField = usingTheGrid.getByPlaceholder("Password");
        const radioBtn = usingTheGrid.getByRole('radio', { name: radio });
        const submitBtn = usingTheGrid.getByRole("button");

        await emailField.fill(email);
        await passwordField.fill(password);
        await radioBtn.click({force: true});
        await submitBtn.click();

        await expect(emailField).toHaveValue(email);
        await expect(passwordField).toHaveValue(password);
        await expect(radioBtn).toBeChecked();
        await expect(form).toHaveClass(/ng-submitted/);
    }

    /**
     * Method will out Basic Form with user details
     * @param email 
     * Provide an email for Email field
     * @param password 
     * Provide an password for Password field
     * @param checkbox 
     * Provide 'true' or 'false' for the checkbox
     */
    async submitBasicFormEmailPasswordCheckbox(email: string, password: string, checkbox?: boolean) {
        const usingTheGrid = this.page.locator("nb-card", { hasText: "Basic form" });
        const form = usingTheGrid.locator("form");
        const emailField = usingTheGrid.getByPlaceholder("Email");
        const passwordField = usingTheGrid.getByPlaceholder("Password");
        const checkboxBtn = usingTheGrid.getByRole("checkbox", { name: "Check me out" });
        const submitBtn = usingTheGrid.getByRole("button");

        await emailField.fill(email);
        await passwordField.fill(password);
        checkbox && await checkboxBtn.click({ force: true });
        !checkbox && await checkboxBtn.uncheck({ force: true });
        await submitBtn.click();

        await expect(emailField).toHaveValue(email);
        await expect(passwordField).toHaveValue(password);
        checkbox && await expect(checkboxBtn).toBeChecked();
        !checkbox && await expect(checkboxBtn).not.toBeChecked();
        await expect(form).toHaveClass(/ng-submitted/);
    }


}

export default FormLayoutsPage;