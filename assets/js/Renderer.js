

var Renderer = (function() {
  function prepareContext(canvasId, arr, wall, cell) {
    var calcWidth = function(arr) {
      var wallsInRow = Math.ceil(arr.length / 2) + 1;
      var cellsInRow = Math.ceil(arr.length / 2);
      return wallsInRow * wall + cellsInRow * cell;
    };
    var canvas = d3.select("#" + canvasId )
      .attr("width", calcWidth(arr[0]))
      .attr("height", calcWidth(arr));
    return canvas.node().getContext("2d");
  };

  function Def(canvasId, arr, wallSize, cellSize) {
    this.ctx = prepareContext(canvasId, arr, wallSize, cellSize)
    this.ctx.fillStyle = "white";
    this.canvasId = canvasId;
    this.arr = arr;
    this.wall = wallSize;
    this.cell = cellSize;
  };

  Def.prototype.render = function(arr) {
    arr = arr || this.arr;
    var wall = this.wall,
      cell = this.cell,
    // start position on canvas
      px = this.wall, py = this.wall;

    // there are cels representing cells and cells representing walls
    // all cells has to be drwan , then in case off walls we draw only when connecting cells
    // every odd row is about walls, every odd column is about walls
    for(var i = 0; i < arr.length; i++) {
      for(var j = 0; j < arr[i].length; j++) {
        // if it is cell cell drwa cell
        if(i % 2 == 0 && j % 2 == 0) {
          if(arr[i][j]) {
            this.ctx.fillRect(px, py, cell, cell);
          }
          px += cell;
        } else if(i % 2 == 0 && j % 2 != 0) {
          // wall in case of cell row
          if(arr[i][j]) {
            // draw remove wall
            this.ctx.fillRect(px, py, wall, cell);
          }
          px += wall;
        } if(i % 2 == 1) {
          if(arr[i][j]) {
            // draw remove wall,
            this.ctx.fillRect(px, py, cell, wall);
          }
          px += (j % 2) ? cell : wall;
        }
      }
      px = wall;
      // if this was row of cells then add wall to y e
      py += !(i % 2) ? cell : wall;
    }

  };
  return Def;
})();
