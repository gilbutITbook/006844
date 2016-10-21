var Game = Game || {};

Game.gameNodeContracts = function gameNodeContracts() {
  'use strict';

  return {
    getContracts: function getContracts() {
      function isGameNode(thing) {
        return typeof thing === 'object' &&
               typeof thing.getPoint === 'function' &&
               typeof thing.getConnectedNode === 'function' &&
               typeof thing.setConnectedNode === 'function' &&
               typeof thing.connect === 'function';
      }

      return [
        { name: 'gameNode',
          evaluator: isGameNode
        }
      ];
    },

    attachValidators: function attachValidators(registry) {
      registry.attachArgumentsValidator(
        'gameNode', Game, ['undefined','normalPoint']);
      registry.attachReturnValidator(
        'gameNode', Game, 'gameNode');

      Aop.around('gameNode', function attachAspectsToGameNode(targetInfo) {
        var instance = Aop.next(targetInfo);

        registry.attachReturnValidator(
          'getPoint',instance,'normalPoint');
        registry.attachArgumentsValidator(
          'getConnectedNode', instance, ['nonNegativeInteger']);
        registry.attachArgumentsValidator(
          'setConnectedNode', instance, ['gameNode,nonNegativeInteger']);
        registry.attachArgumentsValidator(
          'connect', instance, ['gameNode,nonNegativeInteger']);

          return instance;
      },Game);
    }
  };
};