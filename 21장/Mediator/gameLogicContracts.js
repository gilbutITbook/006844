var Game = Game || {};

Game.gameLogicContracts = function gameLogicContracts() {
  'use strict';

  return {
    getContracts: function getContracts(registry) {
      function isGameLogic(thing) {
        return typeof thing === 'object' &&
               typeof thing.getPlayers === 'function' &&
               typeof thing.getBots === 'function' &&
               typeof thing.getNodes === 'function' &&
               typeof thing.getNumPaths === 'function' &&
               typeof thing.onPlayerMoved === 'function' &&
               typeof thing.onBotMoveStart === 'function' &&
               typeof thing.onBotMoveEnd === 'function';
      }

      function isArrayOfContractFulfillers(thing, contract) {
        if (!Array.isArray(thing)) {
          return false;
        }
        for (var ix=0; ix<thing.length; ++ix) {
          if (!registry.fulfills(contract,thing[ix])) {
            return false;
          }
        }
        return true;
      }

      function isEvenIntegerAtLeast2(thing) {
        return !isNaN(thing) &&
          (function(x) { return (x | 0) === x; })(parseFloat(thing)) &&
          thing >= 2 &&
          thing % 2 === 0;
      }

      return [
        { name: 'gameLogic',
          evaluator: isGameLogic
        },
        { name: 'arrayOfGameNodes',
          evaluator: function(thing) {
            return isArrayOfContractFulfillers(thing,'gameNode');
          }
        },
        { name: 'arrayOfPlayers',
          evaluator: function(thing) {
            return isArrayOfContractFulfillers(thing,'player');
          }
        },
        { name: 'arrayOfBots',
          evaluator: function(thing) {
            return isArrayOfContractFulfillers(thing,'bot');
          }
        },
        { name: 'evenIntegerAtLeast2',
          evaluator: isEvenIntegerAtLeast2
        }
      ];
    },

    attachValidators: function attachValidators(registry) {
      registry.attachArgumentsValidator(
        'gameLogic', Game,
          ['mediatorForLogic,positiveInteger,positiveInteger']);
      registry.attachReturnValidator(
        'gameLogic', Game, 'gameLogic');

      Aop.around('gameLogic', function attachAspectsToGameLogic(targetInfo) {
        var instance = Aop.next(targetInfo);

        registry.attachReturnValidator(
          'getPlayers',instance,'arrayOfPlayers');

        registry.attachReturnValidator(
          'getBots',instance,'arrayOfBots');

        registry.attachReturnValidator(
          'getNodes',instance,'arrayOfGameNodes');

        registry.attachReturnValidator(
          'getNumPaths', instance, 'nonNegativeInteger');

        registry.attachArgumentsValidator(
          'onPlayerMoved', instance, ['player']);

        registry.attachArgumentsValidator(
          'onBotMoveStart', instance, ['bot']);

        registry.attachArgumentsValidator(
          'onBotMoveEnd', instance, ['bot']);

          return instance;
      },Game);
    }
  };
};