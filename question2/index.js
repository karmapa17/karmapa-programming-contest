(function() {

  var inputMoney = document.getElementById('money');
  var inputMonth = document.getElementById('month');
  var inputMonthlyInterest = document.getElementById('monthly-interest');
  var simpleInterest = document.getElementById('button-simple-interest');
  var compoundInterest = document.getElementById('button-compound-interest');
  var result = document.getElementById('result');

  inputMoney.addEventListener('input', handleMoneyInput);
  inputMonth.addEventListener('input', handleMonthInput);
  inputMonthlyInterest.addEventListener('input', getMonthInterest);

  simpleInterest.addEventListener('click', handleButtonSimpleInterestClick);
  compoundInterest.addEventListener('click', handleButtonCoumpoundInterestClick);

  function isEmptyStr(str) {
    return '' === str;
  }

  function isNumericStr(str) {
    return /^\d+$/.test(str);
  }

  function validate() {
    return [inputMoney, inputMonth, inputMonthlyInterest].every(function(input) {
      return isEmptyStr(input.value) || isNumericStr(input.value);
    });
  }

  function toNumber(str) {
    return parseInt(str, 10) || 0;
  }

  function markInputClass(target) {
    var value = target.value;
    target.className = (isEmptyStr(value) || isNumericStr(value)) ? '' : 'invalid';
  }

  function handleMoneyInput(event) {
    markInputClass(event.target);
  }

  function handleMonthInput(event) {
    markInputClass(event.target);
  }

  function getMonthInterest(event) {
    markInputClass(event.target);
  }

  function getSimpleInterest(money, month, monthlyInterest) {
    return Math.round(money * month * monthlyInterest);
  }

  function getCompoundInterest(money, month, monthlyInterest) {
    var total = money;
    for (var i = 0; i < month; i++) {
      total += total * monthlyInterest;
    }
    return Math.round(total - money);
  }

  function showResult(str) {
    result.textContent = str;
  }

  function handleButtonSimpleInterestClick() {
    if (! validate()) {
      return showResult('Error');
    }
    var money = toNumber(inputMoney.value);
    var month = toNumber(inputMonth.value);
    var monthlyInterest = toNumber(inputMonthlyInterest.value) / 100;

    showResult(getSimpleInterest(money, month, monthlyInterest) + '元');
  };

  function handleButtonCoumpoundInterestClick() {
    if (! validate()) {
      return showResult('Error');
    }
    var money = toNumber(inputMoney.value);
    var month = toNumber(inputMonth.value);
    var monthlyInterest = toNumber(inputMonthlyInterest.value) / 100;

    showResult(getCompoundInterest(money, month, monthlyInterest) + '元');
  };
})();
