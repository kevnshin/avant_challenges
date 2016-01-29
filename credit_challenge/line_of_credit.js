function LineOfCredit (apr, limit) {
  this.apr = apr;
  this.limit = limit;
  this.balance = 0;
  this.available_credit = this.limit - this.balance;
  this.date_created = Date.now();
}

LineOfCredit.prototype.withdraw = function (withdraw_amount) {
  
}

LineOfCredit.prototype.make_payment = function (payment_amount) {
  
}

