var Conference = Conference || {};
Conference.mixins = Conference.mixins || {};

Conference.mixins.addId = function() {
  'use strict';

  if ('getId' in this) {
    throw new Error(Conference.mixins.addId.messages.triedToReplace + "getId");
  }
  if ('setId' in this) {
    throw new Error(Conference.mixins.addId.messages.triedToReplace + "setId");
  }
};
Conference.mixins.addId.messages = {
  triedToReplace: "기존 프로퍼티를 믹스인이 교체하려고 시도했습니다: "
};