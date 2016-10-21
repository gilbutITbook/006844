var ReliableJavaScript = ReliableJavaScript || {};
ReliableJavaScript.utilities = ReliableJavaScript.utilities || {};

ReliableJavaScript.utilities.borrow =
function borrow(borrower, donor, funcName) {
  'use strict';
  borrower[funcName] =  function() {
    var args = Array.prototype.slice.call(arguments);
    return donor[funcName].apply(this,args);
  };
};