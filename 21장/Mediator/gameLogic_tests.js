describe('gameLogic', function() {
  'use strict';
  var rows = 5,
      columns = 4,
      numNodes = rows * columns,
      numPlayers = 2,
      numPaths = Game.pathIndex.count,
      fakeMediator = {
        onPlayerMoved: function(player) {},
        onBotMoveStart: function(bot) {},
        onBotHit: function(bot) {},
        endGame: function() {},
      };
  describe('생성', function() {
    it('정확한 개수의 노드를 생성한다', function() {

    });
    it('모든 노드를 적어도 하나 이상의 다른 노드에 연결한다', function() {
     var nodes = Game.gameLogic(fakeMediator,rows,columns)
          .getNodes();
      nodes.forEach(function isLinked(n) {
        var ix,
            foundPath = false;
        for (ix=0; ix<numPaths; ++ix) {
          if (n.getConnectedNode(ix)) {
            foundPath = true;
            break;
          }
        }
        expect(foundPath).toBe(true);
      });
    });
  });

  describe('getPlayers()', function() {
    it('객체 생성 당시 주어진 플레이어 수를 반환한다', function() {
      var logic = Game.gameLogic(fakeMediator,rows,columns);
      expect(logic.getPlayers().length).toBe(numPlayers);
    }) ;
  });

  describe('getNodes()', function() {
    it('객체 생성 당시 주어진 노드 개수를 반환한다', function() {
      var logic = Game.gameLogic(fakeMediator,rows,columns);
      expect(logic.getNodes().length).toBe(numNodes);
    });
  });

  describe('getNumPaths()', function() {
    it('객체 생성 당시 주어진 경로 개수를 반환한다', function() {
      expect(Game.gameLogic(fakeMediator,rows,columns)
        .getNumPaths()).toBe(numPaths);
    });
  });

  describe('onPlayerMoved(player)', function() {
    var logic, nodes, player,bots, botsHit;
    beforeEach(function() {
      logic = Game.gameLogic(fakeMediator, rows,columns);
      nodes = logic.getNodes();
      player = logic.getPlayers()[1];
      player.setNode(nodes[0]);
      bots = logic.getBots();
      bots.forEach(function(bot) {
        bot.setNode(nodes[2]); // 방해되지 않게.
      });
      botsHit = [];
      spyOn(fakeMediator,'onBotHit').and.callFake(function(bot) {
        botsHit.push(bot);
      });
    });
    it('새 노드에 봇이 없을 경우 mediator.onBotHit를 호출하지 않는다', function() {
      logic.onPlayerMoved(player);
      expect(fakeMediator.onBotHit).not.toHaveBeenCalled();
    });
    it('새 노드에 봇이 있을 경우 mediator.onBotHit를 호출한다', function() {
      bots[0].setNode(nodes[0]);
      logic.onPlayerMoved(player);
      expect(botsHit).toEqual([bots[0]]);
    });
    it('새 노드에 있는 여러 봇에 대해 각각 mediator.onBotHit를 호출한다', function() {
      var botsToBeHit = [ bots[1], bots[3] ];
      botsToBeHit.forEach(function(bot) {
        bot.setNode(player.getNode());
      });
      logic.onPlayerMoved(player);
      expect(botsHit).toEqual(botsToBeHit);
    });
  });

  describe('onBotMoveStart(bot)', function() {
    var logic, bots, ix;
    beforeEach(function() {
      logic = Game.gameLogic(fakeMediator, rows,columns);
      bots = logic.getBots();
      spyOn(fakeMediator,'endGame');
    });
    describe("봇의 새 노드가 undefined일 경우", function() {
      it("이 봇이 마지막 봇이 아닐 경우 mediator.endGame를 호출하지 않는다", function() {
        for (ix=0; ix<bots.length-1/*just one shy*/; ++ix) {
          bots[ix].setNode(undefined);
          logic.onBotMoveStart(bots[ix]);
        }
        expect(fakeMediator.endGame).not.toHaveBeenCalled();
      });
      it("이 봇이 마지막 봇일 경우 mediator.endGame를 호출한다", function() {
        bots.forEach(function(bot) {
          bot.setNode(undefined);
          logic.onBotMoveStart(bot);
        });
        expect(fakeMediator.endGame).toHaveBeenCalled();
      });
    });
    describe("봇의 새 노드가 undefined가 아닐 경우", function() {
      it("mediator.endGame을 실행하지 않는다", function() {
        bots.forEach(function(bot) {
          logic.onBotMoveStart(bot);
        });
        expect(fakeMediator.endGame).not.toHaveBeenCalled();
      });
      it("봇이 잡히지 않게 한다", function() {
        var bot = bots[0],
            player = logic.getPlayers()[0];
        spyOn(fakeMediator,'onBotHit');
        logic.onBotMoveStart(bots[0]);
        player.setNode(bot.getNode());
        logic.onPlayerMoved(player);
        expect(fakeMediator.onBotHit).not.toHaveBeenCalledWith(bot);
      });
    });
  });
});