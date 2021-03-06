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
var score;
// Key Codes
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

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

  ctx.font = "12px Helvetica";

  frames = 0;
  
  // Capture keystate and save them to 'keystate'
  keystate = {};
  document.addEventListener("keydown", function(event) {
    keystate[event.keyCode] = true;
  });
  document.addEventListener("keyup", function(event) {
    delete keystate[event.keyCode];
  });


  // Initiate game objects then start the game loop.
  init();
  gameLoop();
}

/*
* Inits game objects / resets
*/
function init() {
  score = 0;
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
  // Add 1 to total number of frames.
  frames++;

  // Check keystate and change snake direction accordingly.
  if (keystate[KEY_LEFT] && snake.direction !== RIGHT) snake.direction = LEFT;
  if (keystate[KEY_UP] && snake.direction !== DOWN) snake.direction = UP;
  if (keystate[KEY_RIGHT] && snake.direction !== LEFT) snake.direction = RIGHT;
  if (keystate[KEY_DOWN] && snake.direction !== UP) snake.direction = DOWN;

  // Update game state every 5 frames.
  if (frames % 5 === 0) {
    // Get last element from the snake queue.
    var newX = snake.last.x;
    var newY = snake.last.y;

    // Update the snakes position based on its direction.
    switch (snake.direction) {
      case LEFT:
        newX--;
        break;
      case UP:
        newY--;
        break;
      case RIGHT:
        newX++;
        break;
      case DOWN:
        newY++;
        break;
    }

    // Check to see if Snake tries to go outside of world,
    // Also check if the snake hits itself.
    // If so restart the game.
    if (0 > newX || newX > grid.width - 1 ||
      0 > newY || newY > grid.height - 1 ||
      grid.getCellValue(newX, newY) === SNAKE) {
      return init();
    }

    // Check to see if new cell has a fruit in it
    if (grid.getCellValue(newX, newY) === FRUIT) {
      // If it does, increase the size of the snake and set new food.
      var tail = {x: newX, y: newY};
      score++;
      setFood();
    } else {
      // Remove the tail of the snake as it will move on one position.
      var tail = snake.remove();
      grid.setCellValue(EMPTY, tail.x, tail.y);
    }

    // Add the snake ID to the new updated position.
    grid.setCellValue(SNAKE, newX, newY);
    snake.insert(newX, newY);
  }
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

  // Set colour for text
  ctx.fillStyle = "#000";
  // Add SCORE text to bottom left of canvas.
  ctx.fillText("SCORE " + score, 10, canvas.height - 10);
}

// Start and run the game.
main();




