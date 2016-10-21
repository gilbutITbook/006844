var Game = Game || {};

Game.bot = function bot(mediator) {
  'use strict';
  var node,
  id = (Game.bot.nextId === undefined ? Game.bot.nextId=0 : ++Game.bot.nextId),
  maxPathIx = 3;

  var me = {
    getId: function() {
      return id;
    },

    // 봇의 노드를 설정한다.
    // 봇이 보드에 없을 경우 설정값은 undefined다.
    setNode: function setNode(gameNode) {
      node = gameNode;
    },

    getNode: function getNode() {
      return node;
    },

    // 봇을 매 1/10초마다 움직이게 한다
    setMoveInterval: function setMoveInterval(frequencyInTenths) {
      setInterval(function moveTimer() {
        var pathIx,
            choiceIx,
            availablePaths = [];
        if (me.getNode() === undefined) {
          return;
        }
        for (pathIx=0; pathIx<=maxPathIx; ++pathIx) {
          if (node.getConnectedNode(pathIx)) {
            availablePaths.push(pathIx);
          }
        }
        choiceIx=Math.floor(Math.random()*availablePaths.length);
        pathIx = availablePaths[choiceIx];
        me.setNode(node.getConnectedNode(pathIx));
        mediator.onBotMoveStart(me);
      },frequencyInTenths*1000/10);
    },
  };

  return me;
};