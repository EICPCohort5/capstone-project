//Mocha
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
//Chai
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;
//Puppeteer
const puppeteer = require('puppeteer');

describe('Dashboard - UT', function(){
    let browser;
    before(async function(){browser = await puppeteer.launch(
        {
            headless: false, 
            defaultViewport: null,
            // slowMo: 50,
        });
    })
    after(async function() {await browser.close();})
        
    /*
    TEST TYPE: Unit Test
    DEVELOPER: Maria Ringes
    PURPOSE: Ensure the quick links on the home page work
    */
    it("FE UT: Quick Link - Create Customer correct redirect", async function(){
        page = await browser.newPage();
         
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/');
        await page.waitForSelector('#app > div > div > div > div.d-flex.flex-column.flex-wrap.box.flex-fill.mb-5 > div.d-flex.flex-column > div:nth-child(1) > a:nth-child(1) > button', {visible: true});
        await page.click('#app > div > div > div > div.d-flex.flex-column.flex-wrap.box.flex-fill.mb-5 > div.d-flex.flex-column > div:nth-child(1) > a:nth-child(1) > button');
        await page.waitForSelector('#app > div > div > div > h1', {visible:true});
        let header = await page.$eval('#app > div > div > div > h1', ele => ele.textContent);
        await page.close();
        expect(header).to.include("Create new Customer");
    })
    it("FE UT: Quick Link - Manage Customer correct redirect", async function(){
        page = await browser.newPage();
         
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/');
        await page.waitForSelector('#app > div > div > div > div.d-flex.flex-column.flex-wrap.box.flex-fill.mb-5 > div.d-flex.flex-column > div:nth-child(1) > a:nth-child(2) > button', {visible: true});
        await page.click('#app > div > div > div > div.d-flex.flex-column.flex-wrap.box.flex-fill.mb-5 > div.d-flex.flex-column > div:nth-child(1) > a:nth-child(2) > button');
        await page.waitForSelector('#app > div > div > div > h1', {visible:true});
        let header = await page.$eval('#app > div > div > div > h1', ele => ele.textContent);
        await page.close();
        expect(header).to.include("Manage Customers");
    })
    it("FE UT: Quick Link - Create Order correct redirect", async function(){
        page = await browser.newPage();
         
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/');
        await page.waitForSelector('#app > div > div > div > div.d-flex.flex-column.flex-wrap.box.flex-fill.mb-5 > div.d-flex.flex-column > div:nth-child(2) > a:nth-child(1) > button', {visible: true});
        await page.click('#app > div > div > div > div.d-flex.flex-column.flex-wrap.box.flex-fill.mb-5 > div.d-flex.flex-column > div:nth-child(2) > a:nth-child(1) > button');
        await page.waitForSelector('#app > div > div > div > h1', {visible:true});
        let header = await page.$eval('#app > div > div > div > h1', ele => ele.textContent);
        await page.close();
        expect(header).to.include("Create new Order");
    })
    it("FE UT: Quick Link - Manage Orders correct redirect", async function(){
        page = await browser.newPage();
         
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/');
        await page.waitForSelector('#app > div > div > div > div.d-flex.flex-column.flex-wrap.box.flex-fill.mb-5 > div.d-flex.flex-column > div:nth-child(2) > a:nth-child(2) > button', {visible: true});
        await page.click('#app > div > div > div > div.d-flex.flex-column.flex-wrap.box.flex-fill.mb-5 > div.d-flex.flex-column > div:nth-child(2) > a:nth-child(2) > button');
        await page.waitForSelector('#app > div > div > div > h1', {visible:true});
        let header = await page.$eval('#app > div > div > div > h1', ele => ele.textContent);
        await page.close();
        expect(header).to.include("Manage Orders");
    })
})

