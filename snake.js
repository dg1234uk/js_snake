// Constants
var COLS = 26;
var ROWS = 26;
// IDs
var EMPTY = 0;
var SNAKE = 1;
var FRUIT = 2;


/**
* Grid data structure.
*
* @type {object}
*/
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

/**
* The snake works as a queue (FIFO) of data
* with all current positions in grid with snake
* id
*
* @type {object}
*/
var snake = {
  direction: null,  // Snake direction, represented by a number
  last: null,       // Object, pointer to the last element in the queue
  _queue: null,     // Array<number>


  /*
  * Clears the queue (snake) and sets the start position and direction
  *
  * @param {number} d start direction
  * @param {number} x start x-coordinate
  * @param {number} y start y-coordinate
  */
  init: function(snakeDirection, x, y) {
    // Sets Snakes starting direction.
    this.direction = snakeDirection;
    
    // Creates an empty queue (aka snake)
    this._queue = [];
    // Inserts first block of the snakes body
    this.insert(x, y);
  },

  /*
  * Adds an element to the snake queue
  *
  * @param {number} x x-coordinate
  * @param {number} y y-coordinate
  */
  insert: function(x, y) {
    // Add object to the begining of the snake queue
    this._queue.unshift({x:x, y:y});
    // Saves this newly added element to 'last'.
    this.last = this._queue[0];
  },

  /*
  * Removes and returns the first element of the snake queue
  *
  * @return {Object} the first element
  */
  remove: function() {
    return this._queue.pop();
  }
}

/*
* Set a food id at random free cell in the grid
*/
function setFood() {
  // An array to store all EMPTY locations in 'grid'.
  var empty = [];
  // Find EMPTY locations in 'grid' and store them in 'empty'
  for (var i = 0; i < grid.width; i++) {
    for (var j = 0; j < grid.height; j++) {
      if (grid.getCellValue(x, y) === EMPTY) {
        empty.push({x:x, y:y});
      }
    }
  }

  // Create a random position
  var randomPosition = empty[Math.floor(Math.random() * empty.length)];
  // Set a fruit at that position.
  grid.setCellValue(FRUIT, randomPosition.x, randomPosition.y);
}

// Game objects
var canvas;
var ctx;
var keystate;
var frames;

function main() {
  canvas = document.createElement("canvas");
  canvas.width = COLS * 20;
  canvas.height = ROWS * 20;
  ctx = canvas.getContext("2d");
  document.appendChild(canvas);

  frames = 0;
  keystate = {};

  init();
  loop();
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




