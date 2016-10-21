var Game = Game || {};

Game.normalPointContracts = function normalPointContracts() {
  'use strict';

  return {
    getContracts: function getContracts() {
      function isNormalCoordinate(thing) {
        return typeof thing === 'number' &&
               thing >= 0 &&
               thing < 1;
      }

      function isNormalPoint(thing) {
        return typeof thing === 'object' &&
               isNormalCoordinate(thing.x) &&
               isNormalCoordinate(thing.y);
      }

      return [
        { name: 'normalCoordinate',
          evaluator: isNormalCoordinate
        },
        { name: 'normalPoint',
          evaluator: isNormalPoint
        }
      ];
    },

    attachValidators: function attachValidators(registry) {
      // 생성자 인자는 필수가 아니지만,
      // 주어질 경우 모두 normalCoordinates여야 한다.
      registry.attachArgumentsValidator('normalPoint', Game,
        [ 'undefined,undefined',
          'normalCoordinate,undefined',
          'undefined,normalCoordinate',
          'normalCoordinate','normalCoordinate' ]);

      registry.attachReturnValidator('normalPoint',Game,'normalPoint');
    }
  };
};