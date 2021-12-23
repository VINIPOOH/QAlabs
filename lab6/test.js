const {test, expect} = require('@playwright/test');

class Login {
    constructor(page) {
        this.page = page;
    }

    async goOnPage() {
        await this.page.goto('https://www.demoblaze.com/');
    }

    async inputData() {

        // Click a:has-text("Log in")
        await this.page.click('a:has-text("Log in")');

        // Click text=Log in × Username: Password: Close Log in >> input[type="text"]
        await this.page.click('text=Log in × Username: Password: Close Log in >> input[type="text"]');

        // Fill text=Log in × Username: Password: Close Log in >> input[type="text"]
        await this.page.fill('text=Log in × Username: Password: Close Log in >> input[type="text"]', 'test@test.test');

        // Click text=Log in × Username: Password: Close Log in >> input[type="password"]
        await this.page.click('text=Log in × Username: Password: Close Log in >> input[type="password"]');

        // Fill text=Log in × Username: Password: Close Log in >> input[type="password"]
        await this.page.fill('text=Log in × Username: Password: Close Log in >> input[type="password"]', '123123123');
    }

    async chack() {
		// Click button:has-text("Log in")
		this.page.once('dialog', dialog => {
			console.log(`Dialog message: ${dialog.message()}`);
			dialog.dismiss().catch(() => {});
		});
		await this.page.click('button:has-text("Log in")');
    }

}

class Laptop {
    constructor(page) {
        this.page = page;
    }

    async goOnPage() {
        await this.page.goto('https://www.demoblaze.com/');
    }

    async inputData() {
// Click text=Laptops
        await this.page.click('text=Laptops');
        await expect(this.page).toHaveURL('https://www.demoblaze.com/#');

        // Click text=Sony vaio i5
        await this.page.click('text=Sony vaio i5');
        await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=8');
    }

    async chack() {
        // Click text=Add to cart
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {
            });
        });
        await this.page.click('text=Add to cart');
        await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=8#');
    }

}

class SignUp {
    constructor(page) {
        this.page = page;
    }

    async goOnPage() {
        await this.page.goto('https://www.demoblaze.com/');
    }

    async inputData() {
        // Click a:has-text("Sign up")
        await this.page.click('a:has-text("Sign up")');

        // Click text=Username: Password: >> input[type="text"]
        await this.page.click('text=Username: Password: >> input[type="text"]');

        // Fill text=Username: Password: >> input[type="text"]
        await this.page.fill('text=Username: Password: >> input[type="text"]', 'ivan_v1234@ur.net');

        // Click input[type="password"]
        await this.page.click('input[type="password"]');

        // Fill input[type="password"]
        await this.page.fill('input[type="password"]', '123123123');
    }

    async chack() {
        // Click button:has-text("Sign up")
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {
            });
        });
        await this.page.once('button:has-text("Sign up")');
    }

}

test('test', async ({page}) => {
    const login = new Login(page);
    await login.goOnPage();
    await login.inputData();
    await login.chack();

    const laptop = new Laptop(page);
    await laptop.goOnPage();
    await laptop.inputData();
    await laptop.chack();

    const signUp = new SignUp(page);
    await signUp.goOnPage();
    await signUp.inputData();
    //failed by task
    await signUp.chack();

});