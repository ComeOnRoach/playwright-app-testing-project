import { test, expect } from "@playwright/test"
import NavigationList from "../../page-objects/navigationList";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByRole("link", { name: 'Forms' }).click();
    await page.getByRole("link", { name: 'Form Layout' }).click();

})

test("Inline form", async ({ page }) => {
    const inlineForm = page.locator("nb-card", { hasText: "Inline form" });
    const name = "Oleks";
    const email = "test.oleks@gmail.com";
    const checkbox = inlineForm.getByText('Remember me');
    const button = inlineForm.getByRole("button");
    await inlineForm.getByPlaceholder("Jane Doe").fill(name);
    await inlineForm.getByPlaceholder("Email").fill(email);
    await checkbox.click();
    await button.click();

    const nameFieldValue = await inlineForm.getByPlaceholder("Jane Doe").inputValue();
    const emailFieldValue = await inlineForm.getByPlaceholder("Email").inputValue();


    expect(nameFieldValue).toEqual(name);
    expect(emailFieldValue).toEqual(email);
    await expect(checkbox).toBeChecked();
    await expect(inlineForm.locator("form")).toHaveClass(/ng-submitted/);
})

test("Using the Grid", async ({ page }) => {
    const usingTheGrid = page.locator('nb-card', { hasText: "Using the Grid" });
    const email = "oleks.using.the.grid@gmail.com";
    const password = "UsingTheGrid123";
    const radiosOne = "Option 1";
    const radiosTwo = "Option 2";
    const radiosDisabledOption = "Disabled Option";
    const button = "Sign in";

    await usingTheGrid.getByRole('textbox', { name: "Email" }).fill(email);
    await usingTheGrid.getByRole("textbox", { name: "Password" }).fill(password);
    await usingTheGrid.getByRole("radio", { name: radiosOne }).click({ force: true });
    await usingTheGrid.getByRole("button").click();

    const getEmailValue = await usingTheGrid.getByRole("textbox", { name: "Email" }).inputValue();
    const getPasswordValue = await usingTheGrid.getByRole("textbox", { name: "Password" }).inputValue();
    const radioBtnOneSelected = usingTheGrid.getByRole("radio", { name: radiosOne });
    const radioBtnTwo = await usingTheGrid.getByRole("radio", { name: radiosTwo }).isChecked();
    const radioBtnDisabledOption = await usingTheGrid.getByRole("radio", { name: radiosDisabledOption }).isChecked();
    const isClickedBtn = usingTheGrid.locator("form");

    expect(getEmailValue).toEqual(email);
    expect(getPasswordValue).toEqual(password);
    await expect(radioBtnOneSelected).toBeChecked();
    expect(radioBtnTwo).toBeFalsy();
    expect(radioBtnDisabledOption).toBeFalsy();
    await expect(isClickedBtn).toHaveClass("ng-untouched ng-pristine ng-valid ng-submitted");
})

test("Basic form", async ({ page }) => {
    const basicForm = page.locator("nb-card", { hasText: "Basic form" });
    const emailAddress = "basicForm.oleks@gmail.com";
    const password = "BasicForm123";

    await basicForm.getByRole("textbox", { name: "Email" }).fill(emailAddress);
    await basicForm.getByRole("textbox", { name: "Password" }).fill(password);
    await basicForm.getByRole("checkbox").check({ force: true });
    await basicForm.getByRole('button').click();

    const getEmailValue = await basicForm.getByRole("textbox", { name: "Email" }).inputValue();
    const getPasswordValue = await basicForm.getByRole("textbox", { name: "Password" }).inputValue();
    const checkbox = basicForm.getByRole("checkbox");
    const buttonSubmitted = basicForm.locator('form');

    expect(getEmailValue).toEqual(emailAddress);
    expect(getPasswordValue).toEqual(password);
    await expect(checkbox).toBeChecked();
    await expect(buttonSubmitted).toHaveClass(/ng-submitted/);
})

