var Conference = Conference || {};

Conference.memoizedRestaurantApi = function(thirdPartyApi) {
  'use strict';

  var api = thirdPartyApi,
      cache = {};

  return {
    getRestaurantsNearConference: function(cuisine) {
      if (cache.hasOwnProperty(cuisine)) {
        return cache[cuisine];
      }

      var returnedPromise = api.getRestaurantsNearConference(cuisine);
      cache[cuisine] = returnedPromise;
      return returnedPromise;
    }
  };
};