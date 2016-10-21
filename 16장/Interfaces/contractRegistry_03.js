var ReliableJavaScript = ReliableJavaScript || {};
ReliableJavaScript.contractRegistry = function() {
  'use strict';
  var registry = {};

  return {
    define: function define(contractName, evaluator) {
      if (typeof contractName !== 'string') {
        throw new Error(this.messages.nameMustBeString);
      }
      if (typeof evaluator !== 'function') {
        throw new Error(this.messages.evaluatorMustBeFunction);
      }
      registry[contractName] = evaluator;
    },

    fulfills: function fulfills(contractName, obj) {
      if (!registry[contractName]) {
        throw new Error(this.getMessageForNameNotRegistered(contractName));
      }
      return registry[contractName](obj);
    },

    messages: {
      nameMustBeString: '규약명은 문자열이어야 합니다',
      evaluatorMustBeFunction: '평가기는 함수만 가능합니다',
      nameMustBeRegistered: "'_'은 레지스트리에 없는 규약입니다",
    },

    getMessageForNameNotRegistered: function getMessageForNameNotRegistered(
    contractName) {
      return this.messages.nameMustBeRegistered.replace('_',contractName);
    },
  };
};