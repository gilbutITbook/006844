var Game = Game || {};

Game.player = function player(mediator) {
  'use strict';

  var me,
      node,
      id = (Game.player.nextId === undefined ?
            Game.player.nextId=0 :
            ++Game.player.nextId),
      listenEvent = "keydown",
      elementWithKeydownAttached,
      // 첫 번째 플레이어는 1-4키를 쓴다 (키코드: 49-52)
      // 두 번째 플레이어는 6-9키를 쓴다 (키코드: 54-58)
      keycodeForPath0 = id%2 ? 54 : 49;

  function handleKeydown(e) {
    var pathIx = e.keyCode - keycodeForPath0;
    if (pathIx>=0 && pathIx < Game.pathIndex.count) {
      me.move(pathIx);
    }
  }

  me = {
    getId: function() {
      return id;
    },

    setNode: function setNode(gameNode) {
      node = gameNode;
    },

    getNode: function getNode() {
      return node;
    },

    activate: function activate(elementForKeydown) {
      elementWithKeydownAttached = elementForKeydown;
      elementWithKeydownAttached.addEventListener(listenEvent,handleKeydown);
    },

    deactivate: function deactivate() {
      if (elementWithKeydownAttached) {
        elementWithKeydownAttached.removeEventListener(
            listenEvent,handleKeydown);
      }
    },

    // pathIndex로 주어진 경로를 따라 플레이어를 이동시켜본다.
    // 이동의 성공 여부를 true/false로 반환한다.
    move: function move(pathIndex) {
      if (node.getConnectedNode(pathIndex)) {
        me.setNode(node.getConnectedNode(pathIndex));
        mediator.onPlayerMoved(me);
        return true;
      }
      return false;
    }
  };

  return me;
};