var Conference = Conference || {};
Conference.caches = Conference.caches || {};

// restaurantApi.getRestaurantsWithinRadius 함수에서
// 캐시로 사용할 객체 리터럴(싱글톤) 생성
Conference.caches.restaurantsWithinRadiusCache = {};

// getRestaurantsWithinRadius에 메모이제이션 패턴 적용

Aop.around(
  'restaurantApi',
  function addMemoizationToGetRestaurantsWithinRadius(targetInfo) {

    // ThirdParty.restaurantApi()가 반환한 원본 API
    var api =  Aop.next.call(this, targetInfo);

    // getRestaurantsWithinRadius 함수를 장식하여
    // 메모이제이션(공유 캐시로) 추가
    Aop.around('getRestaurantsWithinRadius',
      Aspects
      .returnValueCache(Conference.caches.restaurantsWithinRadiusCache).advice,
        api);

    // 고친 API를 반환한다
    return api;
  },
  ThirdParty
);