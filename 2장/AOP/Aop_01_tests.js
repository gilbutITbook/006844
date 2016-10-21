describe('Aop', function() {
  describe('Aop.around(fnName, advice, targetObj)', function() {
    it('타깃 함수를 호출 시 어드바이스를 실행하도록 한다', function() {
      var targetObj = {
        targetFn: function () {
        }
      };
      var executedAdvice = false;
      var advice = function() {
        executedAdvice = true;
      };
      Aop.around('targetFn', advice, targetObj);
      targetObj.targetFn();
      expect(executedAdvice).toBe(true);
    });
  });
});