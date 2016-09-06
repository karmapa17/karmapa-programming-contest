(function() {
  var immediateFloor = 1;
  var clickedFloor;
  var floorClassNames = document.getElementsByClassName("floorbtn");

  for (var i = 0; i < floorClassNames.length; i++) {
      floorClassNames[i].addEventListener('click', floorClicked);
  }

  function floorMove(arr) {
    if ('+' === arr[1]) {
      setTimeout(function() {
        immediateFloor += 1;
        floorRender.textContent = immediateFloor;
        if (clickedFloor === immediateFloor) {
          return;
        } else {
          return floorMove(arr);
        }
      }, 500);
    } else if ('-' === arr[1]) {
      setTimeout(function() {
        immediateFloor -= 1;
        floorRender.textContent = immediateFloor;
        if (clickedFloor === immediateFloor) {
          return;
        } else {
          return floorMove(arr);
        }
      }, 500);
    }
    
  }

  function floorClicked(event) {
    var moveState = [];
    clickedFloor = event.target.textContent / 1;
    var countFloor = clickedFloor - immediateFloor;
    if (countFloor > 0) {
      moveState = [Math.abs(countFloor), '+'];
    } else if (countFloor < 0) {
      moveState = [Math.abs(countFloor), '-'];
    } else {
      return;
    }
    floorMove(moveState);
  }
})();
