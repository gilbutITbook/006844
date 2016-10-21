var Conference = Conference || {};

Conference.OrderedObject = function() {
};

Conference.OrderedObject.prototype.forEachKey = function(callbackFcn) {
  'use strict';
  var ix,
      propName,
      orderedKeys = Object.keys(this).sort();

  for (ix=0; ix<orderedKeys.length; ++ix) {
    propName = orderedKeys[ix];
    callbackFcn.call(this,propName,this[propName]);
  }
};
