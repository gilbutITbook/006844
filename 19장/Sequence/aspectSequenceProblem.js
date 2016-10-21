var Conference = Conference || {};
Conference.polyfills = Conference.polyfills || {};

//-----------------------------------------------------------------
// 폴리필 생성 > 애스팩트 적용 > 빌림
//-----------------------------------------------------------------

Conference.polyfills.forEachWithEarlyAspect = function(callbackFcn, thisObj) {
  var i;

  for (i = 0; i < this.length; i++) {
    callbackFcn.call(thisObj, this[i], i, this);
  }
};

Aop.before('forEachWithEarlyAspect',function isObjectWithLength(obj) {
  if (typeof(obj) !== 'object' ||
  !(typeof this.length === 'number' && isFinite(this.length) &&
  Math.floor(this.length) === this.length && this.length>=0)) {
    throw new Error('forEach의 호출부는 유사 배열 타입이어야 합니다.');
  }
},Conference.polyfills);

var objWithEarlyAspect = { /* length 프로퍼티 없음 */ };
objWithEarlyAspect.forEach = Conference.polyfills.forEachWithEarlyAspect;

//-----------------------------------------------------------------
// 폴리필 생성 > 빌림 > 애스팩트 적용 (잘못됐다!)
//-----------------------------------------------------------------

Conference.polyfills.forEachWithLateAspect = function(callbackFcn, thisObj) {
  var i;

  for (i = 0; i < this.length; i++) {
    callbackFcn.call(thisObj, this[i], i, this);
  }
};

var objWithLateAspect = { /* length 프로퍼티 없음 */ };
objWithLateAspect.forEach = Conference.polyfills.forEachWithLateAspect;

// 애스팩트 적용이 너무 늦었다!
Aop.before('forEachWithLateAspect',function isObjectWithLength(obj) {
  if (typeof(obj) !== 'object' ||
  !(typeof this.length === 'number' && isFinite(this.length) &&
  Math.floor(this.length) === this.length && this.length>=0)) {
  throw new Error('forEach의 호출부는 유사 배열 타입이어야 합니다.');
  }
},Conference.polyfills);
