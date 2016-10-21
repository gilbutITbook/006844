describe('mediator', function() {
  'use strict';
  var gameNodes,
      numNodes = 10,
      fakeDisplay,
      fakeLogic,
      fakePlayer0, fakePlayer1, fakePlayers;
  beforeEach(function() {
    var nodeIx;
    gameNodes = [];
    for (nodeIx=0; nodeIx<numNodes; ++nodeIx) {
      gameNodes.push(Game.gameNode());
    }
    fakeDisplay = {
      onPlayerMoved: function(player) {},
      onBotMoveStart: function(bot) {},
      endGame: function() {},
    };
    fakePlayer0 = {
      activate: function() {},
      deactivate: function() {},
    };
    fakePlayer1 = {
      activate: function() {},
      deactivate: function() {},
    };
    fakePlayers = [ fakePlayer0, fakePlayer1 ];
    fakeLogic = {
      getPlayers: function() { return fakePlayers; },
      onPlayerMoved: function(player) {},
      onBotMoveStart: function(bot) {},
      onBotMoveEnd: function(bot) {},
      getNodes: function() { return gameNodes; },
      getBots: function() { return []; }
    };
    spyOn(Game,'svgDisplay').and.returnValue(fakeDisplay);
    spyOn(Game,'gameLogic').and.returnValue(fakeLogic);
    spyOn(fakeDisplay,'onPlayerMoved');
    spyOn(fakeDisplay,'endGame');
    spyOn(fakeLogic,'onPlayerMoved');
  });

  describe('startGame()', function() {
    it('두 플레이어를 활성화한다', function() {
      var mediator = Game.mediator();
      spyOn(fakePlayer0,'activate');
      spyOn(fakePlayer1,'activate');
      mediator.startGame();
      expect(fakePlayer0.activate).toHaveBeenCalled();
      expect(fakePlayer1.activate).toHaveBeenCalled();
    });
  });

  describe('onPlayerMoved(player)', function() {
    var player;
    beforeEach(function() {
      var mediator = Game.mediator(),
          node = Game.gameNode();
      player = Game.player(mediator);
      player.setNode(node); // 여기로 이동한 것처럼 하자.
      mediator.onPlayerMoved(player);
    });
    it("보드에 플레이어의 새 위치를 알린다", function() {
      expect(fakeLogic.onPlayerMoved).toHaveBeenCalledWith(player);
    });
    it("디스플레이에 플레이어의 새 위치를 알린다", function() {
      expect(fakeDisplay.onPlayerMoved).toHaveBeenCalledWith(player);
    });
  });

  describe('onBotMoveStart(bot)', function() {
    it('게임 로직으로 하여금 봇들을 이동하게 하고 디스플레이가 움직이게 만든다 ', function() {
      var node = Game.gameNode(),
          mediator = Game.mediator(),
          bot = Game.bot(mediator),
          logicMoveBotStarted = false,
          displayMovedBot = false;
      bot.setNode(node); // 여기로 이동한 것처럼 하자.
      spyOn(fakeLogic,'onBotMoveStart').and.callFake(function(bot) {
        expect(logicMoveBotStarted).toBe(false);
        expect(displayMovedBot).toBe(false);
        logicMoveBotStarted = true;
      });
      spyOn(fakeDisplay,'onBotMoveStart').and.callFake(function(bot) {
        expect(logicMoveBotStarted).toBe(true);
        expect(displayMovedBot).toBe(false);
        displayMovedBot = true;
      });
      mediator.onBotMoveStart(bot);
      expect(logicMoveBotStarted).toBe(true);
      expect(displayMovedBot).toBe(true);
    });
  });

  describe('onBotMoveEnd(bot)', function() {
    it('게임 로직으로 하려금 봇들을 그만 움직이게 한다', function() {
      var mediator = Game.mediator(),
          bot = Game.bot(mediator);
      spyOn(fakeLogic,'onBotMoveEnd');
      mediator.onBotMoveEnd(bot);
      expect(fakeLogic.onBotMoveEnd).toHaveBeenCalledWith(bot);
    });
  });

  describe('onBotHit(bot)', function() {
    var mediator, bot;
    beforeEach(function() {
      var node = Game.gameNode();
      mediator = Game.mediator();
      bot = Game.bot(mediator);
      bot.setNode(node);
      spyOn(fakeLogic,'onBotMoveStart');
      spyOn(fakeDisplay,'onBotMoveStart');
      mediator.onBotHit(bot);
    });
    it('노드를 undefined로 세팅한다', function() {
      expect(bot.getNode()).toBeUndefined();
    });
    it('게임 로직으로 하여금 봇을 삭제하게 한다', function() {
      expect(fakeLogic.onBotMoveStart).toHaveBeenCalledWith(bot);
    });
    it('디스플레이로 하여금 봇을 삭제하게 한다', function() {
      expect(fakeDisplay.onBotMoveStart).toHaveBeenCalledWith(bot);
    });
  });

  describe('endGame()', function() {
    var fakeElement, mediator;
    beforeEach(function() {
      mediator = Game.mediator();
      fakeElement = {
        removeEventListener: function() {}
      };
      spyOn(document,'getElementById').and.returnValue(fakeElement);
      spyOn(fakeElement,'removeEventListener');
      jasmine.clock().install();
    });
    afterEach(jasmine.clock().uninstall);
    it('두 플레이어를 비활성화한다', function() {
      var mediator = Game.mediator();
      spyOn(fakePlayer0,'deactivate');
      spyOn(fakePlayer1,'deactivate');
      mediator.endGame();
      expect(fakePlayer0.deactivate).toHaveBeenCalled();
      expect(fakePlayer1.deactivate).toHaveBeenCalled();
    });
    it('디스플레이로 하여금 게임 종료를 선언하게 한다', function() {
      mediator.endGame();
      jasmine.clock().tick(10000);
      expect(fakeDisplay.endGame).toHaveBeenCalled();
    });
  });
});