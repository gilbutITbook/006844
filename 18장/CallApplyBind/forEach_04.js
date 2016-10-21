var Conference = Conference || {};
Conference.polyfills = Conference.polyfills || {};

Conference.polyfills.arrayForEach = function(callbackFcn, thisObj) {
  'use strict';

  var i;

  if (typeof callbackFcn !== "function") {
    throw new Error(callbackFcn + '은(는) 함수가 아닙니다!');
  }

  for (i = 0; i < this.length; i++) {
    callbackFcn.call(thisObj, this[i], i, this);
  }
};