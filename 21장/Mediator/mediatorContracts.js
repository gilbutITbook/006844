var Game = Game || {};

Game.mediatorContracts = function mediatorContracts() {
  'use strict';

  return {
    getContracts: function getContracts() {
      function isMediatorForPlayer(thing) {
        return typeof thing === 'object' &&
               typeof thing.onPlayerMoved === 'function';
      }

      function isMediatorForBot(thing) {
        return typeof thing === 'object' &&
               typeof thing.onBotMoveStart === 'function';
      }

      function isMediatorForLogic(thing) {
        return isMediatorForPlayer(thing) &&
          isMediatorForBot(thing) &&
          typeof thing.onBotHit === 'function' &&
          typeof thing.endGame === 'function';
      }

      return [
        { name: 'mediatorForPlayer',
          evaluator: isMediatorForPlayer
        },
        { name: 'mediatorForBot',
          evaluator: isMediatorForBot
        },
        { name: 'mediatorForLogic',
          evaluator: isMediatorForLogic
        }
      ];
    },

    attachValidators: function attachValidators(registry) {

      registry.attachReturnValidator(
        'mediator', Game, 'mediatorForPlayer');
      registry.attachReturnValidator(
        'mediator', Game, 'mediatorForBot');
      registry.attachReturnValidator(
        'mediator', Game, 'mediatorForLogic');
    }
  };
};