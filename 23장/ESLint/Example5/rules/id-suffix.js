"use strict";

module.exports = function(context) {
  return {
      "Identifier": function(node){
          var suffix = node.name.length > 1 ? node.name.slice(-2) : "";
          if (suffix === "id" || suffix === "ID"){
             context.report(node, "식별자 ref는 'Id'로 끝나야 합니다.");
          }
      }
  };
};