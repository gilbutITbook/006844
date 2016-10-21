// AOP 라이브러리(2장)

Aop = {
  around: function(fnName, advice, fnObj) {
    var originalFn = fnObj[fnName];
    fnObj[fnName] = function () {
      return advice.call(this, {fn:originalFn, args:arguments});
    };
  },

  next: function(targetInfo) {
    return targetInfo.fn.apply(this,targetInfo.args);
  }
};

Aop.before = function(fnName, advice, fnObj) {
  Aop.around(fnName,
    function(targetInfo) {
      advice.apply(this,targetInfo.args);
      return Aop.next(targetInfo);
    },
    fnObj);
};