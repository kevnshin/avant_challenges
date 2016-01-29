const DAYS_IN_PERIOD = 30;
const DAYS_IN_YEAR = 365;

function LineOfCredit (apr, limit) {
  this.apr = apr || 0.35;
  this.limit = limit || 1000;
  this.current_balance = 0;
  this.available_credit = this.limit - this.current_balance;
  this.day_of_last_transaction = 0;
  this.current_interest = 0;
  this.statement_balance = 0;
}

LineOfCredit.prototype.withdraw = function (withdraw_amount, day_in_period) {
  
  if (withdraw_amount <= this.available_credit) {
    
    this.calculate_current_interest(day_in_period - this.day_of_last_transaction);
    this.current_balance += withdraw_amount;
    this.calculate_available_credit();
    this.day_of_last_transaction = day_in_period;

    return this.available_credit; 
  } else {
    throw "You can't withdraw more than your available credit.";
  }

}

LineOfCredit.prototype.make_payment = function (payment_amount, day_in_period) {

  if (payment_amount <= this.current_balance) {
    this.calculate_current_interest(day_in_period - this.day_of_last_transaction);
    this.current_balance -= payment_amount;
    this.calculate_available_credit();
    this.day_of_last_transaction = day_in_period;

    return this.available_credit; 
  } else {
    throw "You can't make a payment greater than your current balance."
  }

}

LineOfCredit.prototype.calculate_available_credit = function () {
  this.available_credit = this.limit - this.current_balance;
}

LineOfCredit.prototype.calculate_current_interest = function (days_elapsed) {
  this.current_interest += Math.round((this.current_balance * this.apr / DAYS_IN_YEAR * days_elapsed)*100)/100;
}

LineOfCredit.prototype.get_statement_balance = function () {
  this.calculate_current_interest(DAYS_IN_PERIOD - this.day_of_last_transaction);
  this.statement_balance = this.current_balance + this.current_interest;
  this.day_of_last_transaction = 0;
  return this.statement_balance;
}

module.exports = {LineOfCredit: LineOfCredit};