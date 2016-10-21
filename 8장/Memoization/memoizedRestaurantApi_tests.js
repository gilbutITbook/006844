describe('memoizedRestaurantsApi', function() {
  'use strict';

  var api,
       service,
       returnedFromService;
        
  beforeEach(function() {
    api = ThirdParty.restaurantApi();
    service = Conference.memoizedRestaurantApi(api);
    returnedFromService = {};
  });
  
  describe('getRestaurantsNearConference(cuisine)', function() {
    
    it('기대 인자를 넘겨 api의 getRestaurantsNearConference를 실행', function() {
      var cuisine = "분식";
      spyOn(api, 'getRestaurantsNearConference');
      service.getRestaurantsNearConference(cuisine);
      
      var args = api.getRestaurantsNearConference.calls.argsFor (0);
      expect(args[0]).toEqual(cuisine);
    });
    
    it('서드파티 API의 반환값을 반환한다', function() {
      spyOn(api, 'getRestaurantsNearConference')
        .and.returnValue(returnedFromService);
      var value = service.getRestaurantsNearConference("Asian Fusion");
      expect(value).toBe(returnedFromService);
    });
    
    it('같은 요리를 여러 번 요청해도 api는 한 번만 요청한다', function() {
      var cuisine = "분식";
      
      spyOn(api, 'getRestaurantsNearConference')
        .and.returnValue(returnedFromService);
      
      var iterations = 5;
      for (var i = 0; i < iterations; i++) {
        var value = service.getRestaurantsNearConference(cuisine);
      }
      
      expect(api.getRestaurantsNearConference.calls.count()).toBe(1);
    });
    
    it('같은 요리를 여러 번 요청해도 같은 값으로 귀결한다', function() {
      var cuisine = "한정식";

      spyOn(api, 'getRestaurantsNearConference')
        .and.returnValue(returnedFromService);
      
      var iterations = 5;
      for (var i = 0; i < iterations; i++) {
        var value = service.getRestaurantsNearConference(cuisine);
        expect(value).toBe(returnedFromService);
      }
    });
  });
});