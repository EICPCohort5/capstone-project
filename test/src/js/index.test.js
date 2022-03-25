var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
const puppeteer = require('puppeteer');
var expect = require('chai').expect;


describe('Index Page', function(){
    let browser;
    let page;

    before (async function(){
        this.timeout(10000);
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:8080');
    })

    after (async function() {
        await browser.close();
    })

    it("H1 Header Includes 'TJX'", async function(){
        const header =  await page.$eval('H1', ele => ele.textContent);
        expect(header).to.include('TJX');
    })
})