describe('Manage Customers Page - IT', function(){
    let browser;
    let page;
    let loginPage; 

    before(async function(){browser = await puppeteer.launch(
        {
            headless: false, 
            defaultViewport: null,
            // slowMo: 50,
        });
    })
    after(async function() {await browser.close();})
        
    /*
    TEST TYPE: Unit Test (Front End)
    DEVELOPER: Maria Ringes
    DATE: Mar 25 3:00p.m. EST
    PURPOSE: Ensure the create customer button redirects you to the create customer page
    */
    it("FE UT: Create Customer button redirects to correct page", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        await page.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await page.waitForSelector('#app > div > div > table');
        await page.$eval('#app > div > div > div.input-group.rounded.container.mt-5 > button', ele => ele.click());
        await page.waitForSelector('#app > div > div > div > h1');
        const pageHeader = await page.$eval('#app > div > div > div > h1', ele=>ele.textContent);
        await page.close();
        expect(pageHeader).to.include("Create new Customer");
    })
    it("IT: Making sure results with added search filter work for firstName", async function(){ 
        loginPage = await browser.newPage();
        await loginPage.goto('https://officialstonecap.azurewebsites.net/login');
        await loginPage.type('#username', "cohort5");
        await loginPage.type('#exampleInputPassword1', "test");
        await loginPage.click('div > div > form > button');
        await loginPage.waitForNavigation();
        managePage = await browser.newPage();
        await managePage.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await managePage.type('div > input', "ie");
        await managePage.click('#search-dropdown');
        await managePage.select('select#searchBy', 'firstName'); 
        let customerCount = await managePage.$eval('#app > div > div > table > tbody', ele => ele.rows.length);
        for (let i = 0; i < customerCount; i++) {
            let customer = await managePage.$eval(`#app > div > div > table > tbody > tr:nth-child(${i+1}) > th`, ele => ele.textContent);
            expect(customer.toLowerCase()).to.include("ie");
        }
    })
    it("IT: Making sure results with added search filter work for lastName", async function(){
        managePage = await browser.newPage();
        await managePage.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await managePage.type('div > input', "t");
        await managePage.click('#search-dropdown');
        await managePage.select('select#searchBy', 'lastName'); 
        let customerCount = await managePage.$eval('#app > div > div > table > tbody', ele => ele.rows.length);
        for (let i = 0; i < customerCount; i++) {
            let customer = await managePage.$eval(`#app > div > div > table > tbody > tr:nth-child(${i+1}) > th`, ele => ele.textContent);
            expect(customer.toLowerCase()).to.include("t");
        }
    })
        
    it("IT: Making sure results with added search filter work for address", async function(){
        managePage = await browser.newPage();
        await managePage.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await managePage.type('div > input', "sa");
        await managePage.click('#search-dropdown');
        await managePage.select('select#searchBy', 'address'); 
        let customerCount = await managePage.$eval('#app > div > div > table > tbody', ele => ele.rows.length);
        for (let i = 0; i < customerCount; i++) {
            let customer = await managePage.$eval(`#app > div > div > table > tbody > tr:nth-child(${i+1}) > td:nth-child(2)`, ele => ele.textContent);
            expect(customer.toLowerCase()).to.include("sa");
        }
    })
    it("IT: Making sure results with added search filter work for phone", async function(){
        managePage = await browser.newPage();
        await managePage.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await managePage.type('div > input', "abc");
        await managePage.click('#search-dropdown');
        await managePage.select('select#searchBy', 'phone');
        let customerCount = await managePage.$eval('#app > div > div > table > tbody', ele => ele.rows.length); 
        for (let i = 0; i < customerCount; i++) {
            let customer = await managePage.$eval(`#app > div > div > table > tbody > tr:nth-child(${i+1}) > td:nth-child(3)`, ele => ele.textContent);
            expect(customer.toLowerCase()).to.include("abc");
        }
    }) 
    it("IT: Making sure results with added search filter work for email", async function(){
        managePage = await browser.newPage();
        await managePage.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await managePage.type('div > input', "@");
        await managePage.click('#search-dropdown');
        await managePage.select('select#searchBy', 'email'); 
        let customerCount = await managePage.$eval('#app > div > div > table > tbody', ele => ele.rows.length); 
        for (let i = 0; i < customerCount; i++) {
            let customer = await managePage.$eval(`#app > div > div > table > tbody > tr:nth-child(${i+1}) > td:nth-child(4)`, ele => ele.textContent);
            expect(customer.toLowerCase()).to.include("@");
        }
    })
})

