(function() {

  var money = document.getElementById('money');
  var month = document.getElementById('month');
  var monthlyInterest = document.getElementById('monthly-interest');
  var simpleInterest = document.getElementById('button-simple-interest');
  var compoundInterest = document.getElementById('button-compound-interest');

  var moneyValue = 0;
  var monthValue = 0;
  var monthlyInterestValue = 0;

  money.addEventListener('input', handleMoneyInput);
  month.addEventListener('input', handleMonthInput);
  monthlyInterest.addEventListener('input', getMonthInterest);

  simpleInterest.addEventListener('click', handleButtonSimpleInterestClick);
  compoundInterest.addEventListener('click', handleButtonCoumpoundInterestClick);

  function isEmptyStr(str) {
    return '' === str;
  }

  function isNumericStr(str) {
    return /^\d+$/.test(str);
  }

  function validate() {
    return [money, month, monthlyInterest].every(function(input) {
      return isEmptyStr(input.value) || isNumericStr(input.value);
    });
  }

  function handleMoneyInput(event) {
    var value = event.target.value;
    if (isEmptyStr(value) || isNumericStr(value)) {
      moneyValue = value / 1;
      event.target.className = '';
    } else {
      event.target.className = 'invalid';
    }
  }

  function handleMonthInput(event) {
    var value = event.target.value;
    if (isEmptyStr(value) || isNumericStr(value)) {
      monthValue = value / 1;
      event.target.className = '';
    } else {
      event.target.className = 'invalid';
    }
  }

  function getMonthInterest(event) {
    var value = event.target.value;
    if (isEmptyStr(value) || isNumericStr(value)) {
      monthlyInterestValue = value / 100;
      event.target.className = '';
    } else {
      event.target.className = 'invalid';
    }
  }

  function handleButtonSimpleInterestClick(event) {
    if (validate()) {
      var output = moneyValue * monthValue * monthlyInterestValue;
      result.textContent = output + '元';
    } else {
      result.textContent = 'Error';
    }
  };

  function handleButtonCoumpoundInterestClick(event) {
    if (validate()) {
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
