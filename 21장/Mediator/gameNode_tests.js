describe('gameNode', function() {
  'use strict';
  var gameNode = Game.gameNode,
      normalPoint = Game.normalPoint;

  describe('getPoint()', function() {
    it('gameNode(point)에 넘겨준 위치를 반환한다', function() {
      var pt = normalPoint();
      var node = gameNode(pt);
      expect(node.getPoint()).toBe(pt);
    });
  });

  describe('setConnectedNode(otherNode,pathIndex / getConnectedNode(pathIndex)',
  function() {
    it('세터가 세팅한 것을 게터가 게팅하는 식으로 짝을 이루어 작동한다', function() {
      var nodeA = gameNode();
      var nodeB = gameNode();
      var pathIndex = 2;
      nodeA.setConnectedNode(nodeB,pathIndex);
      expect(nodeA.getConnectedNode(pathIndex)).toBe(nodeB);
    });
  });

  describe('connect(otherNode, pathIndex)', function() {
    function forEachPathIndex(expectation) {
      var pathIndex;
      for (pathIndex=0; pathIndex<4; ++pathIndex) {
        var a = gameNode();
        var b = gameNode();
        a.connect(b,pathIndex);
        expectation(a,b,pathIndex);
      }
    }
    function complementaryPathIndex(pathIndex) {
      return pathIndex===0 ? 3 :
             pathIndex===3 ? 0 :
             pathIndex===1 ? 2 :
             1;
    }
    it('pathIndex를 통과시켜 다른 노드를 이 노드로 연결한다', function() {
      forEachPathIndex(function(a,b,pathIndex) {
        expect(a.getConnectedNode(pathIndex)).toBe(b);
      });
    });
    it('pathIndex의 반대로 통과시켜 다른 노드를 이 노드로 연결한다', function() {
      forEachPathIndex(function(a,b,pathIndex) {
        expect(b.getConnectedNode(complementaryPathIndex(pathIndex))).toBe(a);
      });
    });
    it('이 노드가 pathIndex에서 이미 연결되어 있으면 예외를 던진다', function() {
      var a = gameNode();
      var b = gameNode();
      var c = gameNode();
      var pathIndex = 2;
      a.connect(b,pathIndex);
      expect(function() {
        a.connect(c,pathIndex);
      }).toThrowError(a.messages.alreadyConnected);
    });
    it('다른 노드가 pathIndex 반대에서 이미 연결되어 있으면 예외를 던진다', function() {
      var a = gameNode();
      var b = gameNode();
      var c = gameNode();
      var pathIndex = 2;
      a.connect(b,pathIndex);
      expect(function() {
        c.connect(b,pathIndex);
      }).toThrowError(c.messages.alreadyConnected);
    });
  });
});