describe('ContractRegistry', function() {
  var ContractRegistry = ReliableJavaScript.ContractRegistry,
      registry,
      isArray = 'isArray',
      ary = [1,2,3];

  beforeEach(function() {
    registry = new ReliableJavaScript.ContractRegistry();
    registry.define(isArray,Array.isArray);
  });

  describe('생성', function() {
    it('new로 만들어야 한다', function() {
      expect(function() {
        ContractRegistry();
      }).toThrow(new Error(ContractRegistry.messages.newRequired));
    });
  });

  describe('define(contractName,evaluator)', function() {

    it('contractName이 문자열이 아니면 예외를 던진다', function() {
      expect(function() {
        registry.define(undefined, function() {});
      }).toThrow(new Error(ContractRegistry.messages.nameMustBeString));
    });

    it('evaluator가 함수가 아니면 예외를 던진다', function() {
      expect(function() {
        registry.define('myContract','함수 아니지롱');
      }).toThrow(new Error(ContractRegistry.messages.evaluatorMustBeFunction));
    });

    it('contractName이 문자열이고 evaluator가 함수면 예외를 던지지 않는다', function() {
      expect(function() {
        registry.define('myContract', function() {});
      }).not.toThrow();
    });

    it('체이너블한 registry를 반환한다', function() {
      expect(registry.define('x',Array.isArray)).toBe(registry);
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

    it('체이너블한 registry를 반환한다', function() {
      expect(registry.assert(isArray,ary)).toBe(registry);
    });
  });

  describe('multipleFulfills(validator,args)', function() {

    describe('인자 검사 기능', function() {

      it('validator가 문자열, 문자열 배열, 함수 중 어떤 것도 아니면 예외를 던진다', function() {
        function expectThrow(badValidator) {
          expect(function() {
            registry.multipleFulfills(badValidator,[]);
          }).toThrow(new Error(ContractRegistry.messages.validatorsInvalid));
        }
        [ undefined,
          null,
          123,
          ['xyz',0/*문자열 아님*/],
          { 'an': 0, 'object': 1 }
        ].forEach(expectThrow);
      });

      it('args가 유사 배열이 아닐 경우 예외를 던진다', function() {
        function expectThrow(badArgs) {
          expect(function() {
            registry.multipleFulfills(function() {},badArgs);
          }).toThrow(new Error(ContractRegistry.messages.argsMustBeArrayLike));
        }
        [ undefined,
          null,
          123,
          function() {},
          'a string',
          { 'an': 0, 'object': 1 },
        ].forEach(expectThrow);
      });
    });

    describe('validator가 문자열일 경우', function() {
      it('fulfills(validator,args)의 결과를 반환한다', function() {
        var validator='어떤규약명',
            args = ['a','b'],
            returnFromFulfills = 'true 아니면 false겠지';
        spyOn(registry,'fulfills').and.returnValue(returnFromFulfills);
        expect(registry.multipleFulfills(validator,args))
          .toBe(returnFromFulfills);
        expect(registry.fulfills).toHaveBeenCalledWith(validator,args);
      });
    });

    describe('validator가 배열일 경우', function() {
      it('빈 배열이면 true를 반환한다', function() {
        expect(registry.multipleFulfills([],[1,2,3]))
          .toBe(true);
      });
    });

    describe('validator가 함수일 경우', function() {
      var args = ['a','b'];

      it('args에 대한 validator의 호출 결과를 반환한다', function() {
        function isLength2() {
          return arguments.length === 2;
        }
        function isLength3() {
          return arguments.length === 3;
        }
        expect(registry.multipleFulfills(isLength2,args)).toBe(true);
        expect(registry.multipleFulfills(isLength3,args)).toBe(false);
      });

      it('registry를 콘텍스트로 validator를 호출한다', function() {
        function calledOnRegistry() {
          expect(this).toBe(registry);
        }
        registry.multipleFulfills(calledOnRegistry,args);
      });
    });
  });

  describe('attachReturnValidator(funcName, funcObj, contractName)',
  function() {
    var funcName = 'func',
        funcObj,
        returnValue = [1,2,3];

    beforeEach(function() {
      funcObj = {};
      funcObj[funcName] = function() {
        return returnValue;
      };
    });

    it('체이너블한 registry를 반환한다', function() {
      expect(registry.attachReturnValidator(funcName,funcObj,isArray))
        .toBe(registry);
    });

    describe('인자 검사 기능', function() {

      it('funcName이 문자열이 아닐 경우 예외를 던진다', function() {
        function expectThrow(contractName) {
          expect(function() {
            registry.attachReturnValidator(
              12345,funcObj,isArray);
          }).toThrow(new Error(ContractRegistry.messages.funcNameMustBeString));
        }
        [undefined, function() {},123].forEach(expectThrow);
      });

      it('funcObj가 함수가 아닐 경우 예외를 던진다', function() {
        function expectThrow(obj) {
          expect(function() {
            registry.attachReturnValidator(funcName,obj,isArray);
          }).toThrow(new Error(ContractRegistry.messages.funcObjMustBeObject));
        }
        [undefined,'abc',123].forEach(expectThrow);
      });

      it('contractName이 문자열이 아닐 경우 예외를 던진다', function() {
        function expectThrow(name) {
          expect(function() {
            registry.attachReturnValidator(funcName,funcObj,name);
          }).toThrow(new Error(ContractRegistry.messages.nameMustBeString));
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