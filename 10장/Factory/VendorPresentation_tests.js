describe('VendorPresentation', function() {
  'use strict';
  var title = '자바스크립트를 멋지게 사용해보세요',
      presenter = '박길벗',
      vendor = '길벗출판사',
      product = '자바스크립트의 바른 길';

  describe('객체 생성', function() {
    it('"new"를 사용하지 않으면 예외를 던진다', function() {
      expect(function createWithoutNew() {
        Conference.VendorPresentation(title,presenter);
      }).toThrowError( Conference.VendorPresentation.messages.mustUseNew);
    });

    it('"new"를 사용하면 성공한다', function() {
      new Conference.Presentation(title,undefined,vendor); // 예외를 던지지 않음
    });

    it('title이 누락되면 예외를 던진다', function() {
      expect(function createWithoutTitle() {
        new Conference.VendorPresentation(undefined,undefined,vendor);
      }).toThrowError(Conference.Presentation.messages.titleRequired);
    });

    it('vendor가 누락되면 예외를 던진다', function() {
      expect(function createWithoutVendor() {
        new Conference.VendorPresentation(title);
      }).toThrowError( Conference.VendorPresentation.messages.vendorRequired);
    });
  });
});