describe("Conference.WidgetSandbox", function() {
  'use strict';

  describe("생성자 함수", function() {
    var widgetFcnSpy;

    beforeEach(function() {
      // 테스트가 실제 도구의 존재에 구애받지 않도록
      // 테스트 도구를 추가한다
      Conference.WidgetTools.tool1 = function(sandbox) {
        return {};
      };
      Conference.WidgetTools.tool2 = function(sandbox) {
        return {};
      };

      // 위젯 함수 역할을 대시할 스파이를 만든다
      widgetFcnSpy = jasmine.createSpy();
    });

    afterEach(function() {
      // 테스트 도구를 삭제한다
      delete Conference.WidgetTools.tool1;
      delete Conference.WidgetTools.tool2;
    });

    it("'new' 키워드로 실행하지 않으면 예외를 던진다", function() {
      expect(function shouldThrow() {
        var sandbox = Conference.WidgetSandbox();
      }).toThrowError(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
    });

    describe('new WidgetSandbox(toolsArray, widgetFcn)', function() {
      // 도구 목록을 배열 형태로 넘겼을 때 작동 여부를 테스트

      it("위젯 함수가 누락되면 예외를 던진다", function() {
        [null, undefined, 1, "SomeString", false].forEach(function testInvalid(val) {
          expect(function shouldThrow() {
            var sandbox = new Conference.WidgetSandbox(['tool1', 'tool2'], val);
          }).toThrowError(Conference.WidgetSandbox.messages.fcnMustBeProvided);
        });
      });

      it("sandbox를 인자로 위젯 함수를 실행한다", function() {
        var sandbox = new Conference.WidgetSandbox(['tool1', 'tool2'],
          widgetFcnSpy);
        expect(widgetFcnSpy).toHaveBeenCalledWith(sandbox);
      });

      it("올바르지 않은 도구를 지정하면 예외를 던진다", function() {
        var badTool = 'badTool';
        expect(function shouldThrow() {
          var sandbox = new Conference.WidgetSandbox(['tool1', badTool],
            widgetFcnSpy);
        }).toThrowError(Conference.WidgetSandbox.messages.unknownTool+badTool);
      });

      it("도구 모듈 함수를 sandbox에서 실행한다", function() {
        spyOn(Conference.WidgetTools, 'tool1');
        spyOn(Conference.WidgetTools, 'tool2');
        var sandbox = new Conference.WidgetSandbox(['tool1', 'tool2'],
          widgetFcnSpy);
        expect(Conference.WidgetTools.tool1)
          .toHaveBeenCalledWith(sandbox);
        expect(Conference.WidgetTools.tool2)
          .toHaveBeenCalledWith(sandbox);
      });
    });

    describe("new WidgetSandbox('tool1',..., 'toolN', widgetFcn)", function() {
      // 도구 목록을 개별 인자 형태로 넘겼을 때 작동 여부를 테스트

      it("위젯 함수가 누락되면 예외를 던진다", function() {
        [null, undefined, 1, "SomeString", false].forEach(function testInvalid(val) {
          expect(function shouldThrow() {
            var sandbox = new Conference.WidgetSandbox('tool1', 'tool2', val);
          }).toThrowError(Conference.WidgetSandbox.messages.fcnMustBeProvided);
        });
      });

      it("sandbox를 인자로 위젯 함수를 실행한다", function() {
        var sandbox = new Conference.WidgetSandbox('tool1', 'tool2',
          widgetFcnSpy);
        expect(widgetFcnSpy).toHaveBeenCalledWith(sandbox);
      });
    });
  });
});