import { test, expect } from "@playwright/test";
import PageManager from "../../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().toastrPage();
})

test.describe("Modal & Overlays => Toastr => Toaster configuration => Position button", () => {

    test("Toaster configuration => Position button => Top Left", async ({ page }) => {
        const topLeft = "top-left";
        const positionBtn = page.locator(".form-group", { hasText: "Position:" }).getByRole("button");
        const topLeftBtnLocator = page.locator("nb-option").getByText(topLeft);

        await positionBtn.click();
        await topLeftBtnLocator.click();
        await expect(positionBtn).toHaveText(topLeft);
    });

    test("Toaster configuration => Position button => Bottom Left", async ({ page }) => {
        const bottomLeft = "bottom-left";
        const positionBtn = page.locator(".form-group", { hasText: "Position:" }).getByRole("button");
        const bottomLeftBtnLocator = page.locator("nb-option").getByText(bottomLeft);

        await positionBtn.click();
        await bottomLeftBtnLocator.click();
        await expect(positionBtn).toHaveText(bottomLeft);
    });

    test("Toaster configuration => Position button => Bottom Right", async ({ page }) => {
        const bottomRight = "bottom-right";
        const positionBtn = page.locator(".form-group", { hasText: "Position:" }).getByRole("button");
        const bottomRightBtnLocator = page.locator("nb-option").getByText(bottomRight);

        await positionBtn.click();
        await bottomRightBtnLocator.click();
        await expect(positionBtn).toHaveText(bottomRight);
    });

    test("Toaster configuration => Position button => Top End", async ({ page }) => {
        const topEnd = "top-end";
        const positionBtn = page.locator(".form-group", { hasText: "Position:" }).getByRole("button");
        const topEndBtnLocator = page.locator("nb-option").getByText(topEnd);

        await positionBtn.click();
        await topEndBtnLocator.click();
        await expect(positionBtn).toHaveText(topEnd);
    });

    test("Toaster configuration => Position button => Top Start", async ({ page }) => {
        const topStart = "top-start";
        const positionBtn = page.locator(".form-group", { hasText: "Position:" }).getByRole("button");
        const topStartBtnLocator = page.locator("nb-option").getByText(topStart);

        await positionBtn.click();
        await topStartBtnLocator.click();
        await expect(positionBtn).toHaveText(topStart);
    });

    test("Toaster configuration => Position button => Bottom End", async ({ page }) => {
        const bottomEnd = "bottom-end";
        const positionBtn = page.locator(".form-group", { hasText: "Position:" }).getByRole("button");
        const bottomEndBtnLocator = page.locator("nb-option").getByText(bottomEnd);

        await positionBtn.click();
        await bottomEndBtnLocator.click();
        await expect(positionBtn).toHaveText(bottomEnd);
    });

    test("Toaster configuration => Position button => Bottom Start", async ({ page }) => {
        const bottomStart = "bottom-start";
        const positionBtn = page.locator(".form-group", { hasText: "Position:" }).getByRole("button");
        const bottomStartBtnLocator = page.locator("nb-option").getByText(bottomStart);

        await positionBtn.click();
        await bottomStartBtnLocator.click();
        await expect(positionBtn).toHaveText(bottomStart);
    });

    test("Toaster configuration => Position button => Top Right", async ({ page }) => {
        const topRight = "top-right";
        const positionBtn = page.locator(".form-group", { hasText: "Position:" }).getByRole("button");
        const topRightBtnLocator = page.locator("nb-option").getByText(topRight);

        await positionBtn.click();
        await topRightBtnLocator.click();
        await expect(positionBtn).toHaveText(topRight);
    });
})

test.describe("Modal & Overlays => Toastr => Toaster configuration => Toast Type button", () => {

    test("Modal & Overlays => Toastr => Toaster configuration => Toast Type Value", async({page}) => {
        const toastTypeName = "Toast type:"
        const toastTypeValue = page.locator( "label", {hasText: "Toast type:"});
        await expect(toastTypeValue).toHaveText(toastTypeName);
    })

    test("Toaster configuration => Toast Type button => Success", async ({ page }) => {
        const successBtn = "success";
        const btnLocation = page.locator(".form-group", { hasText: "Toast type"}).getByRole("button");
        const menuOption = page.locator("nb-option", { hasText: successBtn });

        await btnLocation.click();
        await menuOption.click();
        await expect(btnLocation).toHaveText(successBtn);
    });

    test("Toaster configuration => Toast Type button => Info", async ({ page }) => {
        const infoBtn = "info";
        const btnLocation = page.locator(".form-group", { hasText: "Toast type" }).getByRole("button");
        const menuOption = page.locator("nb-option", { hasText: infoBtn });

        await btnLocation.click();
        await menuOption.click();
        await expect(btnLocation).toHaveText(infoBtn);
    });

    test("Toaster configuration => Toast Type button => Warning", async ({ page }) => {
        const warningBtn = "warning";
        const btnLocation = page.locator(".form-group", { hasText: "Toast type" }).getByRole("button");
        const menuOption = page.locator("nb-option", { hasText: warningBtn });

        await btnLocation.click();
        await menuOption.click();
        await expect(btnLocation).toHaveText(warningBtn);
    });

    test("Toaster configuration => Toast Type button => Danger", async ({ page }) => {
        const dangerBtn = "danger";
        const btnLocation = page.locator(".form-group", { hasText: "Toast type" }).getByRole("button");
        const menuOption = page.locator("nb-option", { hasText: dangerBtn });

        await btnLocation.click();
        await menuOption.click();
        await expect(btnLocation).toHaveText(dangerBtn);
    });

    test("Toaster configuration => Toast Type button => Primary", async ({ page }) => {
        const primaryBtn = "primary";
        const dangerBtn = "danger";
        const btnLocation = page.locator(".form-group", { hasText: "Toast type" }).getByRole("button");
        const menuOptionDanger = page.locator("nb-option", { hasText: dangerBtn });
        const menuOptionPrimary = page.locator("nb-option", { hasText: primaryBtn });

        await btnLocation.click();
        await menuOptionDanger.click();
        await btnLocation.click();
        await menuOptionPrimary.click();
        await expect(btnLocation).toHaveText(primaryBtn);
    });

})

