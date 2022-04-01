//Mocha
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
//Chai
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;
var include = require('chai').include;

//Puppeteer
const puppeteer = require('puppeteer');


describe('Customer Searchbar - UT', function(){
    let browser;
    before(async function(){browser = await puppeteer.launch(
        {
            headless: false, 
            defaultViewport: null,
            slowMo: 50,
        });
    })
    after(async function() {await browser.close();})
        
    /*
    TEST TYPE: Unit Test
    PURPOSE: Ensure the seachbar is working and generating correct results
    */
    it("FE UT: Searching for specific order by Order ID should generate correct Orders in the table", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
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

    it("FE UT: Searching for specific order by Total Order Price should generate correct Orders in the table", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
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

    it("FE UT: Searching for specific order by Date Ordered should generate correct Orders in the table", async function(){
        page = await browser.newPage();
        //Login to Authenticate
        await page.goto('https://officialstonecap.azurewebsites.net/login');
        await page.type('#username', 'cohort5');
        await page.type('#exampleInputPassword1', 'test');
        await page.click('#app > div > div > div > div > div > form > button');
        await page.waitForNavigation();
        //End Login Authentication
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
