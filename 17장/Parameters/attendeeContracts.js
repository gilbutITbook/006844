var Conference = Conference || {};
Conference.attendeeContracts = function() {
  'use strict';

  var personalInfo = 'Conference.attendee.personalInfo',
      checkInManagement = 'Conference.attendee.checkInManagement';

  return {
    getContracts: function getContracts() {

      function fulfillsPersonalInfo(att) {
        return typeof att.setId === 'function' &&
               typeof att.getId === 'function' &&
               typeof att.getFullName === 'function';
      }

      function fulfillsCheckInManagement(att) {
        return typeof att.getId === 'function' &&
               typeof att.isCheckedIn === 'function' &&
               typeof att.checkIn === 'function' &&
               typeof att.undoCheckIn === 'function' &&
               typeof att.setCheckInNumber === 'function' &&
               typeof att.getCheckInNumber === 'function';
      }
      return [
        { name: personalInfo,
          evaluator: fulfillsPersonalInfo },

        { name: checkInManagement,
          evaluator: fulfillsCheckInManagement },
      ];
    },

    attachValidators: function attachValidators(registry) {

      // Conference.attendee(firstName,lastName)에 검사기를 붙인다.
      var funcName = 'attendee';
      registry.attachArgumentsValidator(funcName, Conference,
          [ 'undefined',          // 이름 없음 (OK)
            'string',             // 이름 하나만 있음
            'string,string']);    // 이름이 2개 있음
      registry.attachReturnValidator(funcName,Conference,personalInfo);
      registry.attachReturnValidator(funcName,Conference,checkInManagement);

      // Conference.attendee(firstName,lastName)의
      // 반환값에 애스팩트를 적용한다.
      // 여기서 반환값은 마침 객체 리터럴이다.
      Aop.around(funcName,
        function attachAspectsToAttendeeObjectLiteral(targetInfo) {
          // attendee 함수가 반환한 attendee 인스턴스
          var instance = Aop.next(targetInfo);
          registry.attachArgumentsValidator('setId',instance, 'undefined');
          registry.attachReturnValidator('setId',instance, 'nonNegativeInteger');
          registry.attachReturnValidator('getId',instance, 'nonNegativeInteger');
          registry.attachReturnValidator('getFullName',instance, 'string');
          registry.attachReturnValidator('isCheckedIn',instance, 'boolean');
          registry.attachReturnValidator('checkIn',instance, 'undefined');
          registry.attachReturnValidator('undoCheckIn',instance, 'undefined');
          registry.attachArgumentsValidator('setCheckInNumber',instance, 'nonNegativeInteger');
          registry.attachReturnValidator('setCheckInNumber',instance, 'undefined');
          registry.attachReturnValidator('getCheckInNumber',instance, 'nonNegativeInteger');
          return instance;
        }, Conference);
    }
  };
};