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
        //Login to Authenticate
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
        //Login to Authenticate
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
        //Login to Authenticate
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
        //Login to Authenticate
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
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await page.waitForSelector('#app > div > div > table');
        await page.$eval('#app > div > div > div.input-group.rounded.container.mt-5 > button', ele => ele.click());
        await page.waitForSelector('#app > div > div > div > h1');
        const pageHeader = await page.$eval('#app > div > div > div > h1', ele=>ele.textContent);
        await page.close();
        expect(pageHeader).to.include("Create new Customer");
    })
})

describe('Add Customers Page - IT', function(){
    let browser;
    before(async function(){browser = await puppeteer.launch(
        {
            headless: false, 
            defaultViewport: null,
            slowMo: 10,
        });
    })
    after(async function() {await browser.close();})
    /*
    TEST TYPE: Unit Test (Front End)
    DEVELOPER: Maria Ringes
    PURPOSE: Adding a customer shows a success alert with valid data
    */
    // it("FE UT: Adding a customer shows success alert", async function(){
    //     page = await browser.newPage();
    //     //Login to Authenticate
    //     await page.goto('https://officialstonecap.azurewebsites.net/login');
    //     await page.type('#username', 'cohort5');
    //     await page.type('#exampleInputPassword1', 'test');
    //     await page.click('#app > div > div > div > div > div > form > button');
    //     await page.waitForNavigation({waitUntil: 'networkidle2'});
    //     //End Login Authentication
    //     await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
    //     await page.waitForSelector("#app > div > div > form");
    //     //Enter information for added customer
    //     await page.type('#firstName', 'Maria');
    //     await page.type('#middleName', 'A');
    //     await page.type('#lastName', 'Ringes');
    //     await page.type('#phone', '2034917089');
    //     await page.type('#email', 'maria_ringes@tjx.com');
    //     await page.type('#address', '300 Value Way');
    //     await page.type('#city', 'Marlborough');
    //     await page.type('#region', 'MA');
    //     await page.select('#inlineFormCustomSelect', 'United States');
    //     await page.type('#zip', '01752');
    //     //Submit Form
    //     await page.click('#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input');
    //     //Wait for Success Alert
    //     try {
    //         await page.waitForSelector('#app > div > div > div.alert.alert-success');
    //         const successAlert =  await page.$eval('#app > div > div > div.alert.alert-success', ele => ele.textContent);
    //         expect(successAlert).to.include('Customer has been created!');
    //     } catch{
    //         expect.fail("Success alert not found.");
    //     }
    // })

    // it("FE UT: Adding long will error", async function(){
    //     page = await browser.newPage();
    //     //Login to Authenticate
    //     await page.goto('https://officialstonecap.azurewebsites.net/login');
    //     await page.type('#username', 'cohort5');
    //     await page.type('#exampleInputPassword1', 'test');
    //     await page.click('#app > div > div > div > div > div > form > button');
    //     await page.waitForNavigation({waitUntil: 'networkidle2'});
    //     //End Login Authentication
    //     await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
    //     await page.waitForSelector("#app > div > div > form");
    //     //Enter information for added customer
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
    //     //Submit Form
    //     await page.click('#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input');
    // })
})

