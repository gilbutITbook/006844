var Conference = Conference || {};
Conference.mixins = Conference.mixins || {};

Conference.mixins.idMixin = function() {
  'use strict';

  return {
    id: null,
    getId: null,
    setId: null
  };
};