describe('Add Customers Page - IT', function(){
    let browser;
    let page;
    let loginPage;

    before(async function(){browser = await puppeteer.launch(
        {
            headless: false, 
            defaultViewport: null,
            //slowMo: 10,
        });
    })
    after(async function() {await browser.close();})
    it("FE UT: Adding a customer shows success alert", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        await page.waitForSelector("#app > div > div > form");
        await page.type('#firstName', 'Maria');
        await page.type('#middleName', 'A');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '2034917089');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '300 Value Way');
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        try {
            await page.click('#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input');
            await page.waitForSelector('#app > div > div > div.alert.alert-success');
            const successAlert =  await page.$eval('#app > div > div > div.alert.alert-success', ele => ele.textContent);
            expect(successAlert).to.include('Customer has been created!');
        } catch{
            expect.fail("Success alert not found.");
        }
    })

    // it("FE UT: Adding long will error", async function(){
    //     page = await browser.newPage();
    //     await page.goto('https://officialstonecap.azurewebsites.net/login');
    //     await page.type('#username', 'cohort5');
    //     await page.type('#exampleInputPassword1', 'test');
    //     await page.click('#app > div > div > div > div > div > form > button');
    //     await page.waitForNavigation({waitUntil: 'networkidle2'});
    //     await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
    //     await page.waitForSelector("#app > div > div > form");
    //     await page.type('#firstName', 'MariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMariaMaria');
    //     await page.type('#middleName', 'A');
    //     await page.type('#lastName', 'Ringes');
    //     await page.type('#phone', '2034917089');
    //     await page.type('#email', 'maria_ringes@tjx.com');
    //     await page.type('#address', '300 Value Way');
    //     await page.type('#city', 'Marlborough');
    //     await page.type('#region', 'MA');
    //     await page.select('#inlineFormCustomSelect', 'United States');
    //     await page.type('#zip', '01752');
    //     await page.click('#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input');
    // })
    it("FE UT: firstname with numbers", async function(){
        loginPage = await browser.newPage();
        await loginPage.goto('https://officialstonecap.azurewebsites.net/login');
        await loginPage.type('#username', "cohort5");
        await loginPage.type('#exampleInputPassword1', "test");
        await loginPage.click('div > div > form > button');
        await loginPage.waitForNavigation();
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('First Name has Numbers!');
            await dialog.accept()
        });
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.type('#firstName', '1');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '2034917089');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '300 Value Way')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
    })

    it("FE UT: middlename with numbers", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Middle Name has Numbers!');
            await dialog.accept()
        });
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', '1');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '2034917089');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '300 Value Way')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
    })

    it("FE UT: lastname with numbers", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Last Name has Numbers!');
            await dialog.accept()
        });
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'def');
        await page.type('#lastName', '1');
        await page.type('#phone', '2034917089');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '300 Value Way')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
    })

    it("FE UT: Attempt to add customer with all empty fields", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
    })

    it("FE UT: Attempt to enter firstname with special characters", async function(){
        let button = false;
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
            button = true;
        });
        await page.type('#firstName', '!@#');
        await page.type('#middleName', 'def');
        await page.type('#lastName', 'abc');
        await page.type('#phone', '2034917089');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '300 Value Way')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
        expect(button).equal(true);
    })

    it("FE UT: Attempt to submit phoneNumber with alphabetic characters", async function(){
        loginPage = await browser.newPage();
        await loginPage.goto('https://officialstonecap.azurewebsites.net/login');
        await loginPage.type('#username', "cohort5");
        await loginPage.type('#exampleInputPassword1', "test");
        await loginPage.click('div > div > form > button');
        await loginPage.waitForNavigation();
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Please Enter a Valid Phone Number');
            await dialog.accept()
        });
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', 'abcd');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '300 Value Way')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
    })

    it("FE UT: Attempt to submit phoneNumber with special characters", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Please Enter a Valid Phone Number');
            await dialog.accept()
        });
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '!@#');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '300 Value Way')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
    })

    it("FE UT: Attempt to submit address with special characters", async function(){
        loginPage = await browser.newPage();
        await loginPage.goto('https://officialstonecap.azurewebsites.net/login');
        await loginPage.type('#username', "cohort5");
        await loginPage.type('#exampleInputPassword1', "test");
        await loginPage.click('div > div > form > button');
        await loginPage.waitForNavigation();
        let button = false;
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
            button = true
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '1');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '!@#')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
        expect(button).equal(true);
    })

    it("FE UT: Attempt to submit city with special characters", async function(){
        let button = false;
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
            button = true
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '1');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '123 address')
        await page.type('#city', '!@#');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
        expect(button).equal(true);
    })

    it("FE UT: Attempt to submit region with special characters", async function(){
        let button = false;
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
            button = true
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '1');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '123 address')
        await page.type('#city', 'sauga');
        await page.type('#region', '!@#');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
        expect(button).equal(true);
    })

    it("FE UT: Attempt to submit zip with special characters", async function(){
        let button = false;
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
            button = true
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '1');
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.type('#address', '123 address')
        await page.type('#city', 'sauga');
        await page.type('#region', 'ON');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '!@#');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
        expect(button).equal(true);
    })

    it("FE UT: Attempt to submit email without '@'", async function(){
        loginPage = await browser.newPage();
        await loginPage.goto('https://officialstonecap.azurewebsites.net/login');
        await loginPage.type('#username', "cohort5");
        await loginPage.type('#exampleInputPassword1', "test");
        await loginPage.click('div > div > form > button');
        await loginPage.waitForNavigation();
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Please Enter a Valid Email');
            await dialog.accept()
        });
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '1');
        await page.type('#email', 'maria_ringestjx.com');
        await page.type('#address', '123 address')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
    })

    it("FE UT: Attempt to submit email without '.'", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Please Enter a Valid Email');
            await dialog.accept()
        });
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '1');
        await page.type('#email', 'maria_ringes@tjxcom');
        await page.type('#address', '123 address')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
        await page.close();
    })

    it("FE UT: Attempt to submit email with '@.' together", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Please Enter a Valid Email');
            await dialog.accept()
        });
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '1');
        await page.type('#email', 'maria_ringes@.com');
        await page.type('#address', '123 address')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
    })

    it("FE UT: Attempt to submit email with nothing before '@'", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Please Enter a Valid Email');
            await dialog.accept()
        });
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '1');
        await page.type('#email', '@123.com');
        await page.type('#address', '123 address')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
    })

    it("FE UT: email with nothing after '.'", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Please Enter a Valid Email');
            await dialog.accept()
        });
        page.on('dialog', async dialog => {
            expect(dialog.message()).to.include('Input Validation Failed');
            await dialog.accept()
        });
        await page.type('#firstName', 'abc');
        await page.type('#middleName', 'Alexis');
        await page.type('#lastName', 'Ringes');
        await page.type('#phone', '1');
        await page.type('#email', '123@123.');
        await page.type('#address', '123 address')
        await page.type('#city', 'Marlborough');
        await page.type('#region', 'MA');
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.type('#zip', '01752');
        await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());
    })
})

