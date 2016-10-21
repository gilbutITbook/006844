var ReliableJavaScript = ReliableJavaScript || {};
ReliableJavaScript.contractRegistry = function() {
  'use strict';

  return {
    define: function define(contractName, evaluator) {
      if (typeof contractName !== 'string') {
        throw new Error(this.messages.nameMustBeString);
      }
      if (typeof evaluator !== 'function') {
        throw new Error(this.messages.evaluatorMustBeFunction);
      }
    },

    messages: {
      nameMustBeString: '규약명은 문자열이어야 합니다',
      evaluatorMustBeFunction: '평가기는 함수만 가능합니다',
    }
  };
};