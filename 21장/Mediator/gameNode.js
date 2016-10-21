var Game = Game || {};

// 플레이어가 넘나들 노드를 만든다.
// normalPoint는 Game.normalPoint, undefined 둘 중 하나인데,
// undefined일 경우 위치를 아무렇게나 만든다.
Game.gameNode = function gameNode(normalPoint) {
  'use strict';

  var point = normalPoint || Game.normalPoint(),
      connectedNodes = [];

  function oneWayConnect(node,otherNode,pathIndex) {
    if (node.getConnectedNode(pathIndex)) {
      throw  new Error(node.messages.alreadyConnected);
    }
    node.setConnectedNode(otherNode,pathIndex);
  }
  var ret = {
    getPoint: function getPoint() {
      return point;
    },

    getConnectedNode: function getConnectedNode(pathIndex) {
      return connectedNodes[pathIndex];
    },

    setConnectedNode: function setConnectedNode( node,pathIndex) {
      connectedNodes[pathIndex] = node;
    },

    // pathIndex에서 otherNode와 양방향으로 연결한다.
    // 이 노드와 otherNode가 pathIndex에서 이미 연결된 상태면 예외를 던진다.
    connect: function connect(otherNode, pathIndex) {
      oneWayConnect(ret,otherNode, pathIndex);
      oneWayConnect(otherNode,ret,Game.pathIndex.complementaryIndex(pathIndex));
    },

    messages: {
      alreadyConnected: '해당 경로 인덱스에서 이미 연결된 상태입니다.'
    }
  };

  return ret;
};