describe('Edit Customers Page - IT', function(){
    let browser;
    let page;
    before(async function(){browser = await puppeteer.launch(
        {
            headless: false, 
            defaultViewport: null,
            // slowMo: 150,
        });
    })
    after(async function() {await browser.close();})
        
    it("IT: Edit Customer shows success alert", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        await page.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await page.waitForSelector('#app > div > div > table > tbody > tr > th');
        await page.click('#app > div > div > table > tbody > tr:nth-child(1) > th > a'); 
        await page.waitForSelector('#editCustomerButton');
        await page.click('#editCustomerButton');
        await page.waitForSelector('#lastName', {visible: true});
        await page.waitForFunction('document.getElementById("lastName").value != ""');
        await page.type('#lastName', 's'); 
        await page.click('#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input'); 
        await page.waitForSelector('#app > div > div > div.alert.alert-success');
        const successAlert =  await page.$eval('#app > div > div > div.alert.alert-success', ele => ele.textContent);
        expect(successAlert).to.include('Success! Customer has been updated!');
    })
    it("IT: Edit customer shows updated value in customer detail", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        await page.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await page.waitForSelector('#app > div > div > table > tbody > tr > th');
        let customerName = await page.$eval('#app > div > div > table > tbody > tr:nth-child(2) > th', ele => ele.textContent);
        await page.click('#app > div > div > table > tbody > tr:nth-child(2) > th > a');
        await page.waitForSelector('#editCustomerButton');
        await page.click('#editCustomerButton');
        await page.waitForSelector('#lastName', {visible: true});
        await page.waitForFunction('document.getElementById("lastName").value != ""');
        await page.type('#lastName', 's'); 
        await page.click('#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input'); 
        await page.click('#backButton');
        await page.waitForSelector('#lastName', {visible: true});
        await page.waitForFunction('document.getElementById("lastName").value != ""');
        let firstName = await page.$eval('#firstName', ele=>ele.value);
        let lastName = await page.$eval('#lastName', ele=>ele.value);
        let fullName = `${firstName} ${lastName}`;
        let expectedCustomerName = `${customerName}s`;
        expect(expectedCustomerName).to.equal(fullName);
    }) 
    it("IT: Edit customer shows updated value in manage customer", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        await page.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await page.waitForSelector('#app > div > div > table > tbody > tr > th');
        let customerName = await page.$eval('#app > div > div > table > tbody > tr:nth-child(2) > th', ele => ele.textContent);
        await page.click('#app > div > div > table > tbody > tr:nth-child(2) > th > a');
        await page.waitForSelector('#editCustomerButton');
        await page.click('#editCustomerButton');
        await page.waitForSelector('#lastName', {visible: true});
        await page.waitForFunction('document.getElementById("lastName").value != ""');
        await page.type('#lastName', 's');
        await page.click('#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input');
        await page.waitForSelector('#app > div > div > div.alert.alert-success');
        await page.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await page.waitForSelector('#app > div > div > table > tbody > tr > th');
        let updatedCustomerName = await page.$eval('#app > div > div > table > tbody > tr:nth-child(2) > th', ele => ele.textContent);
        expect(customerName.length).to.equal(updatedCustomerName.length - 1);
    }) 
})

