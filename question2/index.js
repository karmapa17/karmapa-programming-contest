(function() {
  var moneyValue = 0;
  var monthValue = 0;
  var monthlyInterestValue = 0;
  var moneyInput = true;
  var monthInput = true;
  var monthlyInterestInput = true;

  money.addEventListener('input', getMoney);

  function getMoney(event) {
    var value = event.target.value;
    if (value / 1 || '' === value) {
      moneyValue = value / 1;
      moneyInput = true;
      event.target.className = '';
    } else {
      moneyInput = false;
      event.target.className = 'invalid';
    }
  }

  month.addEventListener('input', getMonth);

  function getMonth(event) {
    var value = event.target.value;
    if (value / 1 || '' === value) {
      monthValue = value / 1;
      monthInput = true;
      event.target.className = '';
    } else {
      monthInput = false;
      event.target.className = 'invalid';
    }
  }

  monthlyInterest.addEventListener('input', getMonthInterest);

  function getMonthInterest(event) {
    var value = event.target.value;
    if (value / 1 || '' === value) {
      monthlyInterestValue = value / 100;
      monthlyInterestInput = true;
      event.target.className = '';
    } else {
      monthlyInterestInput = false;
      event.target.className = 'invalid';
    }
  }

  simpleInterest.addEventListener('click', countSimpleInterest);

  function countSimpleInterest(event) {
    if (true === moneyInput && monthInput && monthlyInterestInput) {
      var output = moneyValue * monthValue * monthlyInterestValue;
      result.textContent = output + '元';
    } else {
      result.textContent = 'Error';
    }
  };

  compoundInterest.addEventListener('click', countCompoundInterest);

  function countCompoundInterest(event) {
    if (true === moneyInput && monthInput && monthlyInterestInput) {
      var output = moneyValue;
      for (var i = 0; i < monthValue; i++) {
        output = output * (1 + monthlyInterestValue);
      }
      result.textContent = output - moneyValue + '元';
    } else {
      result.textContent = 'Error';
    }
  };
})();
