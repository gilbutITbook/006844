var Game = Game || {};

Game.mediator = function mediator() {
  'use strict';

  var logic,
      display,
      startTime,
      svgElement = document.getElementById('gameSvg');

  function moveBotStartInLogicAndOnDisplay(bot) {
    logic.onBotMoveStart(bot);
    display.onBotMoveStart(bot);
  }

  var med = {

    startGame: function startGame() {
      logic.getPlayers().forEach(function(player) {
        player.activate(document.getElementById('gameInput'));
      });
      startTime = new Date();
    },

    // 플레이어가 이동하면 이 함수를 호출한다.
    onPlayerMoved: function onPlayerMoved(player) {
      logic.onPlayerMoved(player);
      display.onPlayerMoved(player);
    },

    // 봇이 이동하기 시작하면 이 함수를 호출한다.
    onBotMoveStart: function onBotMoveStart(bot) {
      moveBotStartInLogicAndOnDisplay(bot);
    },

    // 봇이 이동을 마치면 이 함수를 호출한다.
    onBotMoveEnd: function onBotMoveEnd(bot) {
      logic.onBotMoveEnd(bot);
    },

    // 봇이 잡히면 게임 로직이 이 함수를 호출한다.
    onBotHit: function onBotHit(bot) {
      bot.setNode(undefined);
      moveBotStartInLogicAndOnDisplay(bot);
    },

    // 게임 로직이 이 함수를 호출하여 게임을 끝낸다.
    endGame: function endGame() {
      var millisecondsToWin = new Date() - startTime;
      logic.getPlayers().forEach(function(player) {
        player.deactivate();
      });
      // 누가 이겼는지 디스플레이가 표시하기 전에
      // setTimeout을 써서 마지막 봇을 삭제할 시간을 준다.
      setTimeout(function() {
        display.endGame(millisecondsToWin);
      },500);
    }
  };

  logic = Game.gameLogic(med,6,7);
  display = Game.svgDisplay(med,svgElement,logic);

  return med;
};