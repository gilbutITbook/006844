var Conference = Conference || {};
Conference.Presentation = function(title, presenter) {
  'use strict';
  if (!(this instanceof Conference.Presentation)) {
    throw new Error(Conference.Presentation.messages.mustUseNew);
  }
  if (!title) {
    throw new Error(Conference.Presentation.messages.titleRequired);
  }
  this.title = title;
  this.presenter = presenter;
};

Conference.Presentation.messages = {
  mustUseNew: 'Presentation은 반드시 "new"로 생성해야 합니다.',
  titleRequired: 'title은 필수 입력 항목입니다.'
};