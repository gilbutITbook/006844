var Aspects = Aspects || {};

Aspects.returnValueCache = function(sharedCache) {
 "use strict";

 var cache = sharedCache || Conference.simpleCache();

 return {

   advice: function(targetInfo) {

     // 함수에 넘긴 인자들을 캐시 키로 이용한다
     if (cache.hasKey(targetInfo.args)) {
       return cache.getValue(targetInfo.args);
     }

      // 장식된 함수를 가져와 실행한 뒤
      // 그 반환값을 캐시에 저장한다
     var returnValue = Aop.next(targetInfo);
     cache.setValue(targetInfo.args, returnValue);
     return returnValue;
   }
 };
};