var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('chai').assert
let chai = require('chai');
let expect = require('chai').expect;

//below is a sample test case
describe('sample test cases', () => {

    it("passing test case", () => {
        assert(true);
    })
})

//test case for empty name field on add customer
describe('test empty fields submit', () => {
    chai.spy.on(window, alert, () => {})
    it("it should return an alert", () => {
        
        let testCustomer = {
            firstName: "", //"Brianna"
            middleName: "Lynn",
            lastName: "Fahrenkopf",
            phone: "6367512114",
            address: "116 Martin St",
            city: "Lowell",
            region: "Massachusetts",
            zip: "01854",
            country: 'US'
        }
        testCustomer.addCustomer()

        expect(window.alert).to.have.been.called.with("One or more Fields Required");
        
    })
})