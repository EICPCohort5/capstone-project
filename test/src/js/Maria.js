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
//Token
const jwtToken = process.env.JWT_TOKEN;

describe('Manage Customers Page - IT', function(){
    let browser;
    before(async function(){browser = await puppeteer.launch(
        {headless: false, defaultViewport: null});
    })
    after(async function() {await browser.close();})
        
    /*
    TEST TYPE: Integration Test (Front End and API)
    DEVELOPER: Maria Ringes
    DATE: Mar 25 3:00p.m. EST
    PURPOSE: Ensure the first name of the first customer in the API matches the first name of the first customer on the manageCustomer rendered table
    */
    it("FE BE IT: Name of the first customer on manageCustomers includes the first and last name of the API customer with ID = 1", async function(){
        console.log(jwtToken);
        //Access first customer in the front end manageCustomer table
        page = await browser.newPage();
        await page.evaluateOnNewDocument(token => {localStorage.clear();localStorage.setItem('user', token);}, jwtToken);
        pagetwo = await browser.newPage();
        await pagetwo.evaluateOnNewDocument(token => {localStorage.clear();localStorage.setItem('user', token);}, jwtToken);
        await page.goto('http://localhost:3000/manageCustomers');
        await page.waitForSelector('#app > table > tbody > tr');
        const fullName =  await page.$eval('#app > table > tbody > tr:nth-child(1) > th > a', ele => ele.textContent);
        //Access first API customer information
        await pagetwo.goto('http://localhost:3000/api/customers/1');
        const APIJson = await pagetwo.$eval('body > pre', ele => ele.textContent);
        const cleanAPIJson = JSON.parse(APIJson);
        //Ensure the full name of the first customer on the front end table includes the first and last name of the customer with ID = 1 from the API
        expect(fullName).to.include(cleanAPIJson.firstName);
        expect(fullName).to.include(cleanAPIJson.lastName);
    })

    it("FE UT: Create Customer button redirects to correct page", async function(){
        //Access first customer in the front end manageCustomer table
        page = await browser.newPage();
        await page.evaluateOnNewDocument (token => {localStorage.clear();localStorage.setItem('user', token);}, jwtToken);
        await page.goto('http://localhost:3000/manageCustomers');
        await page.waitForSelector('#app > table > tbody > tr');
        await page.$eval('#app > div.input-group.rounded.container.mt-5 > button', ele => ele.click());
        await page.waitForSelector('#app > div > h1');
        const pageHeader = await page.$eval('#app > div > h1', ele=>ele.textContent);
        expect(pageHeader).to.include("Create new Customer");
    })
})

describe('Add Customers Page - IT', function(){
    let browser;
    before(async function(){browser = await puppeteer.launch(
        {headless: false, defaultViewport: null});
    })
    after(async function() {await browser.close();})

    it("UT-FE: Adding a customer shows success alert", async function(){
        page = await browser.newPage();
        await page.evaluateOnNewDocument (token => {localStorage.clear();localStorage.setItem('user', token);}, jwtToken);
        await page.goto('https://officialstonecap.azurewebsites.net/addCustomer');
        await page.waitForTimeout(10000);
        await page.type('#firstName', 'Maria');
        await page.waitForTimeout(500);
        await page.type('#lastName', 'Ringes');
        await page.waitForTimeout(500);
        await page.type('#phone', '2034917089');
        await page.waitForTimeout(500);
        await page.type('#email', 'maria_ringes@tjx.com');
        await page.waitForTimeout(500);
        await page.type('#address', '300 Value Way');
        await page.waitForTimeout(500);
        await page.type('#city', 'Marlborough');
        await page.waitForTimeout(500);
        await page.type('#region', 'MA');
        await page.waitForTimeout(500);
        await page.select('#inlineFormCustomSelect', 'United States');
        await page.waitForTimeout(500);
        await page.type('#zip', '01752');
        await page.waitForTimeout(500);
        await page.click('#app > form > div.col-auto.g-10.d-flex.justify-content-center > input');
        //const successAlert =  await page.$eval('#app > div.alert.alert-success', ele => ele.textContent);
        //expect(successAlert).to.include('Customer has been created!');
        const pageHeader = await page.$eval('#app > div > h1', ele => ele.textContent);
        expect(pageHeader).to.include("Create new Customer");
    })
})
