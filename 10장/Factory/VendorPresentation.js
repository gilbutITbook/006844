var Conference = Conference || {};
Conference.VendorPresentation = function(title, presenter,vendor,product) {
  'use strict';
  if (!(this instanceof Conference.VendorPresentation)) {
    throw new Error(
      Conference.VendorPresentation.messages.mustUseNew);
  }
  if (!vendor) {
    throw new Error(Conference.VendorPresentation.messages.vendorRequired);
  }
  Conference.Presentation.call(this,title,presenter);
  this.vendor = vendor;
  this.product = product;
};

Conference.VendorPresentation.prototype
  = Object.create(Conference.Presentation.prototype);

Conference.VendorPresentation.messages = {
  mustUseNew: 'VendorPresentation는 반드시 "new"로 생성해야 합니다',
  vendorRequired: 'vendor는 필수 입력 항목입니다.'
};