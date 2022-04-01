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


describe('Manage Customers Page - IT', function(){
    let browser;
    let managePage;
    let loginPage;

    //Utilize puppeteer to launch the browser and create the manage customer page
    before(async function(){browser = await puppeteer.launch(
        {
        headless: false,
        defaultViewport: null,
        //slowMo: 100,
        });
    })

    after(async function() {
        await browser.close();
    })

    /*
    TEST TYPE: Integration Test
    DEVELOPER: Abdulahad Qureshi
    DATE: Mar 31 2:00p.m. EST
    STEPS TESTED:
        1. Go to manage customers and select firstName from filter
        2. Type "ie" into search box
        3. Ensure the search results match with the corresponding search
    */
   
    it("IT: Making sure results with added search filter work for firstName", async function(){

        //get past login page 
        loginPage = await browser.newPage();
        await loginPage.goto('https://officialstonecap.azurewebsites.net/login');
        await loginPage.type('#username', "cohort5");
        await loginPage.type('#exampleInputPassword1', "test");
        await loginPage.click('div > div > form > button');
        await loginPage.waitForNavigation();

        //Search with first name filter on manage customers, and see if search results correspond to correct search
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
    }).timeout(20000); 

    /*
    TEST TYPE: Integration Test
    DEVELOPER: Abdulahad Qureshi
    DATE: Mar 31 2:00p.m. EST
    STEPS TESTED:
        1. Go to manage customers and select lastName from filter
        2. Type "t" into search box
        3. Ensure the search results match with the corresponding search
    */
        it("IT: Making sure results with added search filter work for lastName", async function(){
    
            //Search with first name filter on manage customers, and see if search results correspond to correct search
            managePage = await browser.newPage();
            await managePage.goto('https://officialstonecap.azurewebsites.net/manageCustomers');
            await managePage.type('div > input', "t");
            await managePage.click('#search-dropdown');
            await managePage.select('select#searchBy', 'lastName'); 
            let customerCount = await managePage.$eval('#app > div > div > table > tbody', ele => ele.rows.length);
            for (let i = 0; i < customerCount; i++) {
                let customer = await managePage.$eval(`#app > div > div > table > tbody > tr:nth-child(${i+1}) > th`, ele => ele.textContent);
                expect(customer.toLowerCase()).to.include("t"); //change to lowercase 
            }
        }).timeout(10000);  
        
    /*
    TEST TYPE: Integration Test
    DEVELOPER: Abdulahad Qureshi
    DATE: Mar 31 2:00p.m. EST
    STEPS TESTED:
        1. Go to manage customers and select address from filter
        2. Type "sa" into search box
        3. Ensure the search results match with the corresponding search
    */
        it("IT: Making sure results with added search filter work for address", async function(){

            //Search with first name filter on manage customers, and see if search results correspond to correct search
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
        }).timeout(10000);

    /*
    TEST TYPE: Integration Test
    DEVELOPER: Abdulahad Qureshi
    DATE: Mar 31 2:00p.m. EST
    STEPS TESTED:
        1. Go to manage customers and select phone from filter
        2. Type "abc" into search box (should produce nothing)
        3. Ensure the search results match with the corresponding search
    */
        it("IT: Making sure results with added search filter work for phone", async function(){

            //Search with first name filter on manage customers, and see if search results correspond to correct search
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
        }).timeout(10000); 

    /*
    TEST TYPE: Integration Test
    DEVELOPER: Abdulahad Qureshi
    DATE: Mar 31 2:00p.m. EST
    STEPS TESTED:
        1. Go to manage customers and select email from filter
        2. Type "@" into search box (should produce every result)
        3. Ensure the search results match with the corresponding search
    */
        it("IT: Making sure results with added search filter work for email", async function(){

            //Search with first name filter on manage customers, and see if search results correspond to correct search
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
        }).timeout(10000); 
})


