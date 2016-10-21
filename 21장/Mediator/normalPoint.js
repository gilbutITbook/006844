var Game = Game || {};

// NormalPoint는 0과 1 사이(0은 포함, 1은 배제)의 x, y 값으로,
// xNormal과 yNormal은 반드시 이 범위 안에 있는 값이다.
// 어느 하나, 또는 둘 다 없을 경우, 임의의 위치를 만들어 대입한다.
Game.normalPoint = function(xNormal,yNormal) {
  'use strict';

  function makeCoordinate(c) {
    return c === undefined ? Math.random() : c;
  }

  return {
    x: makeCoordinate(xNormal),
    y: makeCoordinate(yNormal)
  };
};
