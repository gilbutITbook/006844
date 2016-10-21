var Game = Game || {};

// 게임 로직(규칙)을 캡슐화한다
Game.gameLogic = function gameLogic(mediator, rows, columns) {
  'use strict';

  var mommy = mediator;

  return {

    onPlayerMoved: function onPlayerMoved(caller, player) {
      if (caller !== mommy) {
        throw new Error(Game.gameLogic.messages.callerMustBeOriginalMediator);
      }
      // 플레이어 움직임에 따른 게임 로직을 여기에 넣는다.
    }

    /*** 다른 함수들 줄임 ***/
  };
};

Game.gameLogic.messages = {
  callerMustBeOriginalMediator: 'caller 파라미터는 객체 인스턴스를 만들 때 넘겨준 mediator여야 합니다.'
};