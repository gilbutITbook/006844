describe('contractRegistry', function() {
  'use strict';
  var registry;

  beforeEach(function() {
    registry = ReliableJavaScript.contractRegistry();
  });

  describe('define(contractName,evaluator)', function() {

    it('contractName이 문자열이 아니면 예외를 던진다', function() {
      expect(function() {
        registry.define(undefined, function() {});
      }).toThrow(new Error(registry.messages.nameMustBeString));
    });

    it('evaluator가 함수가 아니면 예외를 던진다', function() {
      expect(function() {
        registry.define('myContract','함수 아니지롱');
      }).toThrow(new Error(registry.messages.evaluatorMustBeFunction));
    });

    it('contractName이 문자열이고 evaluator가 함수면 예외를 던지지 않는다', function() {
      expect(function() {
        registry.define('myContract', function() {});
      }).not.toThrow();
    });
  });

  describe('fulfills(contractName,obj)', function() {

    it('contractName이 레지스트리에 없으면 예외를 던진다', function() {
      function expectThrow(contractName) {
        expect(function() {
          registry.fulfills(contractName,{});
        }).toThrow(new Error(
          registry.getMessageForNameNotRegistered(contractName)));
      }
      [undefined,'abc'].forEach(expectThrow);
    });
  });
});