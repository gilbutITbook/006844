(function() {
  var objectData = [
        { x: 10, y: 130 },
        { x: 100, y: 60 },
        { x: 190, y: 160 },
        { x: 280, y: 10 }
      ],
      arrayData = objectData.map(function(d) {
        return [+d.x, +d.y];
      }),
      lineGenerator = rj3.svg.line(),
      path = lineGenerator(arrayData);

  document.getElementById('pathFromTransformedObjects').setAttribute('d',path);
}());