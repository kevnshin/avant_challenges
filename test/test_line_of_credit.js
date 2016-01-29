var LOC = require("../credit_challenge/line_of_credit.js");
var chai = require("chai");
var expect = chai.expect;
var should = chai.should();

var scenario1 = new LOC.LineOfCredit(0.35, 1000);


describe("Scenario 1: ", function () {
  it("should be a new account with a $1000 limit", function () {
    scenario1.limit.should.equal(1000);
  })

  it("should be a new account with a 35% apr", function () {
    scenario1.apr.should.equal(0.35);
  })

  it("drawing $500 on day 1 should reduce his available credit to $500", function () {
    scenario1.withdraw(500,0);
    scenario1.available_credit.should.equal(500);
  })

  it("drawing $500 on day 1 should make his current balance $500", function () {
    scenario1.current_balance.should.equal(500);
  })

  it("At the end of the period, he should owe $514.38", function () {
    scenario1.get_statement_balance().should.equal(514.38);
  })

})


var scenario2 = new LOC.LineOfCredit(0.35, 1000);


describe("Scenario 2: ", function () {
  it("should be a new account with a $1000 limit", function () {
    scenario2.limit.should.equal(1000);
  })

  it("should be a new account with a 35% apr", function () {
    scenario2.apr.should.equal(0.35);
  })

  it("drawing $500 on day 1 should reduce his available credit to $500", function () {
    scenario2.withdraw(500,0);
    scenario2.available_credit.should.equal(500);
  })

  it("drawing $500 on day 1 should make his current balance $500", function () {
    scenario2.current_balance.should.equal(500);
  })

  it("paying back $200 on day 15 should increase his available credit to $700", function () {
    scenario2.make_payment(200, 15);
    scenario2.available_credit.should.equal(700);
  })

  it("paying back $200 on day 15 should reduce his current balance to $300", function () {
    scenario2.current_balance.should.equal(300);
  })

  it("paying back $200 on day 15 should calculate his accrued interest to be $7.19", function () {
    scenario2.current_interest.should.equal(7.19);
  })  

  it("drawing $100 on day 25 should reduce his available credit to $600", function () {
    scenario2.withdraw(100,25);
    scenario2.available_credit.should.equal(600);
  })

  it("drawing $100 on day 25 should make his current balance $400", function () {
    scenario2.current_balance.should.equal(400);
  })

  it("drawing $100 on day 25 should calculate his accrued interest to be $10.07", function () {
    scenario2.current_interest.should.equal(10.07);
  })  

  it("At the end of the period, he should owe $411.99", function () {
    scenario2.get_statement_balance().should.equal(411.99);
  })

})
