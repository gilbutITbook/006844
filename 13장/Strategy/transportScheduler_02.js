var Conference = Conference || {};

Conference.transportScheduler = function(auditService, transportCompanyFactory) {
  'use strict';

  if (!auditService) {
    throw new Error(Conference.transportScheduler.messages.noAuditService);
  }
  if (!transportCompanyFactory) {
    throw new Error(Conference.transportScheduler.messages.noCompanyFactory);
  }

  return {
    scheduleTransportation : function scheduleTransportation(transportDetails) {
      if (!transportDetails) {
        throw new Error(Conference.transportScheduler.messages.noDetails);
      }
      var company;

      company = transportCompanyFactory.create(transportDetails);

      return company.schedulePickup(transportDetails)
        .then(function successful(confirmation) {
          auditService.logReservation(transportDetails, confirmation);
          return confirmation;
        });
    }
  };
};

Conference.transportScheduler.messages = {
  noAuditService: "집계 서비스 인스턴스는 필수입니다.",
  noCompanyFactory: "운송회사 팩토리 인스턴스는 필수입니다.",
  noDetails: "transportDetails 인스턴스는 필수입니다."
};