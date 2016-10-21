var Conference = Conference || {};

Conference.OrderedObject = function() {
  'use strict';
  var self,
      propertyIterationCounts = {};

  this.incrementIterationCount = function incrementIterationCount(prop) {
    if (!propertyIterationCounts[prop]) {
      propertyIterationCounts[prop] = 1;
    } else {
      ++propertyIterationCounts[prop];
    }
  };

  this.getIterationCount = function getIterationCount(prop) {
    return propertyIterationCounts[prop];
  };
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

Conference.OrderedObject.prototype.trackedForEachKey = function(callbackFcn) {
  'use strict';
  var that = this;
  function callbackAndTrack(prop,value) {
    callbackFcn.call(that, prop, value);
    that.incrementIterationCount(prop);
  }

  this.forEachKey(callbackAndTrack);
};