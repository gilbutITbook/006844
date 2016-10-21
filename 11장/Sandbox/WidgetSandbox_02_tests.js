describe("Conference.WidgetSandbox", function() {
  'use strict';

  describe("생성자 함수", function() {

    it("'new' 키워드로 실행하지 않으면 예외를 던진다", function() {
      expect(function shouldThrow() {
        var sandbox = Conference.WidgetSandbox();
      }).toThrowError(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
    });

    describe('new WidgetSandbox(toolsArray, widgetModule)', function() {
      // 도구 목록을 배열 형태로 넘겼을 때 작동 여부를 테스트

      it("위젯 함수가 누락되면 예외를 던진다", function() {
        [null, undefined, 1, "SomeString", false].forEach(function testInvalid(val) {
          expect(function shouldThrow() {
            var sandbox = new Conference.WidgetSandbox(['tool1', 'tool2'], val);
          }).toThrowError(Conference.WidgetSandbox.messages.fcnMustBeProvided);
        });
      });

      it("sandbox를 인자로 위젯 함수를 실행한다", function() {
        var widgetFcn = jasmine.createSpy();
        var sandbox = new Conference.WidgetSandbox(['tool1', 'tool2'],
          widgetFcn);
        expect(widgetFcn).toHaveBeenCalledWith(sandbox);
      });
    });

    describe("new WidgetSandbox('tool1',..., 'toolN', widgetModule)", function() {
      // 도구 목록을 개별 인자 형태로 넘겼을 때 작동 여부를 테스트

      it("위젯 함수가 누락되면 예외를 던진다", function() {
        [null, undefined, 1, "SomeString", false].forEach(function testInvalid(val) {
          expect(function shouldThrow() {
            var sandbox = new Conference.WidgetSandbox('tool1', 'tool2', val);
          }).toThrowError(Conference.WidgetSandbox.messages.fcnMustBeProvided);
        });
      });

      it("sandbox를 인자로 위젯 함수를 실행한다", function() {
        var widgetFcn = jasmine.createSpy();
        var sandbox = new Conference.WidgetSandbox('tool1', 'tool2', widgetFcn);
        expect(widgetFcn).toHaveBeenCalledWith(sandbox);
      });
    });
  });
});