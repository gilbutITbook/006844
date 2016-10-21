var Game = Game || {};

// 게임 로직(규칙)을 캡슐화한다
Game.gameLogic = function gameLogic(mediator, rows, columns) {
  'use strict';

  var numNodes = rows*columns,

      players = [],
      bots = [],
      nodes = [],
      numPlayers = 2,
      numBots = 5,
      pathIndex = Game.pathIndex, // 에일리어스
      numPaths = Game.pathIndex.count,
      nodeIx,
      ix,
      safeBots = []; // 현재 이동 중인, 즉 안전한 봇들

  // 보드를 생성하고 노드를 연결한다.
  (function() {
    var ixRow, ixColumn, point, node,
        rowSpacing = 1 / (rows+1),
        columnSpacing = 1 / (columns+1);
    for (ixRow=0; ixRow<rows; ++ixRow) {
      for (ixColumn = 0; ixColumn<columns; ++ixColumn) {
        point = Game.normalPoint((ixColumn+1)*columnSpacing, (ixRow+1)*rowSpacing);
        node = Game.gameNode(point);
        nodes.push(node);
        // 이전 열과 연결한다.
        if (ixColumn>0) {
          node.connect(nodes[nodes.length-2],pathIndex.left);
        }
        // 이전 행과 연결한다.
        if (ixRow>0) {
          node.connect(nodes[nodes.length-1-columns],pathIndex.up);
        }
      }
    }
  }());

  // 플레이어를 생성하고 노드 어딘가에 배치한다.
  (function() {
    for (ix=0; ix<numPlayers; ++ix) {
      var plyr = Game.player(mediator);
      nodeIx = numNodes/(ix+1) - 1;
      plyr.setNode(nodes[nodeIx]);
      players.push(plyr);
    }
  }());

  // 봇들을 아무데나 만들어 배치한다.
  (function() {
  for (ix=0; ix<numBots; ++ix) {
    var bot = Game.bot(mediator);
    nodeIx = Math.floor(Math.random()*numNodes);
    bot.setNode(nodes[nodeIx]);
    bots.push(bot);
    bot.setMoveInterval(7+Math.floor(Math.random()*5));
  }
  }());

  function isBotSafe(bot) {
    return safeBots.indexOf(bot) >= 0;
  }

  function makeBotSafe(bot) {
   if (!isBotSafe(bot)) {
      safeBots.push(bot);
   }
  }

  function makeBotUnsafe(bot) {
    var ix = safeBots.indexOf(bot);
    if (ix>=0) {
      safeBots.splice(ix,1);
    }
  }

  var ret = {

    getPlayers: function getPlayers() {
      return players;
    },

    getBots: function getBots() {
      return bots;
    },

    getNodes: function getNodes() {
      return nodes;
    },

    getNumPaths: function getNumPaths() {
      return numPaths;
    },

    // 플레이어의 움직임을 현재 노드에 반영하고
    // 필요 시 게임을 끝낸다.
    onPlayerMoved: function onPlayerMoved(player) {
      var ix;
      for (ix=0; ix<numBots; ++ix) {
        if (player.getNode() === bots[ix].getNode() &&
         !isBotSafe(bots[ix])) {
          mediator.onBotHit(bots[ix]);
        }
      }
    },

    // 봇을 이동하기 시작한다. 이동 중에는 봇이 안전하므로
    // 시작과 끝 이벤트를 각각 떼어놓았다.
    onBotMoveStart: function onBotMoveStart(bot) {
      var botsEliminated = 0;
      if (bot.getNode() === undefined) {
        bots.forEach(function(b) {
          if (b.getNode() === undefined) {
            ++botsEliminated;
          }
        });
        if (botsEliminated >= numBots) {
          mediator.endGame();
        }
      } else {
        makeBotSafe(bot);
      }
    },

    // 봇 이동을 끝낸다. 이 봇이 안전한 곳은 이제 없다.
    onBotMoveEnd: function onBotMoveEnd(bot) {
      makeBotUnsafe(bot);
    }
  };

  return ret;
};