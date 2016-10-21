Aop = {
  around: function(fnName, advice, fnObj) {
    var originalFn = fnObj[fnName];
    fnObj[fnName] = function () {
      return advice.call(this, {fn:originalFn, args:arguments});
    };
  },

  next: function(targetInfo) {
  //이 함수는 다음과 같은 단계를 밟아 하나하나 테스트를 하며 작성했다.
  //      targetInfo.fn();
  //      targetInfo.fn.apply({}, targetInfo.args);
  // return targetInfo.fn.apply({}, targetInfo.args);
    return targetInfo.fn.apply(this,targetInfo.args);
  }
};
