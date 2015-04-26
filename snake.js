// Constants
var COLS = 26;
var ROWS = 26;
// IDs
var EMPTY = 0;
var SNAKE = 1;
var FRUIT = 2;

var grid = {
  width : null,
  height: null,
  _grid: null,

  /*
  * Initiate and fill a columns x rows grid with defaultFillValue (e.g. EMPTY, SNAKE or FRUIT)
  * @param {any}    defaultFillValue default value to fill grid cell with
  * @param {number} columns number of columns
  * @param {number} rows number of rows
  */
  init: function(defaultFillValue, columns, rows) {
    this.width = columns;
    this.height = rows;

    // Creates an empty array 'grid', outer for loop pushs empty array to 'grid'
    // this will be a coloumn. The inner for loop then adds the defaultFillValue
    // to the column array thus creating a cell on that row.
    this._grid = [];
    for (var i = 0; i < columns; i++) {
      this._grid.push([]);
      for (var j = 0; j < rows; j++) {
        this._grid[i].push(defaultFillValue);
      }
    }
  },

  /*
  * Set the value of the grid cell at (x, y)
  *
  * @param {any}    value what to set
  * @param {number} x the x-coordinate
  * @param {number} y the y-coordinate
  */
  setCellValue: function(value, x, y) {
    this._grid[x][y] = value;
  },

  /*
  * Get the value of the grid cell at (x, y)
  *
  * @param {number} x the x-coordinate
  * @param {number} y the y-coordinate
  * @return {any}   the value at the cell
  */
  getCellValue: function(x, y) {
    return this._grid[x][y];
  }
}

var snake = {
  direction: null,
  _queue: null,

  init: function(snakeDirection, x, y) {

  },

  insert: function(x, y) {

  },

  remove: function() {

  }
}

function setFood() {

}

function main() {

}

function init() {

}

function loop() {

}

function update() {

}

function draw() {

}

main();




