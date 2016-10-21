var Conference = Conference || {};

// 싱글톤으로 구현한 컨퍼런스 애플리케이션의 ContractRegistry
Conference.ConferenceContractRegistry = (function() {

  var registry = new ReliableJavaScript.ContractRegistry();

  var contractModules = [
      Conference.attendeeContracts(),
      // 여기에 모듈을 추가한다.
    ];

  registry.defineMultiple(ReliableJavaScript.StandardContracts);

  contractModules.forEach(function(m) {
    registry.defineMultiple(m.getContracts());
  });

  contractModules.forEach(function(m) {
    m.attachValidators(registry);
  });

  return registry;
}());
