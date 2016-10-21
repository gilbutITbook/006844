var Conference = Conference || {};

Conference.transportCompanyAuditService = function() {
  'use strict';

  return {
    logReservation : function logReservation(confirmation, transportDetails) {
      // 컨퍼런스 주최사 대시보드에서 확인할 수 있도록
      // 예약 내역을 로깅한다
    }
  };
};