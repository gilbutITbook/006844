var Game = Game || {};

Game.playerContracts = function playerContracts() {
  'use strict';

  return {
    getContracts: function getContracts() {
      function isPlayer(thing) {
        return typeof thing === 'object' &&
               typeof thing.getId === 'function' &&
               typeof thing.setNode === 'function' &&
               typeof thing.getNode === 'function' &&
               typeof thing.activate === 'function' &&
               typeof thing.deactivate === 'function';
      }

      return [
        { name: 'player',
          evaluator: isPlayer
        }
      ];
    },

    attachValidators: function attachValidators(registry) {
      registry.attachArgumentsValidator(
        'player', Game, ['mediatorForPlayer']);
      registry.attachReturnValidator(
        'player', Game, 'player');

      Aop.around('player', function attachAspectsToPlayer(targetInfo) {
        var instance = Aop.next(targetInfo);

        registry.attachReturnValidator(
          'getId', instance, 'nonNegativeInteger');

        registry.attachArgumentsValidator(
          'setNode', instance, ['gameNode']);

        registry.attachReturnValidator(
          'getNode', instance, 'gameNode');

        registry.attachArgumentsValidator(
          'move', instance, ['nonNegativeInteger']);
        registry.attachReturnValidator(
          'move',instance,'boolean');

          return instance;
      },Game);
    }
  };
};