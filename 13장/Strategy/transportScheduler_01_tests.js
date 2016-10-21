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
      testDetails;

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
    });

    it("transportDetails 인자가 누락되면 예외를 던진다", function() {
      expect(function shouldThrow() {
        scheduler.scheduleTransportation();
      }).toThrowError(Conference.transportScheduler.messages.noDetails);
    });

    it("회사 팩토리가 던진 예외를 무시하지 않는다", function() {
      var companyFactoryError = "운수회사 팩토리가 던진 예외입니다.";
      spyOn(companyFactory, 'create').and.throwError(companyFactoryError);
      expect(function shouldThrow() {
        scheduler.scheduleTransportation(testDetails);
      }).toThrowError(companyFactoryError);
    });

  });
});