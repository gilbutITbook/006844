(function() {
  var objectData = [
        { x: 10, y: 130 },
        { x: 100, y: 60 },
        { x: 190, y: 160 },
        { x: 280, y: 10 }
      ],
      lineGenerator = rj3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; }),
      path = lineGenerator(objectData);

  document.getElementById('pathFromObjects').setAttribute('d',path);
}());