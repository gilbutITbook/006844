describe('Aop', function() {
  var targetObj,
      targetFnReturn = 123,
      executionPoints,  // 실행 이벤트가 담긴 배열
      argPassingAdvice, // 타깃에 인자를 전달할 어드바이스
      argsToTarget;     // targetObj.targetFn에 전달할 인자들

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
  });
});