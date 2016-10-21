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
      target[item] = mixin[item];
    }
  }
};
ReliableJavaScript.extend.messages = {
  targetNotObject: "target은 객체가 아닙니다",
  mixinNotObject: "mixin은 객체가 아닙니다"
};