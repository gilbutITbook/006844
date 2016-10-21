var ReliableJavaScript = ReliableJavaScript || {};

ReliableJavaScript.DOMUpdater = (function DOMUpdater(){
  "use strict";

  return {

    appendToElement: function appendToElement(appendToId, elementString){
      if(appendToId === null || appendToId === undefined){
        appendToId = "";
      }

      if(elementString === null || elementString === undefined){
        elementString = "";
      }

      /*eslint-disable id-suffix*/
      var inputsValid = (elementString !== "" && appendToId !== "");

      if(inputsValid) {
      /*eslint-enable id-suffix*/
        $("#" + appendToId).append(elementString);
      }
    }

  };
})();
