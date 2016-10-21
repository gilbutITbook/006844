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

    assert: function assert(contractName,obj) {
      if (!this.fulfills(contractName,obj)) {
        throw new Error(this.getMessageForFailedContract(contractName,obj));
      }
    },

    attachReturnValidator: function attachReturnValidator(funcName, funcObj, contractName) {
      var self = this;
      if (typeof funcName !== 'string') {
        throw new Error(self.messages.funcNameMustBeString);
      }
      if (typeof funcObj !== 'object') {
        throw new Error(self.messages.funcObjMustBeObject);
      }
      if (typeof contractName !== 'string') {
        throw new Error(self.messages.nameMustBeString);
      }

      Aop.around(funcName,
        function(targetInfo) {
          var ret = Aop.next(targetInfo);
          self.assert(contractName,ret);
          return ret;
        }, funcObj);
    },

    messages: {
      nameMustBeString: '규약명은 문자열이어야 합니다',
      evaluatorMustBeFunction: '평가기는 함수만 가능합니다',
      nameMustBeRegistered: "'_'은 레지스트리에 없는 규약입니다",
      funcNameMustBeString: '함수명은 반드시 공백 아닌 문자열이어야 합니다',
      funcObjMustBeObject: '장식할 객체는 반드시 객체여야 합니다',
      namesMustBeStringArray:
        'contractNames 인자는 문자열 또는 undefined의 배열이어야 합니다',
      failedContract: "다음 객체는 '_' 규약 위반입니다: "
    },

    getMessageForNameNotRegistered: function getMessageForNameNotRegistered(
    contractName) {
      return this.messages.nameMustBeRegistered.replace('_',contractName);
    },

    getMessageForFailedContract: function getMessageForFailedContract(
    contractName, obj) {
      return this.messages.failedContract
          .replace('_',contractName)+ obj;
    }
  };
};