describe('Edit Customers Page - IT', function(){
    let browser;
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
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await page.waitForSelector('#app > div > div > table > tbody > tr > th');
        await page.click('#app > div > div > table > tbody > tr:nth-child(2) > th > a'); //click on the customer to get to detail page
        await page.waitForSelector('#editCustomerButton > a');
        await page.click('#editCustomerButton > a');
        await page.waitForSelector('#lastName', {visible: true});
        await page.waitForFunction('document.getElementById("lastName").value != ""');
        await page.type('#lastName', 's'); //typing the change
        await page.click('#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input'); //submission to edited customer
        await page.waitForSelector('#app > div > div > div.alert.alert-success');
        const successAlert =  await page.$eval('#app > div > div > div.alert.alert-success', ele => ele.textContent);
        expect(successAlert).to.include('Success! Customer has been updated!');
    })
    it("IT: Edit customer shows updated value in customer detail", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await page.waitForSelector('#app > div > div > table > tbody > tr > th');
        let customerName = await page.$eval('#app > div > div > table > tbody > tr:nth-child(2) > th', ele => ele.textContent);
        console.log(customerName);
        await page.click('#app > div > div > table > tbody > tr:nth-child(2) > th > a'); //click on the customer to get to detail page
        await page.waitForSelector('#editCustomerButton > a');
        await page.click('#editCustomerButton > a');
        await page.waitForSelector('#lastName', {visible: true});
        await page.waitForFunction('document.getElementById("lastName").value != ""');
        await page.type('#lastName', 's'); //typing the change
        await page.click('#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input'); //submission to edited customer
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
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
        await page.waitForSelector('#app > div > div > table > tbody > tr > th');
        let customerName = await page.$eval('#app > div > div > table > tbody > tr:nth-child(2) > th', ele => ele.textContent);
        await page.click('#app > div > div > table > tbody > tr:nth-child(2) > th > a'); //click on the customer to get to detail page
        await page.waitForSelector('#editCustomerButton > a');
        await page.click('#editCustomerButton > a');
        await page.waitForSelector('#lastName', {visible: true});
        await page.waitForFunction('document.getElementById("lastName").value != ""');
        await page.type('#lastName', 's'); //typing the change
        await page.click('#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input'); //submission to edited customer
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
            // slowMo: 50,
        });
    })
    after(async function() {await browser.close();})
    /*
    TEST TYPE: Integration Test
    DEVELOPER: Maria Ringes
    PURPOSE: Adding a product to an order, expect product section to display accurately
    */
    it("IT: createNewOrder displays correct product name from one added product", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        //Add Products
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button", { visible: true });
        //Select First Product
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5');
        let productName = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5', ele => ele.textContent);
        //Update Order
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Check table for created order
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr');
        let tableProductName = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr > td:nth-child(2)', ele => ele.textContent);
        await page.close()
        //Assert product information was correctly transferred over
        expect(tableProductName).to.equal(productName);
    })
    it("IT: createNewOrder displays correct product price from one added product", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        //Add Products
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button", { visible: true });
        //Select Second Product
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5');
        let productPrice = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > p:nth-child(3)', ele => ele.textContent);
        numericProductPrice =  productPrice.match(/\d+(?:\.\d+)?/g)[0]
        //Update Order
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Check table for created order
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr');
        let tableProductPrice = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr > td:nth-child(4)', ele => ele.textContent);
        await page.close()
        //Assert product information was correctly transferred over
        expect(tableProductPrice).to.equal(numericProductPrice);
    })
    it("IT: createNewOrder displays correct product SKU from one added product", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        //Add Products
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button", { visible: true });
        //Select Third Product
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > h5');
        let productSKU = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > p:nth-child(5)', ele => ele.textContent);
        numericProductSKU = productSKU.replace(/\D/g,'');
        //Update Order
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Check table for created order
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr > td');
        let tableProductSKU = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(1) > td:nth-child(1)', ele => ele.textContent);
        await page.close()
        //Assert product information was correctly transferred over
        expect(tableProductSKU).to.equal(numericProductSKU);
    })
    it("IT: createNewOrder displays correct product names from two added products (added at same time)", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        //Add Products
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button", { visible: true });
        //Select First Product
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5');
        let firstProductName = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5', ele => ele.textContent);
        //Select Second Product
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5');
        let secondProductName = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5', ele => ele.textContent);
        //Update Order
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Check table for created order
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr');
        let tableFirstProductName = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(1) > td:nth-child(2)', ele => ele.textContent);
        let tableSecondProductName = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(2) > td:nth-child(2)', ele => ele.textContent);
        await page.close()
        //Assert product information was correctly transferred over
        expect(tableFirstProductName).to.equal(firstProductName);
        expect(tableSecondProductName).to.equal(secondProductName);
    })
    it("IT: createNewOrder displays correct product names from two added products (added one after another)", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        //Add Products
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button", { visible: true });
        //Select First Product
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5');
        let firstProductName = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5', ele => ele.textContent);
        //Update Order
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Add Products
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop");
        //Select Second Product
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5');
        let secondProductName = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5', ele => ele.textContent);
        //Check table for created order
        await page.waitForSelector('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr');
        let tableFirstProductName = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(1) > td:nth-child(2)', ele => ele.textContent);
        let tableSecondProductName = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody > tr:nth-child(2) > td:nth-child(2)', ele => ele.textContent);
        await page.close()
        //Assert product information was correctly transferred over
        expect(tableFirstProductName).to.equal(firstProductName);
        expect(tableSecondProductName).to.equal(secondProductName);
    })
    it("IT: createNewOrder displays correct order total with multiple (3) products (added at different times)", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        //Add Products
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        //Select First Product & Get Price
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > h5');
        let firstProductPrice = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > p:nth-child(3)', ele => ele.textContent);
        let numberStringFirstProductPrice =  firstProductPrice.match(/\d+(?:\.\d+)?/g)[0]
        //Update Order
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Add Products
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        //Select Second Product & Get Price
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > h5');
        let secondProductPrice = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > p:nth-child(3)', ele => ele.textContent);
        let numberStringSecondProductPrice = secondProductPrice.match(/\d+(?:\.\d+)?/g)[0]
        //Select Third Product & Get Price
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > button");
        await page.waitForSelector('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > h5');
        let thirdProductPrice = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(3) > div > div > p:nth-child(3)', ele => ele.textContent);
        let numberStringThirdProductPrice = thirdProductPrice.match(/\d+(?:\.\d+)?/g)[0]
        //Update Order
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Calculate expected order price
        let numericFirstProductPrice = parseFloat(numberStringFirstProductPrice);
        let numericSecondProductPrice = parseFloat(numberStringSecondProductPrice);
        let numericThirdProductPrice = parseFloat(numberStringThirdProductPrice);
        let expectedOrderTotal = numericFirstProductPrice + numericSecondProductPrice + numericThirdProductPrice;
        expectedOrderTotal = Math.round((expectedOrderTotal + Number.EPSILON) * 100) / 100
        //Get total order price from create new order page table
        await page.waitForSelector('#app > div > div > table.table.container.mt-1 > tbody > tr > td:nth-child(2)');
        let orderTotal = await page.$eval('#app > div > div > table.table.container.mt-1 > tbody > tr > td:nth-child(2)', ele => ele.textContent);
        orderTotal = parseFloat(orderTotal);
        await page.close()
        expect(expectedOrderTotal).to.equal(orderTotal);
    })
    it("IT: createNewOrder displays correct order total after product has been removed", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        //Add 2 products to order
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button"); //add product 1 to order
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button"); //add product 2 to order
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Get total price
        let orderTotal = await page.$eval('#app > div > div > table.table.container.mt-1 > tbody > tr > td:nth-child(2)', ele => ele.textContent);
        orderTotal = parseFloat(orderTotal);
        //Add products
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        //Wait for products modal
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        let removedItemPrice = await page.$eval('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > p:nth-child(3)', ele => ele.textContent);
        //Get price and remove product
        let numberRemovedItemPrice = removedItemPrice.match(/\d+(?:\.\d+)?/g)[0]
        numberRemovedItemPrice = parseFloat(numberRemovedItemPrice); //get price of item that will be removed from order
        numberRemovedItemPrice = Math.round((numberRemovedItemPrice + Number.EPSILON) * 100) / 100
        await page.click('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > div > button'); //remove from order
        //Update order with footer button
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Get new total price
        let updatedOrderTotal = await page.$eval('#app > div > div > table.table.container.mt-1 > tbody > tr > td:nth-child(2)', ele => ele.textContent);
        updatedOrderTotal = parseFloat(updatedOrderTotal);
        updatedOrderTotal = Math.round((updatedOrderTotal + Number.EPSILON) * 100) / 100
        updatedOrderTotal = Math.round((updatedOrderTotal + Number.EPSILON) * 100) / 100
        //Expected new total = orderTotal - price of item removed
        let expectedUpdatedOrderTotal = orderTotal - numberRemovedItemPrice;
        expectedUpdatedOrderTotal = Math.round((expectedUpdatedOrderTotal + Number.EPSILON) * 100) / 100;
        await page.close()
        expect(expectedUpdatedOrderTotal).to.equal(updatedOrderTotal);
    })
    it("IT: createNewOrder displays correct products after product has been removed", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation({waitUntil: 'networkidle2'});
        //End Login Authentication
        await page.goto('https://officialstonecap.azurewebsites.net/addOrder');
        //Add 2 products to order
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(1) > div > div > button"); //add product 1 to order
        await page.click("#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > button"); //add product 2 to order
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Get number of table rows
        let productsInOrder = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody', ele => ele.rows.length);
        //Add products
        await page.waitForSelector("#app > div > div > div.col-auto > button");
        await page.click("#app > div > div > div.col-auto > button");
        //Wait for products modal
        await page.waitForSelector("#staticBackdrop > div > div > div.modal-body > div > div > div > div > button", { visible: true });
        //Get price and remove product
        await page.click('#staticBackdrop > div > div > div.modal-body > div > div:nth-child(2) > div > div > div > button'); //remove from order
        //Update order with footer button
        await page.click("#staticBackdrop > div > div > div.modal-footer > button");
        //Get new number of table rows
        let newProductsInOrder = await page.$eval('#app > div > div > table.table.table-hover.container.mt-5 > tbody', ele => ele.rows.length);
        //Expected new total = orderTotal - price of item removed
        await page.close();
        expect(newProductsInOrder).to.equal(productsInOrder-1);
    })
})
