// getRestaurantsWithinRadius에 메모이제이션 패턴 적용

Aop.around(
  'restaurantApi',
  function addMemoizationToGetRestaurantsWithinRadius(targetInfo) {

    // ThirdParty.restaurantApi()가 반환한 원본 API
    var api =  Aop.next.call(this, targetInfo);

    // 싱글톤 캐시 인스턴스를 가져온다
    var cache = Conference.caches.RestaurantsWithinRadiusCache.getInstance();

    // getRestaurantsWithinRadius 함수를 장식하여
    // 메모이제이션(공유 캐시로) 추가
    Aop.around('getRestaurantsWithinRadius',
      Aspects.returnValueCache(cache).advice, api);

    // 고친 API를 반환한다
    return api;
  },
  ThirdParty
);