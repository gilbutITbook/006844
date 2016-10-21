var Conference = Conference || {};
Conference.polyfills = Conference.polyfills || {};

Conference.polyfills.arrayForEach = function(callbackFcn, thisObj) {
  'use strict';

  if (!(this instanceof Array)) {
    throw new Error("'this'가 배열이 아닙니다");
  }
  if (typeof callbackFcn !== "function") {
    throw new Error(callbackFcn + '은(는) 함수가 아닙니다!');
  }
};