import { test } from "@playwright/test";
import PageManager from "../../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutPage();
})

test("Forms => Form Layouts => Inline form", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailCheckbox("Oleks", "Inline.test.odro@gmai.com", false);
})

test("Forms => Form Layouts => Using the Grid", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test.odro@gmai.com", "6546", "Disabled Option");
})

test("Forms => Form Layouts => Basic Form", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.onFormLayoutsPage().submitBasicFormEmailPasswordCheckbox("Basic.test.odro@gmai.com", "65dfdsfs46", true);
})