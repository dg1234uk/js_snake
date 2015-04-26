// Constants
var COLS = 26;
var ROWS = 26;
// IDs
var EMPTY = 0;
var SNAKE = 1;
var FRUIT = 2;
// Directions
var LEFT = 0;
var UP = 1;
var RIGHT = 2;
var DOWN = 3;
// Game objects
var canvas;
var ctx;
var keystate;
var frames;

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
      if (grid.getCellValue(i, j) === EMPTY) {
        empty.push({x:i, y:j});
      }
    }
  }

  // Create a random position
  var randomPosition = empty[Math.floor(Math.random() * empty.length)];
  // Set a fruit at that position.
  grid.setCellValue(FRUIT, randomPosition.x, randomPosition.y);
}

/*
* Starts the game
*/
function main() {
  // Create and initiate the canvas element
  canvas = document.createElement("canvas");
  canvas.width = COLS * 20;
  canvas.height = ROWS * 20;
  ctx = canvas.getContext("2d");
  // Add the canvas element to the body of the document
  document.body.appendChild(canvas)

  frames = 0;
  keystate = {};
  
  // Initiate game objects then start the game loop.
  init();
  gameLoop();
}

/*
* Inits game objects / resets
*/
function init() {
  // Create an empty grid.
  grid.init(EMPTY, COLS, ROWS);

  // Set start position of the snake.
  var startPosition = {x: Math.floor(COLS / 2), y: ROWS - 1};
  // Create the snake with initial direction of up and its start position
  snake.init(UP, startPosition.x, startPosition.y);
  // Put the snake in the grid.
  grid.setCellValue(SNAKE, startPosition.x, startPosition.y);
  // Create some food.
  setFood();
}

/*
* The game loop function, used for game updates and rendering.
*/
function gameLoop() {
  update();
  draw();
  // gameLoop is callback function, canvas is the canvas to draw on.
  window.requestAnimationFrame(gameLoop, canvas);
}

/*
* Update game logic
*/
function update() {
  frames++;
}

/*
* Render the grid to the canvas.
*/
function draw() {
  // Calculate tile width and height
  var tileWidth = canvas.width / grid.width;
  var tileHeight = canvas.width / grid.width;

  // Iterate through the grid and draw all cells.
  for (var i = 0; i < grid.width; i++) {
    for (var j = 0; j < grid.height; j++) {
      // Sets colour of cell based on element in it.
      switch (grid.getCellValue(i, j)) {
        case EMPTY:
          ctx.fillStyle = "#fff";
          break;
        case SNAKE:
          console.log("SNAKE", i, j);
          ctx.fillStyle = "#0ff";
          break;
        case FRUIT:
          ctx.fillStyle = "#f00";
          break;
      }
      ctx.fillRect(i * tileWidth, j * tileHeight, tileWidth, tileHeight);
    }
  }
}

// Start and run the game.
main();




