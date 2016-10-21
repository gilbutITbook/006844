DiContainer = function() {
    // 생성자에 의해 객체가 생성되도록 강제한다.
  if (!(this instanceof DiContainer)) {
    return new DiContainer();
  }
};

DiContainer.prototype.messages = {
  registerRequiresArgs: '이 생성자 함수는 인자가 3개 있어야 합니다: ' +
    '문자열, 문자열 배열, 함수.'
};

DiContainer.prototype.register = function(name,dependencies,func) {
  var ix;

  if (typeof name !== 'string'
  || !Array.isArray(dependencies)
  || typeof func !== 'function') {
    throw new Error(this.messages.registerRequiresArgs);
  }
  for (ix=0; ix<dependencies.length; ++ix) {
    if (typeof dependencies[ix] !== 'string') {
      throw new Error(this.messages.registerRequiresArgs);
    }
  }
};

DiContainer.prototype.get = function(name) {
};