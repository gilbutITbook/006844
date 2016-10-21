describe('ThirdParty.restaurantApi() 애스팩트', function() {
  'use strict';
  var api = ThirdParty.restaurantApi();

  describe('getRestaurantsNearConference(cuisine)', function() {
    var returnFromUnderlyingFunction = '아무거',
        cuisine = '중화요리';
    beforeEach(function() {
      spyOn(api,'getRestaurantsWithinRadius')
        .and.returnValue(returnFromUnderlyingFunction);
    });

    it('올바른 파라미터를 넘겨 getRestaurantsWithinRadius를 호출한다', function() {
      api.getRestaurantsNearConference(cuisine);
      expect(api.getRestaurantsWithinRadius).toHaveBeenCalledWith(
        '울산 남구 신정로20번길 988',2.0,cuisine);
    });

    it('getRestaurantsWithinRadius로부터 받은 값을 반환한다', function() {
      var ret = api.getRestaurantsNearConference(cuisine);
      expect(ret).toBe(returnFromUnderlyingFunction);
    });
  });
});