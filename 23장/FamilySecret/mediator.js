var Game = Game || {};

Game.mediator = function mediator() {
  'use strict';

  // magicKey는 mediator 가족들만 공유하는 기밀로,
  // 재생성이 불가능한 프라이빗 객체를 가리키는 프라이빗 참조체다.
  var magicKey = {},

      // 게임 로직(규칙)을 캡슐화한다
      // 여기서는 gameLogic이 magicKey를 바라볼 수 있도록
      // mediator 안에 넣는다.
      gameLogic = function gameLogic(mediator, rows, columns) {

        return {

          // 플레이어의 움직임을 현재 노드에 반영하고
          // 필요 시 게임을 끝낸다.
          onPlayerMoved: function onPlayerMoved(key, player) {
            if (key !== magicKey) {
              throw new Error('이 함수는 오직 mediator만 호출할 수 있습니다.');
            }
            // 플레이어 움직임에 따른
            // 게임 로직을 여기에 넣는다.
          }

          /*** 다른 함수들 줄임 ***/
        };
      },

      // 반환할 중재자
      med = {

        // 플레이어 이동 시 이 함수를 호출한다. 중재자는 다른 콤포넌트들에게 알린다.
        onPlayerMoved: function onPlayerMoved(player) {
          logic.onPlayerMoved(magicKey, player);
          display.onPlayerMoved(player);
        },

        /*** 다른 함수들 줄임 ***/
      },

      svgElement = document.getElementById('gameSvg');

  logic = Game.gameLogic(med,6,7);
  display = Game.svgDisplay(med,svgElement,logic);

  return med;
};