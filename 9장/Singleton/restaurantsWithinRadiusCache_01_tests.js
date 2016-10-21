describe('Conference.caches.RestaurantsWithinRadiusCache', function() {
  "use strict";

  describe('getInstance', function() {
    it('항상 동일한 인스턴스를 반환한다', function() {

      // .getInstance가 동일한 객체를 반환하는지 확인
      // (.toBe는 참조값의 동등함을 따진다)
      expect(Conference.caches.RestaurantsWithinRadiusCache.getInstance())
        .toBe(Conference.caches.RestaurantsWithinRadiusCache.getInstance());
    });
  });
});