// AOP 라이브러리(2장)

Aop = {
  around: function around(fnName, advice, fnObj) {
    var originalFn = fnObj[fnName];
    fnObj[fnName] = function aroundInner() {
      return advice.call(this, {fn:originalFn, args:arguments});
    };
  },

  aroundCtor: function aroundCtor(fnName, advice, fnObj) {
    var originalFn = fnObj[fnName];
    function AroundCtorInner() {
      return advice.call(this, {fn:originalFn, args:arguments});
    }
    AroundCtorInner.prototype = Object.create(originalFn.prototype);
    AroundCtorInner.prototype.constructor = originalFn;
    fnObj[fnName] = AroundCtorInner;
  },

  next: function(targetInfo) {
    return targetInfo.fn.apply(this,targetInfo.args);
  }
};

Aop.before = function before(fnName, advice, fnObj) {
  Aop.around(fnName,
    function beforeAdvice(targetInfo) {
      advice.apply(this,targetInfo.args);
      return Aop.next(targetInfo);
    },
    fnObj);
};

Aop.after = function after(fnName, advice, fnObj) {
  Aop.around(fnName,
     function afterAdvice(targetInfo) {
       var ret = Aop.next(targetInfo);
       advice.apply(this,targetInfo.args);
       return ret;
     },
     fnObj);
};