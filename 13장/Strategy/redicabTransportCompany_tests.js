describe("redicabTransportCompany", function() {
  'use strict';

  var httpService,
      company,
      details,
      expectedData,
      testConfirmation;

  beforeEach(function() {
    httpService = Conference.httpService();

    company = Conference.redicabTransportCompany(httpService);

    details = {
      transportCompany: "RediCab",
      passengerName: "김윤지",
      departureTime: "7:30 PM"
    };

    // data는 이런 데이터가 될 것이다(기대 데이터)
    expectedData = {
      passenger: details.passengerName,
      pickUp: "컨퍼런스 센터",
      pickUpTime: details.departureTime,
      dropOff: "공항",
      rateCode: "JavaScriptConference"
    };

    // RediCab API에서 반환된 것과 비슷한 객체
    testConfirmation = {
      confirmationCode: "AAA-BBB-CCC",
      anticipatedCharge: 34.00
    };
  });

  describe("schedulePickup(transportDetails)", function() {
    it("기대 데이터를 올바른 URL로 전송한다", function() {

      spyOn(httpService, 'post')
        .and.callFake(function fake(url, data) {
          expect(data).toEqual(expectedData);
          expect(url).toEqual(company.getSchedulePickupUrl());

          return new Promise(function(resolve, reject) {
            resolve(testConfirmation);
          });
        });

      company.schedulePickup(details);

    });

    it("확인 코드로 귀결된다", function(done) {
      spyOn(httpService, 'post')
        .and.returnValue(new Promise(function(resolve, reject) {
            resolve(testConfirmation);
          })
        );

      company.schedulePickup(details).then(function resolved(confirmation) {
        expect(confirmation).toEqual(testConfirmation.confirmationCode);
        done();
      }, function rejected(reason) {
        expect("버려졌을 리 없다").toBe(false);
        done();
      });
    });
  });
});