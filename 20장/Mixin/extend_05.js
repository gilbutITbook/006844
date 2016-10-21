var ReliableJavaScript = ReliableJavaScript || {};
ReliableJavaScript.extend = function(target, mixin) {
  'use strict';

  if (!target || typeof(target) !== "object") {
    throw new Error(ReliableJavaScript.extend.messages.targetNotObject);
  }

  if (!mixin || typeof(mixin) !== "object") {
    throw new Error(ReliableJavaScript.extend.messages.mixinNotObject);
  }

  for (var item in mixin) {
    if (mixin.hasOwnProperty(item)) {
      if (!(item in target)) {
        target[item] = mixin[item];
      } else {
        throw new
          Error(ReliableJavaScript.extend.messages.triedToReplace + item);
      }
    }
  }
};
ReliableJavaScript.extend.messages = {
  targetNotObject: "target은 객체가 아닙니다",
  mixinNotObject: "mixin은 객체가 아닙니다",
  triedToReplace: "기존 프로퍼티를 믹스인이 교체하려고 시도했습니다: "
};