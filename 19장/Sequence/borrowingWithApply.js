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
  if (typeof(obj) !== 'object' || isNaN(this.length)) {
    throw new Error('forEach의 호출부는 유사 배열 타입이어야 합니다.');
  }
},Conference.polyfills);

var objWithEarlyAspect = { /* length 프로퍼티 없음 */ };
objWithEarlyAspect.forEach = function() {
  var args = Array.prototype.slice.call(arguments);
  return Conference.polyfills.forEachWithEarlyAspect.apply(this,args);
};

//-----------------------------------------------------------------
// 폴리필 생성 > 애스팩트 적용 > 빌림
//-----------------------------------------------------------------

Conference.polyfills.forEachWithLateAspect = function(callbackFcn, thisObj) {
  var i;

  for (i = 0; i < this.length; i++) {
    callbackFcn.call(thisObj, this[i], i, this);
  }
};

var objWithLateAspect = { /* length 프로퍼티 없음 */ };
objWithLateAspect.forEach = function() {
  var args = Array.prototype.slice.call(arguments);
  return Conference.polyfills.forEachWithLateAspect.apply(this,args);
};

// 'call'을 사용하기 때문에 애스팩트를 나중에 적용해도 늦은 건 아니다.
Aop.before('forEachWithLateAspect',function isObjectWithLength(obj) {
  if (typeof(obj) !== 'object' || isNaN(this.length)) {
  throw new Error('forEach의 호출부는 유사 배열 타입이어야 합니다.');
  }
},Conference.polyfills);
