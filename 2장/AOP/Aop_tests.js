describe('Aop', function() {
  var targetObj,
      targetFnReturn = 123,
      executionPoints,  // 실행 이벤트가 담긴 배열
      argPassingAdvice, // 타깃에 인자를 전달할 어드바이스
      argsToTarget;     // targetObj.targetFn에 전달할 인자들

      Target = function() {
        var self = this;
        this.targetFn = function() {
          expect(this).toBe(self);
        };
      };

  beforeEach(function() {
    targetObj = {
      targetFn: function() {
        executionPoints.push('targetFn');
        argsToTarget = Array.prototype.slice.call(arguments,0);
        return targetFnReturn;
      }
    };

    executionPoints = [];

    argPassingAdvice = function(targetInfo) {
      return targetInfo.fn.apply(this, targetInfo.args);
    };

    argsToTarget = [];
  });

  describe('Aop.around(fnName, advice, targetObj)', function() {

    it('타깃 함수를 호출 시 어드바이스를 실행하도록 한다', function() {
      var executedAdvice = false;
      var advice = function() {
        executedAdvice = true;
      };
      Aop.around('targetFn', advice, targetObj);
      targetObj.targetFn();
      expect(executedAdvice).toBe(true);
    });

    it('어드바이스가 타깃 호출을 래핑한다', function() {
      var wrappingAdvice = function(targetInfo) {
        executionPoints.push('wrappingAdvice - 처음');
        targetInfo.fn();
        executionPoints.push('wrappingAdvice - 끝');
      };
      Aop.around('targetFn', wrappingAdvice, targetObj);
      targetObj.targetFn();
      expect(executionPoints).toEqual(
        ['wrappingAdvice - 처음','targetFn','wrappingAdvice - 끝']);
    });

    it('마지막 어드바이스가 기존의 어드바이스들에 대해 실행되는 방식으로 체이닝이 가능하다', function() {
      var adviceFactory = function(adviceID) {
        return (function(targetInfo) {
          executionPoints.push('wrappingAdvice - 처음 '+adviceID);
          targetInfo.fn();
          executionPoints.push('wrappingAdvice - 끝 '+adviceID);
        });
      };
      Aop.around('targetFn',adviceFactory('안쪽'),targetObj);
      Aop.around('targetFn',adviceFactory('바깥쪽'),targetObj);
      targetObj.targetFn();
      expect(executionPoints).toEqual([
        'wrappingAdvice - 처음 바깥쪽',
        'wrappingAdvice - 처음 안쪽',
        'targetFn',
        'wrappingAdvice - 끝 안쪽',
        'wrappingAdvice - 끝 바깥쪽']);
    });

    it('어드바이스에서 타깃으로 일반 인자를 넘길 수 있다', function() {
      Aop.around('targetFn', argPassingAdvice, targetObj);
      targetObj.targetFn('a','b');
      expect(argsToTarget).toEqual(['a','b']);
    });

    it("타깃의 반환값도 어드바이스에서 참조할 수 있다", function() {
      Aop.around('targetFn', argPassingAdvice, targetObj);
      var returnedValue = targetObj.targetFn();
      expect(returnedValue).toBe(targetFnReturn);
    });

    it('타깃 함수를 해당 객체의 콘텍스트에서 실행한다', function() {
      var Target = function() {
        var self = this;
        this.targetFn = function() {
          expect(this).toBe(self);
        };
      };
      var advice = function(targetInfo) {
        //targetInfo.fn();
        Aop.next.call(this,targetInfo);
      };
      var targetInstance = new Target();
      var spyOnInstance = spyOn(targetInstance,'targetFn').and.callThrough();
      Aop.around('targetFn',advice,targetInstance);
      targetInstance.targetFn();
      expect(spyOnInstance).toHaveBeenCalled();
    });

    it('어드바이스를 타깃의 콘텍스트에서 실행한다', function() {
      var advice = function() {
        expect(this).toBe(targetObj);
      };
      Aop.around('targetFn',advice,targetObj);
      targetObj.targetFn();
    });
  });

  describe('Aop.next(context,targetInfo)', function() {
    var advice = function(targetInfo) {
      return Aop.next.call(this,targetInfo);
    };
    var originalFn;
    beforeEach(function() {
      originalFn = targetObj.targetFn;
      Aop.around('targetFn',advice, targetObj);
    });
    it('targetInfo.fn에 있는 함수를 호출한다', function() {
        targetObj.targetFn();
        expect(executionPoints).toEqual(['targetFn']);
    });
    it('targetInfo.args에 인자를 전달한다', function() {
        targetObj.targetFn('a','b');
        expect(argsToTarget).toEqual(['a','b']);
    });
    it("targetInfo 함수에서 받은 값을 반환한다", function() {
        var ret = targetObj.targetFn();
        expect(ret).toEqual(targetFnReturn);
    });
    it('주어진 콘텍스트에서 타깃 함수를 실행한다', function() {
        var targetInstance = new Target();
        var spyOnInstance = spyOn(targetInstance,'targetFn').and.callThrough();
        Aop.around('targetFn',advice,targetInstance);
        targetInstance.targetFn();
        expect(spyOnInstance).toHaveBeenCalled();
    });
  });

  describe('Aop.before(fnName, advice, targetObj)', function () {
    describe('어드바이스가 성공할 경우', function() {

      it('타깃 함수를 호출하면 어드바이스를 타깃 다음에 실행한다', function() {
        var advice = function() {
           executionPoints.push('successfulAdvice');
        };
        Aop.before('targetFn',advice,targetObj);
        targetObj.targetFn();
        expect(executionPoints).toEqual(['successfulAdvice','targetFn']);
      });

      it('어드바이스에 인자를 전달한다', function() {
        var argsToAdvice;
        var advice = function() {
          argsToAdvice = Array.prototype.slice.call(arguments,0);
        };
        Aop.before('targetFn',advice,targetObj);
        targetObj.targetFn(11,22,33);
        expect(argsToAdvice).toEqual([11,22,33]);
      });

      it('타깃 함수에 인자를 전달한다', function() {
        Aop.before('targetFn', function() {},targetObj);
        targetObj.targetFn('a','b');
        expect(argsToTarget).toEqual(['a','b']);
      });

      it('마지막 어드바이스를 제일 먼저 실행하는 식으로 체이닝이 가능한다', function() {
        var adviceFactory = function(adviceID) {
          return (function() {
            executionPoints.push(adviceID);
          });
        };
        Aop.before('targetFn',adviceFactory('안쪽'),targetObj);
        Aop.before('targetFn',adviceFactory('바깥쪽'),targetObj);
        targetObj.targetFn();
        expect(executionPoints).toEqual(['바깥쪽','안쪽','targetFn']);
      });

      it("타깃 함수를 호출하면 일반 값을 반환한다", function() {
        Aop.before('targetFn', function() {}, targetObj);
        expect(targetObj.targetFn()).toEqual(targetFnReturn);
      });

      it('어드바이스를 타깃의 콘텍스트에서 실행한다', function() {
        var advice = function() {
          expect(this).toBe(targetObj);
        };
        Aop.before('targetFn',advice, targetObj);
        targetObj.targetFn();
      });
    });

    describe('어드바이스에서 예외가 발생할 경우', function() {
      var badAdvice = function() {
        executionPoints.push('badAdvice');
        throw new Error('실패!');
      };
      var goodAdvice = function() {
        executionPoints.push('goodAdvice');
      };
      var expectJustBadAdvice = function() {
        try {
          targetObj.targetFn();
        }
        catch (e) {
        }
        expect(executionPoints).toEqual(['badAdvice']);
      };
      it('다음 어드바이스는 실행되지 않는다', function() {
        Aop.before('targetFn',goodAdvice,targetObj);
        Aop.before('targetFn',badAdvice,targetObj);
        expectJustBadAdvice();
      });
      it('타깃도 실행되지 않는다', function() {
        Aop.before('targetFn',badAdvice,targetObj);
        expectJustBadAdvice();
      });
    });

  });

  describe('Aop.after(fnName, advice, targetObj)', function () {

    describe('타깃이 성공할 경우', function() {
      it('타깃 직후에 실행한다', function() {
        var advice = function() {
           executionPoints.push('advice');
        };
        Aop.after('targetFn',advice,targetObj);
        targetObj.targetFn();
        expect(executionPoints).toEqual(['targetFn','advice']);
      });
      it("타깃의 인자로 실행한다", function() {
        var argsToAdvice;
        var advice = function() {
          argsToAdvice = Array.prototype.slice.call(arguments,0);
        };
        Aop.after('targetFn',advice,targetObj);
        targetObj.targetFn(11,22,33);
        expect(argsToAdvice).toEqual([11,22,33]);
      });
      it('타깃의 콘텍스트로 실행한다', function() {
        var advice = function() {
          expect(this).toBe(targetObj);
        };
        Aop.after('targetFn',advice, targetObj);
        targetObj.targetFn();
      });
      it('타깃의 반환값을 반환한다', function() {
        Aop.after('targetFn', function() {}, targetObj);
        expect(targetObj.targetFn()).toEqual(targetFnReturn);
      });
      it('최초의 어드바이스가 제일 먼저 실행되는 식으로 체이닝이 가능한다', function() {
        var adviceFactory = function(adviceID) {
          return (function() {
            executionPoints.push(adviceID);
          });
        };
        Aop.after('targetFn',adviceFactory('first'),targetObj);
        Aop.after('targetFn',adviceFactory('second'),targetObj);
        targetObj.targetFn();
        expect(executionPoints).toEqual(['targetFn','first','second']);
      });
    });

    describe('타깃에서 예외가 발생할 경우', function() {
      it('실행되지 않는다', function() {
        var executedAdvice = false,
        badTarget = {
          badFn : function () {
            throw new Error('Oops!');
          }
        },
        advice = function() {
          executedAdvice = true;
        };

        Aop.after('badFn', advice, badTarget);

        try
        {
          badTarget.badFn(); // 예외가 발생하지 않으면 테스트는 성공한다.
        }
        catch (e) {}
        expect(executedAdvice).toBe(false);
      });
    });
  });
});