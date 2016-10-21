Aop = {
  around: function(fnName, advice, fnObj) {
    fnObj[fnName] = advice;
  }
};