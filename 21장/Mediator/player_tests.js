describe('player', function() {
  'use strict';
  var player,
      fakeMediator;

  beforeEach(function() {
    fakeMediator = {
      onPlayerMoved: function() {}
    };
    player = Game.player(fakeMediator);
  });

  describe('getId()', function() {
    it('유일한 정수 ID를 반환한다', function() {
      var player2 = Game.player(fakeMediator);
      expect(player2.getId()).not.toBe(player.getId());
    });
  });

  describe('setNode(gameNode)', function() {
    it('getNode()는 node를 반환한다', function() {
      var node = Game.gameNode();
      player.setNode(node);
      expect(player.getNode()).toBe(node);
    });
  });

  describe('move(pathIndex)', function() {
    var originalNode, newNode;
    beforeEach(function() {
      originalNode = Game.gameNode();
      newNode = Game.gameNode();
      player.setNode(originalNode);
    });

    describe('해당 인덱스에 경로가 존재할 경우', function() {
      var pathIndex = 2;
      beforeEach(function() {
        originalNode.connect(newNode, pathIndex);
      });

      it('플레이어를 새 위치로 옮긴다', function() {
        player.move(pathIndex);
        expect(player.getNode()).toBe(newNode);
      });
      it('중재자에게 이동 사실을 알린다', function() {
        spyOn(fakeMediator,'onPlayerMoved');
        player.move(pathIndex);
        expect(fakeMediator.onPlayerMoved).toHaveBeenCalledWith(player);
      });
      it('true를 반환한다', function() {
        expect(player.move(pathIndex)).toBe(true);
      });
    });

    describe('해당 인덱스에 경로가 존재하지 않을 경우', function() {
      it('플레이어를 똑같은 노드에 고정한다', function() {
        player.move(2);
        expect(player.getNode()).toBe(originalNode);
      });
      it('false를 반환한다', function() {
        expect(player.move(2)).toBe(false);
      });
    });
  });
});