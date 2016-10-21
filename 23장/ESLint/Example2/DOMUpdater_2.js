var ReliableJavaScript = ReliableJavaScript || {};

ReliableJavaScript.DOMUpdater = (function DOMUpdater(){

  return {

    appendToElement: function appendToElement(appendToID, elementString){
      if(appendToID == null || appendToID == undefined)
        appendToID = "";

      if(elementString == null || elementString == undefined)
        elementString = "";

      inputsValid = (elementString != "" && appendToID != "");

      if(inputsValid) {
        $('#' + appendToID).append(elementString);
      }
    }

  }
})()