describe('Create New Order - IT', function(){
    let browser;
    before(async function(){browser = await puppeteer.launch(
        {
            headless: false, 
            defaultViewport: null,
            slowMo: 100,
        });
    })
    after(async function() {await browser.close();})
    it("IT: createNewOrder displays correct product name from one added product", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5');
        let productName = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5', ele => ele.textContent);
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr');
        let tableProductName = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr > td:nth-child(2)', ele => ele.textContent);
        await page.close()
        expect(tableProductName).to.equal(productName);
    })
    it("IT: createNewOrder displays correct product price from one added product", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5');
        let productPrice = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > p:nth-child(3)', ele => ele.textContent);
        numericProductPrice =  productPrice.match(/\d+(?:\.\d+)?/g)[0]
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr');
        let tableProductPrice = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr > td:nth-child(4)', ele => ele.textContent);
        tableProductPrice = tableProductPrice.replace('$', '');
        await page.close()
        expect(tableProductPrice).to.equal(numericProductPrice);
    })
    it("IT: createNewOrder displays correct product SKU from one added product", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > h5');
        let productSKU = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > p:nth-child(5)', ele => ele.textContent);
        numericProductSKU = productSKU.replace(/\D/g,'');
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr > td');
        let tableProductSKU = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(1) > td:nth-child(1)', ele => ele.textContent);
        await page.close()
        expect(tableProductSKU).to.equal(numericProductSKU);
    })
    it("IT: createNewOrder displays correct product names from two added products (added at same time)", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5');
        let firstProductName = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5', ele => ele.textContent);
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5');
        let secondProductName = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5', ele => ele.textContent);
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr');
        let tableFirstProductName = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(1) > td:nth-child(2)', ele => ele.textContent);
        let tableSecondProductName = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(2) > td:nth-child(2)', ele => ele.textContent);
        await page.close()
        expect(tableFirstProductName).to.equal(firstProductName);
        expect(tableSecondProductName).to.equal(secondProductName);
    })
    it("IT: createNewOrder displays correct product names from two added products (added one after another)", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5');
        let firstProductName = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5', ele => ele.textContent);
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop");
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5');
        let secondProductName = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5', ele => ele.textContent);
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr');
        let tableFirstProductName = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(1) > td:nth-child(2)', ele => ele.textContent);
        let tableSecondProductName = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(2) > td:nth-child(2)', ele => ele.textContent);
        await page.close()
        expect(tableFirstProductName).to.equal(firstProductName);
        expect(tableSecondProductName).to.equal(secondProductName);
    })
    it("IT: createNewOrder displays correct order total with multiple (3) products (added at different times)", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5');
        let firstProductPrice = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > p:nth-child(3)', ele => ele.textContent);
        let numberStringFirstProductPrice =  firstProductPrice.match(/\d+(?:\.\d+)?/g)[0]
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5');
        let secondProductPrice = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > p:nth-child(3)', ele => ele.textContent);
        let numberStringSecondProductPrice = secondProductPrice.match(/\d+(?:\.\d+)?/g)[0]
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > h5');
        let thirdProductPrice = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > p:nth-child(3)', ele => ele.textContent);
        let numberStringThirdProductPrice = thirdProductPrice.match(/\d+(?:\.\d+)?/g)[0]
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        let numericFirstProductPrice = parseFloat(numberStringFirstProductPrice);
        let numericSecondProductPrice = parseFloat(numberStringSecondProductPrice);
        let numericThirdProductPrice = parseFloat(numberStringThirdProductPrice);
        let expectedOrderTotal = numericFirstProductPrice + numericSecondProductPrice + numericThirdProductPrice;
        expectedOrderTotal = Math.round((expectedOrderTotal + Number.EPSILON) * 100) / 100
        await page.waitForSelector('#app > div > div > table.table.container.mt-1 > tbody > tr > td:nth-child(2)');
        let orderTotal = await page.$eval('#app > div > div > table.table.container.mt-1 > tbody > tr > td:nth-child(2)', ele => ele.textContent);
        orderTotal = orderTotal.replace('$', '');
        orderTotal = parseFloat(orderTotal);
        await page.close()
        expect(expectedOrderTotal).to.equal(orderTotal);
    })
    it("IT: createNewOrder displays correct order total after product has been removed", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button"); 
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button");
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        let orderTotal = await page.$eval('#app > div > div > table.table.container.mt-1 > tbody > tr > td:nth-child(2)', ele => ele.textContent);
        orderTotal = orderTotal.replace('$', '');
        orderTotal = parseFloat(orderTotal);
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        let removedItemPrice = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > p:nth-child(3)', ele => ele.textContent);
        let numberRemovedItemPrice = removedItemPrice.match(/\d+(?:\.\d+)?/g)[0]
        numberRemovedItemPrice = parseFloat(numberRemovedItemPrice);
        numberRemovedItemPrice = Math.round((numberRemovedItemPrice + Number.EPSILON) * 100) / 100
        await page.click('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > div > button');
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        let updatedOrderTotal = await page.$eval('#app > div > div > table.table.container.mt-1 > tbody > tr > td:nth-child(2)', ele => ele.textContent);
        updatedOrderTotal = updatedOrderTotal.match(/\d+(?:\.\d+)?/g)[0]
        updatedOrderTotal = parseFloat(updatedOrderTotal);
        updatedOrderTotal = Math.round((updatedOrderTotal + Number.EPSILON) * 100) / 100
        updatedOrderTotal = Math.round((updatedOrderTotal + Number.EPSILON) * 100) / 100
        let expectedUpdatedOrderTotal = orderTotal - numberRemovedItemPrice;
        expectedUpdatedOrderTotal = Math.round((expectedUpdatedOrderTotal + Number.EPSILON) * 100) / 100;
        await page.close()
        expect(expectedUpdatedOrderTotal).to.equal(updatedOrderTotal);
    })
    it("IT: createNewOrder displays correct products after product has been removed", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button");
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button");
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        let productsInOrder = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody', ele => ele.rows.length);
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        await page.click('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > div > button');
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        let newProductsInOrder = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody', ele => ele.rows.length);
        await page.close();
        expect(newProductsInOrder).to.equal(productsInOrder-1);
    })
})