describe('Add Customers Page - Incorrect inputs for first/middle/lastname give appropriate alerts - UT', function(){
    let browser;
    let page;
    let loginPage;

    //Utilize puppeteer to launch the browser and create two new pages
    before(async function(){browser = await puppeteer.launch(
        {
        headless: false,
        defaultViewport: null,
        slowMo: 30,
        });
    })

    after(async function() {
        await browser.close();
    })

    /*
    TEST TYPE: Unit Test Front End
    DEVELOPER: Maria Ringes
    DATE: Mar 27 8:00p.m. EST
    STEPS TESTED:
        1. Add a customer with numbers/special characters as firstname, middlename. or last name
        alpha/special characters for phone number
        special characters for email? 
        special characters for address
        special chars for city 
        special chars for region
        special chars for zip

        2. Ensure alert says 'Customer has been created'
    */
        it("UT-FE: firstname with numbers", async function(){

            //get past login page 
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

        }).timeout(30000);

        it("UT-FE: middlename with numbers", async function(){

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

        }).timeout(30000);

        it("UT-FE: lastname with numbers", async function(){

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

        }).timeout(30000);

        it("UT-FE: every field is empty", async function(){

            //empty fields
            page = await browser.newPage();
            await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
            page.on('dialog', async dialog => {
                expect(dialog.message()).to.include('Input Validation Failed');
                await dialog.accept()
            });
            await page.$eval( '#app > div > div > form > div.col-auto.g-10.d-flex.justify-content-center > input.btn.btn-primary', form => form.click());

        }).timeout(30000);

        it("UT-FE: firstname with special characters", async function(){

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
            expect(button).equal(true); //from page.on section
        }).timeout(30000);
})


describe('Add Customers Page - Incorrect inputs for phoneNumber give appropriate alerts - UT', function(){
    let browser;
    let page;
    let loginPage;

    //Utilize puppeteer to launch the browser and create two new pages
    before(async function(){browser = await puppeteer.launch(
        {
        headless: false,
        defaultViewport: null,
        slowMo: 30,
        });
    })

    after(async function() {
        await browser.close();
    })

        it("UT-FE: phoneNumber with alphabets", async function(){

            //get past login page 
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

        }).timeout(30000);

        it("UT-FE: phoneNumber with special characters", async function(){

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

        }).timeout(30000);
    })


    describe('Add Customers Page - Incorrect inputs for address,city,region,zip give appropriate alerts - UT', function(){
        let browser;
        let page;
        let loginPage;
    
        //Utilize puppeteer to launch the browser and create two new pages
        before(async function(){browser = await puppeteer.launch(
            {
            headless: false,
            defaultViewport: null,
            slowMo: 30,
            });
        })
    
        after(async function() {
            await browser.close();
        })

        /*
        special characters for address
        special chars for city 
        special chars for region
        special chars for zip*/
    
            it("UT-FE: address with special characters", async function(){
    
                //get past login page 
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
                expect(button).equal(true); //from page.on section
            }).timeout(30000);
    
            it("UT-FE: city with special characters", async function(){
    
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
                expect(button).equal(true); //from page.on section
            }).timeout(30000);

            it("UT-FE: region with special characters", async function(){
    
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
                expect(button).equal(true); //from page.on section
            }).timeout(30000);

            it("UT-FE: zip with special characters", async function(){
    
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
                expect(button).equal(true); //from page.on section
            }).timeout(30000);
        })


        describe('Add Customers Page - Incorrect inputs for email give appropriate alerts - UT', function(){
            let browser;
            let page;
            let loginPage;
        
            //Utilize puppeteer to launch the browser and create two new pages
            before(async function(){browser = await puppeteer.launch(
                {
                headless: false,
                defaultViewport: null,
                slowMo: 30,
                });
            })
        
            after(async function() {
                await browser.close();
            })
        
                it("UT-FE: email without '@'", async function(){
        
                    //get past login page 
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
                }).timeout(30000);

                it("UT-FE: email without '.'", async function(){
        
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
                }).timeout(30000);

                it("UT-FE: email with '@.' together", async function(){
        
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
                }).timeout(30000);

                it("UT-FE: email with nothing before '@'", async function(){
        
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
                }).timeout(30000);

                it("UT-FE: email with nothing after '.'", async function(){
        
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
                }).timeout(30000);
            })