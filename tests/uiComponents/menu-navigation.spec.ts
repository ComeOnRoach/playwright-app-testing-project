import { test } from "@playwright/test";
import NavigationList from "../../page-objects/navigationList";
import FormLayoutsPage from "../../page-objects/formLayoutsPage";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200");
})

test("Forms => Form Layouts => Inline form", async ({ page }) => {
    const navigateTo = new NavigationList(page);
    const formLayouts = new FormLayoutsPage(page);
    await navigateTo.formLayoutPage();
    await formLayouts.submitInlineFormWithNameEmailCheckbox("Oleks", "Inline.test.odro@gmai.com", false);
})

test("Forms => Form Layouts => Using the Grid", async ({ page }) => {
    const navigateTo = new NavigationList(page);
    const formLayouts = new FormLayoutsPage(page);
    await navigateTo.formLayoutPage();
    await formLayouts.submitUsingTheGridFormWithCredentialsAndSelectOption("test.odro@gmai.com", "6546", "Disabled Option");
})

test("Forms => Form Layouts => Basic Form", async ({ page }) => {
    const navigateTo = new NavigationList(page);
    const formLayouts = new FormLayoutsPage(page);
    await navigateTo.formLayoutPage();
    await formLayouts.submitBasicFormEmailPasswordCheckbox("Basic.test.odro@gmai.com", "65dfdsfs46", true);
})