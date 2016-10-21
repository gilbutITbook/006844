var Game = Game || {};

// 싱글톤으로 구현한 게임의 ContractRegistry
Game.ConferenceContractRegistry = (function() {
  'use strict';

  var registry = new ReliableJavaScript.ContractRegistry();

  var contractModules = [
      Game.normalPointContracts(),
      Game.gameNodeContracts(),
      Game.playerContracts(),
      Game.botContracts(),
      Game.gameLogicContracts(),
      Game.mediatorContracts(),
      // 여기에 모듈을 추가한다.
    ];

  registry.defineMultiple(ReliableJavaScript.StandardContracts);

  contractModules.forEach(function(m) {
    registry.defineMultiple(m.getContracts(registry));
  });

  contractModules.forEach(function(m) {
    m.attachValidators(registry);
  });

  return registry;
}());