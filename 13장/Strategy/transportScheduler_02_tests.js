describe("Conference.transportScheduler", function() {
  'use strict';

  describe("모듈 함수", function() {
    // 필요한 의존성이 주어졌는지 확인하기 위한 간단한 테스트

    it("집계 서비스 인자가 누락되면 예외를 던진다", function() {
      expect(function shouldThrow() {
        var scheduler = Conference.transportScheduler(null, {});
      }).toThrowError(Conference.transportScheduler.messages.noAuditService);
    });

    it("회사 팩토리 인자가 누락되면 예외를 던진다", function() {
      expect(function shouldThrow() {
        var scheduler = Conference.transportScheduler({}, null);
      }).toThrowError(Conference.transportScheduler.messages.noCompanyFactory);
    });
  });

  describe("scheduleTransportation(transportDetails)", function() {
    var scheduler,
      auditService,
      companyFactory,
      testDetails,
      fakeCompany,
      confirmationNumber;

    beforeEach(function() {
        // transportScheduler 인스턴스에 주입할 의존성 인스턴스를 생성한다.
        // 참조값을 보관해두어야 테스트할 때 스파이를 통해 메소드를 염탐할 수 있다.
        auditService = Conference.transportCompanyAuditService();
        companyFactory = Conference.transportCompanyFactory();

        // 테스트할 transportScheduler 인스턴스
        scheduler = Conference.transportScheduler(auditService, companyFactory);

        // 이 테스트에서 companyFactory.create(transportDetails)는 어차피 가짜라서
        // testDetails는 진짜 transportDetails 객체의 인스턴스일 필요가 없다
        testDetails = {};

      confirmationNumber = "ABC-123-XYZ";

      // schedulePickup 함수를 구현한 가짜 운송 모듈을 생성한다.
      // 반환된 프라미스는 기본적으로 confirmationNumber로 귀결된다.
      // 버림 프라미스가 필요할 경우 schedulePickup를 염탐하면 된다.
      fakeCompany = {
        schedulePickup : function schedulePickup(transportDetails) {
          return new Promise(function(resolve, reject) {
            resolve(confirmationNumber);
          });
        }
      };
    });

    it("transportDetails 인자가 누락되면 예외를 던진다", function() {
      expect(function shouldThrow() {
        scheduler.scheduleTransportation();
      }).toThrowError(Conference.transportScheduler.messages.noDetails);
    });

    it("회사 팩토리가 던진 예외를 무시하지 않는다", function() {
      var companyFactoryError = "운수회사 팩토리가 던진 예외입니다.";
      spyOn(companyFactory, "create").and.throwError(companyFactoryError);
      expect(function shouldThrow() {
        scheduler.scheduleTransportation(testDetails);
      }).toThrowError(companyFactoryError);
    });

    it("회사 팩토리에서 회사 모듈을 가져온다", function() {
      spyOn(companyFactory, "create").and.returnValue(fakeCompany);

      scheduler.scheduleTransportation(testDetails);

      expect(companyFactory.create).toHaveBeenCalledWith(testDetails);
    });

    it("회사의 schedulePickup 함수를 실행한다", function() {
      spyOn(companyFactory, "create").and.returnValue(fakeCompany);

      // fakeCompany는 귀결 프라미스를 반환하도록 설정한다.
      // 그냥 호출 후 지나치면 된다(call through).
      spyOn(fakeCompany, "schedulePickup").and.callThrough();

      scheduler.scheduleTransportation(testDetails);

      expect(fakeCompany.schedulePickup).toHaveBeenCalledWith(testDetails);
    });

    describe("스케쥴링 성공!", function() {
      beforeEach(function() {
        spyOn(companyFactory, "create").and.returnValue(fakeCompany);
      });

      it("반환된 확인 번호로 귀결된다", function(done) {
        scheduler.scheduleTransportation(testDetails)
          .then(function resolved(confirmation) {
            expect(confirmation).toEqual(confirmationNumber);
            done();
          }, function rejected(reason) {
            expect("버려졌을 리 없다").toBe(false);
            done();
          });
      });

      it("집계 서비스로 로깅한다", function(done) {
        spyOn(auditService, "logReservation");

        scheduler.scheduleTransportation(testDetails)
          .then(function resolved(confirmation) {
            expect(auditService.logReservation)
              .toHaveBeenCalledWith(testDetails, confirmationNumber);
            done();
          }, function rejected(reason) {
            expect("버려졌을 리 없다").toBe(false);
            done();
          });
      });
    });

    describe("스케쥴링 실패!", function() {
      var rejectionReason;

      beforeEach(function() {
        spyOn(companyFactory, "create").and.returnValue(fakeCompany);

        rejectionReason = "이런 이유로 버립니다";

        // schedulePickup가 버림 프라미스를 반환하도록 설정한다
        spyOn(fakeCompany, "schedulePickup")
          .and.returnValue(new Promise(function(resolve, reject) {
            reject(rejectionReason);
          }));
      });

      it("버림 프라미스가 호출부로 흘러가게 한다", function(done) {
        scheduler.scheduleTransportation(testDetails)
          .then(function resolved(confirmation) {
            expect("귀결됐을 리 없다").toBe(false);
            done();
          }, function rejected(reason) {
            expect(reason).toEqual(rejectionReason);
            done();
          });
      });

      it("집계 서비스로 아무것도 로깅하지 않는다", function(done) {
        spyOn(auditService, "logReservation");

        scheduler.scheduleTransportation(testDetails)
          .then(function resolved(confirmation) {
            expect("귀결됐을 리 없다").toBe(false);
            done();
          }, function rejected(reason) {
            expect(auditService.logReservation).not.toHaveBeenCalled();
            done();
          });
      });
    });
  });
});