describe('gameLogic', function() {
  'use strict';

  var mediator = '내가 중재자라고 합시다',
      player = '내가 플레이어라고 합시다',
      gameLogic = Game.gameLogic(mediator,6, 7);

  describe('onPlayerMoved(caller, player)', function() {

    it('호출부가 원래 중재자가 아닐 경우 예외를 던진다', function() {
      expect(function() {
        gameLogic.onPlayerMoved('wrongKey', player);
      }).toThrowError(Game.gameLogic.messages.callerMustBeOriginalMediator);
    });

    it('호출부가 원래 중재자가 맞으면 예외를 던지지 않는다', function() {
      expect(function() {
        gameLogic.onPlayerMoved(mediator,player);
      }).not.toThrow();
    });
  });
});