Game = Game || {};

// svgElement는 document.getElementByID과 비슷한 SVG DOM 요소다.
// board는 Game.gameLogic 객체다.
Game.svgDisplay =
function svgDisplay(mediator, svgElement, board) {
  'use strict';

  var svgNS = "http://www.w3.org/2000/svg",
      nodeRadius = 5,
      playerRadius = 20,
      botRadius = 10,
      numPaths = board.getNumPaths(),
      pathColors = ['ForestGreen','DarkMagenta'],
      playerColors = ['Navy','DeepPink'],
      botColors = ['White','Yellow', 'LawnGreen','HotPink','Red'],
      playerElements = [], // 인덱스는 player.getId(), 값은 원소다.
      botElements = [];

  function scaleToHeight(normalUnit) {
    return Math.floor(normalUnit * svgElement.getBoundingClientRect().height);
  }
  function scaleToWidth(normalUnit) {
    return Math.floor(normalUnit * svgElement.getBoundingClientRect().width);
  }
  function addGameNode(node) {
    var elem = document.createElementNS(svgNS,"circle"),
        normalPoint = node.getPoint();
    elem.setAttributeNS(null,"cx",scaleToWidth(normalPoint.x));
    elem.setAttributeNS(null,"cy",scaleToHeight(normalPoint.y));
    elem.setAttributeNS(null,"r",nodeRadius);
    elem.setAttributeNS(null,"fill","black");
    elem.setAttributeNS(null,"stroke","none");
    svgElement.appendChild(elem);
  }

  function drawPathsToRightOrDown(node) {
    var ix,
        x = node.getPoint().x,
        y = node.getPoint().y,
        x1 = scaleToWidth(x),
        y1 = scaleToHeight(y),
        elem;
    for (ix=0; ix<numPaths; ++ix) {
      var connectedNode = node.getConnectedNode(ix);
      if (connectedNode && connectedNode.getPoint().x > x ||
          connectedNode && connectedNode.getPoint().x===x &&
                           connectedNode.getPoint().y > y) {
        var x2 = scaleToWidth(connectedNode.getPoint().x),
            y2 = scaleToHeight(connectedNode.getPoint().y),
            color = pathColors[ix%pathColors.length];
        elem = document.createElementNS(svgNS,"line");
        elem.setAttributeNS(null,"x1",x1);
        elem.setAttributeNS(null,"y1",y1);
        elem.setAttributeNS(null,"x2",x2);
        elem.setAttributeNS(null,"y2",y2);
        elem.setAttributeNS(null,"style","stroke:"+color+";stroke-width:3px" );
        svgElement.appendChild(elem);
      }
    }
  }

  function placeThing(thing, elementArray, radius, fill, stroke, opacity) {
    var elem = document.createElementNS(svgNS,"circle"),
        normalPoint = thing.getNode().getPoint();
    elem.setAttributeNS(null, "cx", scaleToWidth(normalPoint.x));
    elem.setAttributeNS(null, "cy", scaleToHeight(normalPoint.y));
    elem.setAttributeNS(null,"r",radius);
    elem.setAttributeNS(null,"fill",fill);
    elem.setAttributeNS(null,"opacity",opacity);
    elem.setAttributeNS(null,"stroke",stroke);
    elementArray[thing.getId()] = elem;
    svgElement.appendChild(elem);
  }

  function placePlayer(player) {
    var ix = Object.keys(playerElements).length;
    placeThing(player, playerElements,
      playerRadius, playerColors[ix], "none", "0.7");
  }

  function placeBot(bot, ixBot) {
    var color = botColors[ixBot%botColors.length];
    placeThing(bot, botElements,
      botRadius, color, "black", "0.85");
  }

  function moveThing(thing, elementArray, whenDone) {
      var elem = elementArray[thing.getId()],
        startX = elem.getAttribute("cx"),
        startY = elem.getAttribute("cy"),
        node = thing.getNode(),
        // 봇 노드가 undefined로 세팅되면 보드에서 봇을 치운다.
        endX = scaleToWidth( node === undefined ? 1.1 : node.getPoint().x),
        endY = scaleToHeight(node === undefined ? 1.1 : node.getPoint().y),
        totalTime = (node === undefined ? 1000 : 160), // 밀리 초
        interval = 10,
        intervals = totalTime / interval,
        xMovePerInterval = (endX-startX)/intervals,
        yMovePerInterval = (endY-startY)/intervals,
        timerFunction = null;

    if (node === undefined) {
      console.log(endX);
    }
    function startAnimation() {
      if (timerFunction === null) {
          timerFunction = setInterval(animate, interval);
      }
    }

    function stopAnimation() {
      if (timerFunction !== null) {
          clearInterval(timerFunction);
          timerFunction = null;
      }
      if (whenDone !== undefined) {
        whenDone();
      }
    }

    function animate() {
      var x = parseInt(elem.getAttribute("cx")) + xMovePerInterval,
          y = parseInt(elem.getAttribute("cy")) + yMovePerInterval;
      if (endX>startX && x>endX ||
          endX<startX && x<endX ||
          endY>startY && y>endY ||
          endY<startY && y<endY) {
        x = endX;
        y = endY;
      }
      elem.setAttribute("cx", x);
      elem.setAttribute("cy", y);
      if (x===endX && y===endY) {
        stopAnimation();
      }
    }

    startAnimation();
  }

  board.getNodes().forEach(addGameNode);
  board.getNodes().forEach(drawPathsToRightOrDown);
  board.getPlayers().forEach(placePlayer);
  board.getBots().forEach(placeBot);

  return {

    // 플레이어가 이동해야 할 노드로 옮긴다.
    onPlayerMoved: function onPlayerMoved(player) {
      moveThing(player, playerElements);
    },

    onBotMoveStart: function onBotMoveStart(bot) {
       moveThing(bot, botElements, function doneMovingBot() {
        mediator.onBotMoveEnd(bot);
      });
    },

    endGame: function endGame(millisecondsToWin) {
      alert("봇을 모두 " +
          millisecondsToWin/1000 + " 초만에 제거하였습니다!!");
    }
  };
};