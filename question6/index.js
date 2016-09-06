(function() {
  function repeatMyStr(str, count) {
    return str.repeat(count);
  }

  // another way
  // new Array(count + 1).join(str);

  console.log(repeatMyStr('@', 3));
  console.log(repeatMyStr('#', 10));
})();
