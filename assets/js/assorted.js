/**
 * Assorted global functions
 **/

function pp(x, stop) {
  console.log(JSON.stringify(x, null, 2));
  if(stop) {
    throw new Error('stop');
  }
}

function createArr(x, y, fill, rand) {
  fill = fill | 0;
  var arr = [];
  for(var i = 0; i < y; i++) {
    var row = [];
    for(var j = 0; j < x; j++) {
      if (rand) {
        row.push(Math.random() * 2 | 0);
        continue;
      }
      row.push(fill);
    }
    arr.push(row);
  }
  return arr;
};