describe('gameLogic', function() {
  'use strict';

  var mediator = '내가 중재자라고 합시다',
      player = '내가 플레이어라고 합시다',
      gameLogic = Game.gameLogic(mediator,6, 7);

  describe('onPlayerMoved(magicKey, player)', function() {

    it('올바른 "magicKey"라고 단언한다', function() {
      expect(function() {
        gameLogic.onPlayerMoved('틀린키', player);
      }).toThrowError(Game.readOnceKey.messages.badKey);
    });
  });
});