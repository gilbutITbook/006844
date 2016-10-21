describe('contractRegistry', function() {
  'use strict';
  var registry,
      isArray = 'isArray',
      ary = [1,2,3];

  beforeEach(function() {
    registry = ReliableJavaScript.contractRegistry();
    registry.define(isArray,Array.isArray);
  });

  describe('define(contractName,evaluator)', function() {

    it('규약명(contractName)이 문자열이 아니면 예외를 던진다', function() {
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

    it('객체가 규약을 지키면 true를 반환한다', function() {
      expect(registry.fulfills(isArray,ary)).toBe(true);
    });
    it('객체가 규약을 위반하면 false를 반환한다', function() {
      expect(registry.fulfills(isArray,'not an array')).toBe(false);
    });
  });

  describe('assert(contractName, obj)', function() {
    it('fulfills(contractName, obj)에 기반을 둔다', function() {
      spyOn(registry,'fulfills').and.callThrough();
      registry.assert(isArray,ary);
      expect(registry.fulfills).toHaveBeenCalledWith(isArray,ary);
    });
    it('객체가 규약을 지키면 예외를 던지지 않는다', function() {
      registry.assert(isArray,ary);
    });
    it('객체가 규약을 위반하면 예외를 던진다', function() {
      var notAnArray = 'abc';
      expect(function() {
        registry.assert(isArray,notAnArray);
      }).toThrow(new Error(
        registry.getMessageForFailedContract(isArray,notAnArray)));
    });
  });

  describe('attachReturnValidator(funcName, funcObj, contractName)', function() {
    var funcName = 'func',
        funcObj,
        returnValue = [1,2,3];

    beforeEach(function() {
      funcObj = {},
      funcObj[funcName] = function() {
        return returnValue;
      };
    });
    describe('인자 검사 기능', function() {

      it('funcName이 문자열이 아닐 경우 예외를 던진다', function() {
        function expectThrow(contractName) {
          expect(function() {
            registry.attachReturnValidator(
              12345,funcObj,isArray);
          }).toThrow(new Error(registry.messages.funcNameMustBeString));
        }
        [undefined, function() {},123].forEach(expectThrow);
      });

      it('funcObj가 함수가 아닐 경우 예외를 던진다', function() {
        function expectThrow(obj) {
          expect(function() {
            registry.attachReturnValidator(funcName,obj,isArray);
          }).toThrow(new Error(registry.messages.funcObjMustBeObject));
        }
        [undefined,'abc',123].forEach(expectThrow);
      });

      it('contractName이 문자열이 아닐 경우 예외를 던진다', function() {
        function expectThrow(name) {
          expect(function() {
            registry.attachReturnValidator(funcName,funcObj,name);
          }).toThrow(new Error(registry.messages.nameMustBeString));
        }
        [ undefined,
          123,
          function() {},
          []
        ].forEach(expectThrow);
      });
    });

    describe('애스팩트 기능', function() {

      it('반환값이 규약을 지키면 이를 반환한다', function() {
        registry.attachReturnValidator(funcName,funcObj,isArray);
        expect(funcObj[funcName]()).toEqual(returnValue);
      });

      it('반환값이 규약을 위반하면 예외를 던진다', function() {
        var isNumber = 'isNumber';
        registry.define(isNumber, function isNumber(ret) {
          return typeof ret === 'number';
        });
        registry.attachReturnValidator(funcName, funcObj, isNumber);
        expect(function() {
          funcObj[funcName]();
        }).toThrow(new Error(
          registry.getMessageForFailedContract(isNumber,returnValue)));
      });
    });
  });
});