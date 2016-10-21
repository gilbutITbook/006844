describe('Aop', function() {
  var targetObj,
      executionPoints;  // 실행 이벤트가 담긴 배열

  beforeEach(function() {
    targetObj = {
      targetFn: function() {
        executionPoints.push('targetFn');
      }
    };
    executionPoints = [];
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
  });
});