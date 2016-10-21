describe("recentRegistrationsService", function() {
  'use strict';

  var service,
      observer1,
      observer2;

  beforeEach(function() {
    service = Conference.recentRegistrationsService();
    observer1 = {
      update: function update() { }
    };
    observer2 = {
      update: function update() { }
    };
  });

  afterEach(function() {
    service.stopPolling();
    service.clearObservers();
  });

  describe("addObserver(observer) 및 hasObserver(observer)", function() {

    describe("단일 관찰자", function() {
      it("관찰자가 추가되지 않았다면 hasObserver는 false를 반환한다", function() {
        expect(service.hasObserver(observer1)).toBe(false);
      });

      it("관찰자가 추가됐다면 hasObserver는 true를 반환한다", function() {
        service.addObserver(observer1);
        expect(service.hasObserver(observer1)).toBe(true);
      });
  });

    describe("다중 관찰자", function() {
      it("관찰자가 추가되지 않았다면 false를 반환한다", function() {
        service.addObserver(observer1);
        expect(service.hasObserver(observer2)).toBe(false);
      });

      it("관찰자를 추가하면 각각에 대해 true를 반환한다", function() {
        service.addObserver(observer1);
        service.addObserver(observer2);
        expect(service.hasObserver(observer1)).toBe(true);
        expect(service.hasObserver(observer2)).toBe(true);
      });
    });
  });

  describe("removeObserver(observer)", function() {
    describe("단일 관찰자", function() {
      it("추가하지 않은 관찰자에 대해서는 아무 일도 하지 않는다", function() {
        // observer1을 추가한다
        service.addObserver(observer1);

        // observer2를 삭제하려고 한다
        service.removeObserver(observer2);

        expect(service.hasObserver(observer1)).toBe(true);
        expect(service.hasObserver(observer2)).toBe(false);
      });
      it("추가한 관찰자를 삭제한다", function() {
        service.addObserver(observer1);
        expect(service.hasObserver(observer1)).toBe(true);
        service.removeObserver(observer1);
        expect(service.hasObserver(observer1)).toBe(false);
      });
    });
    describe("다중 관찰자", function() {
      it("주어진 관찰자만 삭제한다", function() {
        service.addObserver(observer1);
        service.addObserver(observer2);

        service.removeObserver(observer2);

        expect(service.hasObserver(observer1)).toBe(true);
        expect(service.hasObserver(observer2)).toBe(false);
      });
    });
  });

  describe("updateObservers(newAttendee)", function() {
    var registration;

    beforeEach(function() {
      registration = { };
      spyOn(observer1, "update");
      spyOn(observer2, "update");
    });

    describe("단일 관찰자", function() {
      it("관찰자의 update 함수를 실행한다", function() {
        service.addObserver(observer1);
        service.updateObservers(registration);
        expect(observer1.update).toHaveBeenCalledWith(registration);
      });
      it("삭제된 관찰자의 update 함수는 실행하지 않는다", function() {
        service.addObserver(observer1);
        service.removeObserver(observer1);

        service.updateObservers(registration);
        expect(observer1.update).not.toHaveBeenCalledWith(registration);
      });
    });
    describe("다중 관찰자", function() {
      it("관찰자의 update 함수를 실행한다", function() {
        service.addObserver(observer1);
        service.addObserver(observer2);

        service.updateObservers(registration);

        expect(observer1.update).toHaveBeenCalledWith(registration);
        expect(observer2.update).toHaveBeenCalledWith(registration);
      });

      it("삭제된 관찰자의 update 함수는 실행하지 않는다", function() {
        service.addObserver(observer1);
        service.addObserver(observer2);
        service.removeObserver(observer2);

        service.updateObservers(registration);

        expect(observer1.update).toHaveBeenCalledWith(registration);
        expect(observer2.update).not.toHaveBeenCalledWith(registration);
      });
    });
  });
});