test("Form without labels", async ({ page }) => {
    const formWithoutLabels = page.locator("nb-card", { hasText: "Form without labels" });
    const recipients = "Oleks Recipient";
    const subject = "subject without labels";
    const message = `MindsEye, the Grand Theft Auto-esque story-driven action game led by former Rockstar Games producer Leslie Benzies, is arriving on June 10. Developed by Build A Rocket Boy Games, a new story trailer shows off the game’s setting, Redrock City, and provides a glimpse into the story and antagonists. 
Redrock City, a fictional desert metropolis ruled by AI, consumer-grade robots, and other cutting-edge technology, is the stage for protagonist Jacob Diaz. He’s a former soldier carrying the MindsEye, a neural implant plaguing him with mysterious memories from a life-changing mission. His fight to find the truth pits him against both the government and Big Tech, namely Redrock mayor Shiva Vega, who may be a little too eager to establish complete control in her city, and Marco Silva, an eccentric tech CEO with big plans for altering the course of human evolution. Check out the trailer below. `;

    await formWithoutLabels.scrollIntoViewIfNeeded();
    await formWithoutLabels.getByRole('textbox', { name: "Recipients" }).fill(recipients);
    await formWithoutLabels.getByRole('textbox', { name: "Subject" }).fill(subject);
    await formWithoutLabels.getByRole('textbox', { name: "Message" }).fill(message);
    await formWithoutLabels.getByRole('button').click();

    const recipientsInputValue = await formWithoutLabels.getByRole('textbox', { name: "Recipients" }).inputValue();
    const subjectInputValue = await formWithoutLabels.getByRole('textbox', { name: "Subject" }).inputValue();
    const messageInputValue = await formWithoutLabels.getByRole('textbox', { name: "Message" }).inputValue();
    const buttonSubmitted = formWithoutLabels.locator('form');

    expect(recipientsInputValue).toEqual(recipients);
    expect(subjectInputValue).toEqual(subject);
    expect(messageInputValue).toEqual(message);
    await expect(buttonSubmitted).toHaveClass(/ng-submitted/);
})

test("Block form", async ({ page }) => {
    const blockForm = page.locator("nb-card", { hasText: "Block form" });
    const firstName = "Oleks";
    const lastName = "Dro";
    const email = "block.form.oleks@gmail.com";
    const website = "https://www.linkedin.com/in/oleksandr-drozhcha-5ba665b5/";

    await blockForm.getByPlaceholder("First Name").fill(firstName);
    await blockForm.getByPlaceholder("Last Name").fill(lastName);
    await blockForm.getByPlaceholder("Email").fill(email);
    await blockForm.getByPlaceholder("Website").fill(website);
    await blockForm.getByText("Submit").click();

    const firstNameInputValue = await blockForm.getByPlaceholder("First Name").inputValue();
    const lastNameInputValue = await blockForm.getByPlaceholder("Last Name").inputValue();
    const emailInputValue = await blockForm.getByPlaceholder("Email").inputValue()
    const websiteInputValue = await blockForm.getByRole("textbox", { name: "Website" }).inputValue();
    const button = await blockForm.getByRole("button").textContent();

    expect(firstNameInputValue).toEqual(firstName);
    expect(lastNameInputValue).toEqual(lastName);
    expect(emailInputValue).toEqual(email);
    expect(websiteInputValue).toEqual(website);
    expect(button).toEqual("Submit");
})

test("Horizontal form", async ({ page }) => {
    const horizontalForm = page.locator("nb-card", { hasText: "Horizontal form" });
    const email = "horizontal.Form.oleks@gmail.com";
    const password = "horizontalForm1234"

    await horizontalForm.getByRole("textbox", { name: "Email" }).fill(email);
    await horizontalForm.getByRole("textbox", { name: "Password" }).fill(password);
    await horizontalForm.getByText("Remember me").check();
    await horizontalForm.getByRole('button').click();

    const emailInputValue = await horizontalForm.getByRole("textbox", { name: "Email" }).inputValue()
    const passwordInputValue = await horizontalForm.getByRole("textbox", { name: "Password" }).inputValue()
    const isCheckbox = await horizontalForm.getByRole("checkbox");
    const buttonSubmitted = horizontalForm.locator("form");

    expect(emailInputValue).toEqual(email);
    expect(passwordInputValue).toEqual(password);
    await expect(isCheckbox).toBeChecked();
    await expect(buttonSubmitted).toHaveClass(/ng-submitted/);
})

