var Conference = Conference || {};
Conference.mixins = Conference.mixins || {};

Conference.mixins.idMixin = function() {
  'use strict';

  return {
    id: undefined,
    getId: function getId() {
      return this.id;
    },
    setId: function setId(idValue) {
      this.id = idValue;
    }
  };
};