describe('Manage Orders - IT', function(){
    let browser;
    before(async function(){browser = await puppeteer.launch(
        {
            headless: false, 
            defaultViewport: null,
            // slowMo: 50,
        });
    })
    after(async function() {await browser.close();})
    it("FE UT: Searching for specific order by Order ID should return correct orders in the table", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        await page.goto('https://officialstonecap.azurewebsites.net/manageOrders');
        await page.waitForSelector('input[type=search]');
        await page.type('input[type=search]', '5');
        let orderCount = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody', ele => ele.rows.length);
        for (let i = 0; i < orderCount; i++) {
            let tableOrderId = await page.$eval(`#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(${i+1}) > th`, ele => ele.textContent);
            expect(tableOrderId).to.include("5");
        }
        await page.close();
    })
    it("FE UT: Searching for specific order by Total Order Price should return correct orders in the table", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        await page.goto('https://officialstonecap.azurewebsites.net/manageOrders');
        await page.waitForSelector('input[type=search]');
        await page.type("select#searchBy", "totalOrderPrice")
        await page.type('input[type=search]', '96');
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr');
        let orderCount = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody', ele => ele.rows.length);
        for (let i = 0; i < orderCount; i++) {
            let tableOrderPrice = await page.$eval(`#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(${i+1}) > td:nth-child(5)`, ele => ele.textContent);
            expect(tableOrderPrice).to.include("96");
        }
        await page.close();
    })
    it("FE UT: Searching for specific order by date ordered should return correct Orders in the table", async function(){
        page = await browser.newPage();
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        await page.goto('https://officialstonecap.azurewebsites.net/manageOrders');
        await page.waitForSelector('input[type=search]');
        await page.type("select#searchBy", "datetimeOrderPlaced")
        await page.type('input[type=search]', '2021-03-02');
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr');
        let orderCount = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody', ele => ele.rows.length);
        for (let i = 0; i < orderCount; i++) {
            let tableOrderDate = await page.$eval(`#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(${i+1}) > td:nth-child(4)`, ele => ele.textContent);
            expect(tableOrderDate).to.equal("2021-03-02");
        }
        await page.close();
    })
})