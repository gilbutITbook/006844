var Conference = Conference || {};
Conference.mixins = Conference.mixins || {};

Conference.mixins.addId = function() {
  'use strict';

  var id;

  if ('getId' in this) {
    throw new Error(Conference.mixins.addId.messages.triedToReplace + "getId");
  }
  if ('setId' in this) {
    throw new Error(Conference.mixins.addId.messages.triedToReplace + "setId");
  }

  this.getId = function getId() {
    return id;
  };

  this.setId = function setId(idValue) {
    id = idValue;
  };
};
Conference.mixins.addId.messages = {
  triedToReplace: "기존 프로퍼티를 믹스인이 교체하려고 시도했습니다: "
};