test.describe("Modal & Overlays => Toastr => Toaster configuration => 'Title', 'Content', 'Time to hide toast' fields", ()=>{
    test("Title field", async ({page}) => {
        const emptyInputValue = "";
        const filledInputValue = "oleks.test@$#@$$@$Test";
        const titleField = page.locator(".form-group", {hasText: "Title"});

        await titleField.getByRole('textbox').clear();
        let titleInputValue = await titleField.getByRole('textbox').inputValue();
        expect(titleInputValue).toEqual(emptyInputValue);

        await titleField.getByRole('textbox').fill(filledInputValue);
        titleInputValue = await titleField.getByRole('textbox').inputValue();
        expect(titleInputValue).toEqual(filledInputValue);

    }) 

    test("Content field", async ({ page }) => {
        const emptyInputValue = "";
        const filledInputValue = "Cool test QA :)";
        const titleField = page.locator(".form-group", { hasText: "Content" });

        await titleField.getByRole('textbox').clear();
        let titleInputValue = await titleField.getByRole('textbox').inputValue();
        expect(titleInputValue).toEqual(emptyInputValue);

        await titleField.getByRole('textbox').fill(filledInputValue);
        titleInputValue = await titleField.getByRole('textbox').inputValue();
        expect(titleInputValue).toEqual(filledInputValue);

    }) 

    test("Time to hide toast", async ({ page }) => {
        const emptyInputValue = "";
        const toastTimeDelay = "15000";
        const fieldName = "Time to hide toast, ms. 0 to persistent toast:";
        const titleField = page.locator(".form-group", { hasText: "Time to hide toast" });

        await expect(titleField).toHaveText(fieldName);
        await titleField.getByRole('spinbutton').clear();
        let titleInputValue = await titleField.getByRole('spinbutton').inputValue();
        expect(titleInputValue).toEqual(emptyInputValue);

        await titleField.getByRole('spinbutton').fill(toastTimeDelay);
        titleInputValue = await titleField.getByRole('spinbutton').inputValue();
        expect(titleInputValue).toEqual(toastTimeDelay);

    }) 

})

test.describe("Modal & Overlays => Toastr => Toaster configuration => Checkboxes", () => {

    test("Modal & Overlays => Toastr => Toaster configuration => Hide on click - unchecked", async ({page}) => {
        const hideOnClickCheckbox = page.getByRole("checkbox", { name: "Hide on click"});

        await hideOnClickCheckbox.uncheck({force: true});
        await expect(hideOnClickCheckbox).not.toBeChecked();
    })

    test("Modal & Overlays => Toastr => Toaster configuration => Hide on click - checked", async ({ page }) => {
        const hideOnClickCheckbox = page.getByRole("checkbox", { name: "Hide on click" });

        await hideOnClickCheckbox.check({ force: true });
        await expect(hideOnClickCheckbox).toBeChecked();
    })

    test("Modal & Overlays => Toastr => Toaster configuration => Prevent arising of duplicate toast - unchecked", async ({ page }) => {
        const preventArisingOfDuplicate = page.getByRole("checkbox", { name: "Prevent arising of duplicate toast" });

        await preventArisingOfDuplicate.uncheck({ force: true });
        await expect(preventArisingOfDuplicate).not.toBeChecked();
    })

    test("Modal & Overlays => Toastr => Toaster configuration => Prevent arising of duplicate toast - checked", async ({ page }) => {
        const preventArisingOfDuplicate = page.getByRole("checkbox", { name: "Prevent arising of duplicate toast" });

        await preventArisingOfDuplicate.check({ force: true });
        await expect(preventArisingOfDuplicate).toBeChecked();
    })

    test("Modal & Overlays => Toastr => Toaster configuration => Show toast with icon - unchecked", async ({ page }) => {
        const showToastWithIcon = page.getByRole("checkbox", { name: "Show toast with icon" });

        await showToastWithIcon.uncheck({ force: true });
        await expect(showToastWithIcon).not.toBeChecked();
    })

    test("Modal & Overlays => Toastr => Toaster configuration => Show toast with icon - checked", async ({ page }) => {
        const showToastWithIcon = page.getByRole("checkbox", { name: "Show toast with icon" });

        await showToastWithIcon.check({ force: true });
        await expect(showToastWithIcon).toBeChecked();
    })


})