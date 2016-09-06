(function() {
  var arr = ['剪刀', '石頭', '布'];

  scissors.addEventListener('click', gameStart);
  stone.addEventListener('click', gameStart);
  paper.addEventListener('click', gameStart);

  function npcChoice() {
    var num = Math.floor(Math.random() * 2.999999);
    npcResult.textContent = arr[num];
    return num;
  }

  function gameStart(event) {
    var npcNum = npcChoice();
    var playerChoice = event.target.textContent;
    var playerNum = arr.indexOf(playerChoice);
    playerResult.textContent = playerChoice;
    if (1 === (npcNum - playerNum) || (0 === npcNum && 2 === playerNum)) {
      combatResult.textContent = '猜拳大魔王勝利！';
    } else if (playerNum === npcNum) {
      combatResult.textContent = '平手，再來一局！';
    } else {
      combatResult.textContent = '冒險者勝利！';
    }
  }
})();
