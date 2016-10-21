var Conference = Conference || {};

Conference.simpleCache = function() {
  "use strict";

  var privateCache = {};

  function getCacheKey(key) {
    return JSON.stringify(key);
  }

  return {

    // 캐시에 있는 키면 true, 아니면 false를 반환한다
    hasKey: function(key) {
      return privateCache.hasOwnProperty(getCacheKey(key));
    },

    // 캐시에 해당 키 값을 저장한다
    setValue: function(key, value) {
      privateCache[getCacheKey(key)] = value;
    },

    // 해당 키 값을 반환한다
    // (캐시에 키 값이 없으면 undefined)
    getValue: function(key) {
      return privateCache[getCacheKey(key)];
    }
  };
};