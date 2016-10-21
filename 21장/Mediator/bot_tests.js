describe('bot', function() {
    var bot,
      fakeMediator;

  beforeEach(function() {
    fakeMediator = {
      onBotMoveStart: function() {}
    };

    bot = Game.bot(fakeMediator);
  });

  describe('getId()', function() {
    it('유일한 정수 ID를 반환한다', function() {
      var bot2 = Game.bot(fakeMediator);
      expect(bot2.getId()).not.toBe(bot.getId());
    });
  });

  describe('setNode(gameNode)', function() {
    it('getNode()는 노드를 반환한다', function() {
      var node = Game.gameNode();
      bot.setNode(node);
      expect(bot.getNode()).toBe(node);
    });
  });

  describe('setMoveInterval(frequencyTenths)', function() {
    beforeEach(jasmine.clock().install);
    afterEach(jasmine.clock().uninstall);
    it('mediator.onBotMoveStart를 주어진 주기로 호출한다', function() {
      var freq = 5,
          nodeA = Game.gameNode(),
          nodeB = Game.gameNode();
      for (var pathIndex=0; pathIndex<3; ++pathIndex) {
        nodeA.connect(nodeB,pathIndex);
      }
      bot.setNode(nodeA);
      spyOn(fakeMediator,'onBotMoveStart');
      bot.setMoveInterval(freq);

      jasmine.clock().tick(freq*100 /*100분의 1초*/);
      jasmine.clock().tick(freq*100 /*100분의 1초*/);
      jasmine.clock().tick(freq*100 /*100분의 1초*/);

      expect(fakeMediator.onBotMoveStart).toHaveBeenCalledWith(bot);
      expect(fakeMediator.onBotMoveStart.calls.count()).toBe(3);
    });
  });
});