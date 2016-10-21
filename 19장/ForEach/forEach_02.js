var Conference = Conference || {};
Conference.polyfills = Conference.polyfills || {};

Conference.polyfills.arrayForEach = function(callbackFcn, thisObj) {
  var i;

  for (i = 0; i < this.length; i++) {
    callbackFcn.call(thisObj, this[i], i, this);
  }
};

Aop.before('arrayForEach',function isObjectWithLength(obj) {
  if (typeof(this) !== 'object' ||
  !(typeof this.length === 'number' && isFinite(this.length) &&
  Math.floor(this.length) === this.length && this.length>=0)) {
    throw new Error('arrayForEach의 호출부는 유사 배열 타입이어야 합니다.');
  }
},Conference.polyfills);