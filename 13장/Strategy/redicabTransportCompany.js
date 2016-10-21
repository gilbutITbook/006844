var Conference = Conference || {};
Conference.redicabTransportCompany = function(httpService) {
  'use strict';

  var schedulePickupUrl = "http://redicab.com/schedulepickup";

  return {

    // RediCab사와 픽업 일정을 잡는다.
    // 이 회사 API로부터 채번된 확인 코드로 귀결되는 프라미스를 반환한다.
    schedulePickup: function schedulePickup(transportDetails) {
      var details = {
        passenger: transportDetails.passengerName,
        pickUp: "컨퍼런스 센터",
        pickUpTime: transportDetails.departureTime,
        dropOff: "공항",
        rateCode: "JavaScriptConference"
      };

      return httpService.post(schedulePickupUrl, details)
        .then(function resolve(confirmation) {
          return confirmation.confirmationCode;
        });
    },

    // 픽업 정보를 전송할 url을 반환한다
    getSchedulePickupUrl: function getSchedulePickupUrl() {
      return schedulePickupUrl;
    }
  };
};