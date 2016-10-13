/**
 * Created by tomek on 09/10/16.
 */

var MazeBuilder = (function(){
  function Def(base) {
    if(!Array.isArray(base)) {
      throw new Error('Base for maze has to be an array');
    }
    this.prepare(base);
    this.go = true;
  };
  // sets this.m and this.rowLength;
  Def.prototype.prepare = function(base) {
    // in mine renderer maze has to be an array with odd count of rows where
    // row has odd length
    if(base.length % 2 === 0) {
      // we need to append new row of zeros
      base.push(Array.apply(null, new Array(base[0].length)).map(Number.prototype.valueOf,0));
    }
    this.rowLength = base[0].length;
    for(var i = 0; i < base.length; i++) {
      if(!Array.isArray(base[i]) || base[i].length != this.rowLength) {
        throw new Error('Malformed base for maze')
      }
      // the rows need to be odd
      if(this.rowLength % 2 !== 1) {
        base[i].push(0);
      }
    }
    // we need to update the row length if we have had push 0 to all the rows
    if(this.rowLength % 2 !== 1) {
      this.rowLength += 1;
    }
    this.m = base;
  };
  Def.prototype.RecBackTracker = function() {
    var stack = [],
        sanity = 0,
        cell = this.randomCell();
    stack.push(cell);
    this.markPosition(cell);
    do {
      // select random neighbour that is not in maze cell = stack.pop();
      var next = this.randomUnvisitedNeighbour(cell);
      if(next) {
        stack.push(next);
        this.markPosition(next);
        this.removeWall(cell, next);
        cell = next;
        continue;
      }
      cell = stack.pop();
      if(sanity ++ > 1000000) {
        // just in case;
        throw new Error('Endless loop detected');
      }
    } while(stack.length > 0);
  };
  Def.prototype.removeWall = function(cell, neighbour) {
    this.markPosition(this.getWall(cell, neighbour));
  };
  Def.prototype.getWall = function(cell, neighbour) {
    return [
      Math.min(cell[0], neighbour[0]) + Math.abs((cell[0] - neighbour[0])/2),
      Math.min(cell[1], neighbour[1]) + Math.abs((cell[1] - neighbour[1])/2)
    ];
  };
  Def.prototype.randomUnvisitedNeighbour = function(cell) {
    var dirs = ['N','S','W','E'],
      temp;
    while(true) {
      // cut off random part of dirs array and use it
      switch (dirs.splice((Math.random() * dirs.length | 0),1)[0]) {
        case 'N':
          temp = [cell[0], cell[1]-2];
          break;
        case 'S':
          temp = [cell[0], cell[1]+2];
          break;
        case 'W':
          temp = [cell[0]-2, cell[1]];
          break;
        case 'E':
          temp = [cell[0]+2, cell[1]];
          break;
        default:
          return false;
      }
      if(this.getCellValue(temp) === 0) {
        return temp;
      }
    }
  };
  Def.prototype.toggle = function() {
    this.go =! this.go;
  };
  Def.prototype.getMaze = function() {
    return this.m;
  };
  // hide this ugly brackety bush
  Def.prototype.markPosition = function(cell, val) {
    if(this.legalPosition(cell)) {
      this.m[cell[1]][cell[0]] = val || 1;
    }
  };
  Def.prototype.legalPosition = function(cell) {
    // if row exist and cell is not undefined
    if(!Array.isArray(cell)) {
      throw new Error('Cell hat to be an array' );
    }
    // m[y][x]   (x, y)
    return this.m[cell[1]] && this.m[cell[1]][cell[0]] !== undefined
  };
  Def.prototype.getCellValue = function(cell) {
    if(this.legalPosition(cell)) {
      return this.m[cell[1]][cell[0]];
    }
  };
  // return [x, y]
  Def.prototype.randomCell = function(cell) {
    if(cell) {
      return cell;
    }
    // get random odd number in range
    var oddColl = Math.random() * this.rowLength -1 | 1;
    var oddRow = Math.random() * this.m.length -1 | 1;
    return [
      // randomly add or subtract 1 but do not go outside of the maze :)
      (Math.random() * 2 | 0) && this.legalPosition([oddColl + 1, 0]) ? oddColl + 1 : oddColl -1,
      (Math.random() * 2 | 0) && this.legalPosition([0, oddRow + 1]) ? oddRow + 1 : oddRow -1
    ]
  };
  return Def;
})();


