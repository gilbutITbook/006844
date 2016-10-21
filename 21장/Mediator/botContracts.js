var Game = Game || {};

Game.botContracts = function botContracts() {
  'use strict';
  return {
    getContracts: function getContracts(registry) {
      function isBot(thing) {
        return typeof thing === 'object' &&
               typeof thing.getId === 'function' &&
               typeof thing.setNode === 'function' &&
               typeof thing.getNode === 'function' &&
               typeof thing.setMoveInterval === 'function';
      }

      function isGameNodeOrUndefined(thing) {
        return typeof thing === 'undefined' ||
          registry.fulfills('gameNode',thing);
      }

      return [
        { name: 'bot',
          evaluator: isBot
        },
        { name: 'gameNodeOrUndefined',
          evaluator: isGameNodeOrUndefined
        }
      ];
    },

    attachValidators: function attachValidators(registry) {
      registry.attachArgumentsValidator(
        'bot', Game, ['mediatorForBot']);
      registry.attachReturnValidator(
        'bot', Game, 'bot');

      Aop.around('bot', function attachAspectsToBot(targetInfo) {
        var instance = Aop.next(targetInfo);

        registry.attachReturnValidator(
          'getId', instance, 'nonNegativeInteger');

        registry.attachArgumentsValidator(
          'setNode', instance, ['gameNodeOrUndefined']);

        registry.attachReturnValidator(
          'getNode', instance, 'gameNodeOrUndefined');

        registry.attachArgumentsValidator(
          'setMoveInterval', instance, ['positiveInteger']);

          return instance;
      },Game);
    }
  };
};