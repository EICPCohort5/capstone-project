//Mocha
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
let before = mocha.before;
let after = mocha.after;

//Chai
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;

//Puppeteer
const puppeteer = require('puppeteer');


describe('Add Customers Page - IT', function(){
    let browser;
    let managePageBefore;
    let customerCount;
    let addPage;
    let managePageAfter;
    let loginPage;

    //Utilize puppeteer to launch the browser and create two new pages
    before(async function(){
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });
    })

    after(async function() {
        await browser.close();
    })

    /*
    TEST TYPE: Integration Test
    DEVELOPER: Maria Ringes
    DATE: Mar 27 8:00p.m. EST
    STEPS TESTED:
        1. Go to manage customers and get current customer count
        2. Add a customer
        3. Ensure the customer count is one more than it was before adding the customer
            *Customer count = number of table rows on manageCustomer page
            **Include pagination? Test should fail
    */
    it("IT: Adding a customer increases length of table on manageCustomers page by 1", async function(){

        //get past login page 
        loginPage = await browser.newPage();
        await loginPage.goto('https://officialstonecap.azurewebsites.net/login');
        await loginPage.type('#username', "cohort5");
        await loginPage.type('#exampleInputPassword1', "test");
        await loginPage.click('div > div > form > button');
        await loginPage.waitForNavigation();


        //Get customer count
        managePageBefore = await browser.newPage();
        await managePageBefore.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await managePageBefore.waitForSelector('#app > table > tbody > tr');
        customerCount = await managePageBefore.$eval('#app > table > tbody', ele => ele.rows.length);

        //Add customer
        addPage = await browser.newPage();
        await addPage.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        await addPage.waitForSelector('#app > #app');
        await addPage.type('#firstName', 'Maria');
        await addPage.type('#middleName', 'Alexis');
        await addPage.type('#lastName', 'Ringes');
        await addPage.type('#phone', '2034917089');
        await addPage.type('#email', 'maria_ringes@tjx.com');
        await addPage.type('#address', '300 Value Way')
        await addPage.type('#city', 'Marlborough');
        await addPage.type('#region', 'MA');
        await addPage.select('#inlineFormCustomSelect', 'United States');
        await addPage.type('#zip', '01752');
        // await addPage.waitForTimeout(3000);
        await addPage.click('form > div.col-auto.g-10.d-flex.justify-content-center > input');
        
        //Get customer count after
        managePageAfter = await browser.newPage();
        await managePageAfter.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await managePageAfter.waitForSelector('#app > table > tbody > tr');
        let newCustomerCount = await managePageAfter.$eval('#app > table > tbody', ele => ele.rows.length);
        expect(newCustomerCount).to.equal(customerCount+1);
    }).timeout(10000);
})