(function() {

  var money = document.getElementById('money');
  var month = document.getElementById('month');
  var monthlyInterest = document.getElementById('monthlyInterest');
  var simpleInterest = document.getElementById('simpleInterest');
  var compoundInterest = document.getElementById('compoundInterest');

  var moneyValue = 0;
  var monthValue = 0;
  var monthlyInterestValue = 0;
  var moneyInput = true;
  var monthInput = true;
  var monthlyInterestInput = true;

  money.addEventListener('input', handleMoneyInput);
  month.addEventListener('input', handleMonthInput);
  monthlyInterest.addEventListener('input', getMonthInterest);

  simpleInterest.addEventListener('click', handleButtonSimpleInterestClick);
  compoundInterest.addEventListener('click', countCompoundInterest);

  function handleMoneyInput(event) {
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

  function handleMonthInput(event) {
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

  function handleButtonSimpleInterestClick(event) {
    if (true === moneyInput && monthInput && monthlyInterestInput) {
      var output = moneyValue * monthValue * monthlyInterestValue;
      result.textContent = output + '元';
    } else {
      result.textContent = 'Error';
    }
  };

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
