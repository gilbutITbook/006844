Aop = {
  around: function(fnName, advice, fnObj) {
    var originalFn = fnObj[fnName];
    fnObj[fnName] = function () {
      var targetContext = {}; // 잘못된 코드라는 건 알고 있다, 나중에 다시 설명한다.
      //return advice.call(targetContext, {fn:originalFn, args:arguments});
      advice.call(targetContext, {fn:originalFn, args:arguments});
    };
  }
};