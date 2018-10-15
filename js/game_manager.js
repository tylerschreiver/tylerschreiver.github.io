function GameManager(size, InputManager, Actuator, StorageManager) {

  this.size           = size; // Size of the grid
  this.inputManager   = new InputManager;
  this.storageManager = new StorageManager;
  this.actuator       = new Actuator;
  this.timerStatus        = 0; //0 = no, 1 = first move made
  this.startTiles     = 2;
  this.startTime      = null;
  this.timerID = null;
  this.showVictory = true;
  this.relay = false;
  this.nextRelay = 16;


  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));
  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));
  this.inputManager.on("settings", this.settingsModal.bind(this));
  this.inputManager.on("closeSettings", this.closeSettingsModal.bind(this));
  this.inputManager.on("relay", this.relayMode.bind(this));
  this.inputManager.on("three", this.chooseFunction.bind(this));
  this.inputManager.on("victory", this.victoryScreen.bind(this));


  if (this.relay) {
      document.getElementById("winning-tile").innerHTML = "16 tile!";
      document.getElementsByClassName("title")[0].innerHTML = "2048 Relay";
  }

  this.setup();
}

// Start the timer
GameManager.prototype.startTimer = function () {
    this.timerStatus = 1;
    this.startTime = new Date()
    this.timerID = setInterval(this.updateTimer, 10, this.startTime);

};

GameManager.prototype.endTime = function () {
    clearInterval(this.timerID);
    var curTime = new Date();
    var time = curTime.getTime() - this.startTime.getTime();
    document.getElementById("timer").innerHTML = pretty(time);
};

// Update the timer
GameManager.prototype.updateTimer = function (startTime) {
    var curTime = new Date();
    var time = curTime.getTime() - startTime.getTime();
    this.time = time;
    document.getElementById("timer").innerHTML = pretty(time);
};

// Restart the game
GameManager.prototype.restart = function () {
    this.storageManager.clearGameState();
    this.actuator.continueGame(); // Clear the game won/lost message
    this.setup();
    document.getElementById("timer16").innerHTML = "";
    document.getElementById("timer32").innerHTML = "";
    document.getElementById("timer64").innerHTML = "";
    document.getElementById("timer128").innerHTML = "";
    document.getElementById("timer256").innerHTML = "";
    document.getElementById("timer512").innerHTML = "";
    document.getElementById("timer1024").innerHTML = "";
    document.getElementById("timer2048").innerHTML = "";
    document.getElementById("timer4096").innerHTML = "";
    document.getElementById("timer8192").innerHTML = "";
    document.getElementById("timer16384").innerHTML = "";

    if (this.relay) {
        this.nextRelay = 16;
        document.getElementById("winning-tile").innerHTML = "16 tile!"
    }
};


GameManager.prototype.victoryScreen = function () {
    this.showVictory = !this.showVictory;
    if (this.showVictory) {
        document.getElementsByClassName("game-message")[0].classList.remove("none-class");
        document.getElementsByClassName("victory-button")[0].innerHTML = "On";
    }
    else {
        document.getElementsByClassName("game-message")[0].classList.add("none-class");
        document.getElementsByClassName("victory-button")[0].innerHTML = "Off";
    }
    console.log("hit");
}


GameManager.prototype.chooseFunction = function () {
    if (this.size == 4) this.three();
    else this.four()
}

GameManager.prototype.three = function () {
    document.getElementsByClassName("three-button")[0].innerHTML = "On";
    this.storageManager.changeGameType("threeByThree");
    this.size = 3;
    var rows = document.getElementsByClassName("grid-row");
    rows[0].childNodes[3].style.display = "none";
    rows[1].childNodes[3].style.display = "none";
    rows[2].childNodes[3].style.display = "none"
    rows[3].style.display = "none";

    var timertiles = document.getElementById("timerbox").children;
    for (i = 29; i < 49; i++) {
        if (timertiles[i])
            timertiles[i].style.display = "none";
    }

    document.getElementById("timer1024").style.marginBottom = "200px";
    document.getElementById("winning-tile").innerHTML = "256 Tile!";

    cells = document.getElementsByClassName("grid-cell");
    for (var i = 0; i < cells.length; i++) cells[i].classList.add("grid-cell-three-by-three");

    var rows = document.getElementsByClassName("grid-row");
    for (var i = 0; i < rows.length; i++) rows[i].style.marginBottom = "20px";
    document.getElementsByClassName("game-container")[0].style.padding = "18px";


    this.restart();

};

GameManager.prototype.four = function () {
    document.getElementsByClassName("three-button")[0].innerHTML = "Off";
    document.getElementById("timer1024").style.marginBottom = "0px";
    this.storageManager.changeGameType("fourByFour");
    this.size = 4;
    var rows = document.getElementsByClassName("grid-row");
    rows[0].childNodes[3].style.display = "block";
    rows[1].childNodes[3].style.display = "block";
    rows[2].childNodes[3].style.display = "block"
    rows[3].style.display = "block";

    var timertiles = document.getElementById("timerbox").children;
    for (i = 29; i < 49; i++) {
        if (timertiles[i])
            timertiles[i].style.display = "block";
    }

    document.getElementsByClassName("game-explanation")[0].style.marginTop = "0px";
    document.getElementById("winning-tile").innerHTML = "2048 Tile!";

    cells = document.getElementsByClassName("grid-cell");
    for (var i = 0; i < cells.length; i++) cells[i].classList.remove("grid-cell-three-by-three");

    var rows = document.getElementsByClassName("grid-row");
    for (var i = 0; i < rows.length; i++) rows[i].style.marginBottom = "15px";
    document.getElementsByClassName("game-container")[0].style.padding = "15px";


    this.restart();
};


GameManager.prototype.relayMode = function () {
    this.relay = !this.relay;
    if (this.relay) {
        this.nextRelay = 8;
        this.restartRelay();
        this.restart();
        document.getElementsByClassName("title")[0].innerHTML = "2048 Relay";
        document.getElementsByClassName("relay-button")[0].innerHTML = "On";
    } else {
        document.getElementsByClassName("title")[0].innerHTML = "2048";
        document.getElementById("winning-tile").innerHTML = "2048 tile";
        document.getElementsByClassName("relay-button")[0].innerHTML = "Off"
        this.restart();
    }
};


GameManager.prototype.restartRelay = function () {
    this.storageManager.clearGameState();
    var previousState = this.storageManager.getGameState();
    this.grid = new Grid(this.size);
    this.score = 0;
    this.over = false;
    this.won = false;
    this.keepPlaying = false;
    this.addStartTiles();
    document.getElementById("winning-tile").innerHTML = this.nextRelay + " tile!";

};


GameManager.prototype.settingsModal = function () {
    document.getElementById("modal").style.display = "block";
};

GameManager.prototype.closeSettingsModal = function () {
    document.getElementById("modal").style.display = "none";
};

// Keep playing after winning (allows going over 2048)
GameManager.prototype.keepPlaying = function () {
    this.keepPlaying = true;
    this.actuator.continueGame(); // Clear the game won/lost message
};

// Return true if the game is lost, or has won and the user hasn't kept playing
GameManager.prototype.isGameTerminated = function () {
    if (this.over || (this.won && !this.keepPlaying)) {
        return true;
    } else {
        return false;
    }
};

// Set up the game
GameManager.prototype.setup = function () {
    document.getElementById("timer").innerHTML = pretty(0);
    var previousState = this.storageManager.getGameState();

    // Reload the game from a previous game if present

    this.grid = new Grid(this.size);
    this.score = 0;
    this.over = false;
    this.won = false;
    this.keepPlaying = false;
    this.timerStatus = 0;
    clearInterval(this.timerID);

    // Add the initial tiles
    this.addStartTiles();

    // Update the actuator
    this.actuate();
};

// Set up the initial tiles to start the game with
GameManager.prototype.addStartTiles = function () {
    for (var i = 0; i < this.startTiles; i++) {
        this.addRandomTile();
    }
};

// Adds a tile in a random position
GameManager.prototype.addRandomTile = function () {
    if (this.grid.cellsAvailable()) {
        var value = Math.random() < 0.9 ? 1024 : 1024;
        var tile = new Tile(this.grid.randomAvailableCell(), value);

        this.grid.insertTile(tile);
    }
};

// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
    if (this.storageManager.getBestScore() < this.score) {
        this.storageManager.setBestScore(this.score);
    }

    // Clear the state when the game is over (game over only, not win)
    if (this.over) {
        this.storageManager.clearGameState();
    } else {
        this.storageManager.setGameState(this.serialize());
    }

    this.actuator.actuate(this.grid, {
        score: this.score,
        over: this.over,
        won: this.won,
        bestScore: this.storageManager.getBestScore(),
        terminated: this.isGameTerminated(),
        time: this.time
    });

};

// Represent the current game as an object
GameManager.prototype.serialize = function () {
    return {
        grid: this.grid.serialize(),
        score: this.score,
        over: this.over,
        won: this.won,
        keepPlaying: this.keepPlaying,
        time: this.time
    };
};

// Save all tile positions and remove merger info
GameManager.prototype.prepareTiles = function () {
    this.grid.eachCell(function (x, y, tile) {
        if (tile) {
            tile.mergedFrom = null;
            tile.savePosition();
        }
    });
};

// Move a tile and its representation
GameManager.prototype.moveTile = function (tile, cell) {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
};

// Move tiles on the grid in the specified direction
GameManager.prototype.move = function (direction) {
  // 0: up, 1: right, 2: down, 3: left
  var self = this;
  
  if (this.isGameTerminated()) return; // Don't do anything if the game's over
  
  if (this.timerStatus == 0){
    this.startTimer()
  }

  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved      = false;

  // Save the current tile positions and remove merger information
  this.prepareTiles();

  // Traverse the grid in the right direction and move tiles
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next      = self.grid.cellContent(positions.next);

        // Only one merger per row traversal?
        if (next && next.value === tile.value && !next.mergedFrom) {
          var merged = new Tile(positions.next, tile.value * 2);
          merged.mergedFrom = [tile, next];
          if (merged.value == 2048 && !self.won && self.showVictory) self.won = true;

          self.grid.insertTile(merged);
          self.grid.removeTile(tile);

          // Converge the two tiles' positions
          tile.updatePosition(positions.next);

          // Update the score
          self.score += merged.value;

          if (self.relay) {
              var box = document.getElementsByClassName("scores-container")[0];
              //hard code a line split to not frick up other CSS on site
              if (box.offsetWidth + 234 > 488) document.getElementsByClassName("title")[0].classList.add("relay-title-large-score");
              else document.getElementsByClassName("title")[0].classList.remove("relay-title-large-score");
          } else document.getElementsByClassName("title")[0].classList.remove("relay-title-large-score");



            //tile is made
          var id = "timer" + merged.value;
          if (!self.relay) {
              if (document.getElementById(id) && document.getElementById(id).innerHTML === "") document.getElementById(id).innerHTML = pretty(time);
          }
          else {
              if (merged.value == self.nextRelay) {
                  document.getElementById(id).innerHTML = pretty(time);
                  self.nextRelay = self.nextRelay * 2;
                  self.restartRelay();
              }
          }

        } else {
          self.moveTile(tile, positions.farthest);
        }
        if (!self.positionsEqual(cell, tile)) {
            moved = true; // The tile moved from its original cell!
        }
        }
        });
    });

    if (moved) {
        this.addRandomTile();

        if (!this.movesAvailable()) {
            if (!this.relay) {
                this.over = true;
                this.endTime() // Game over!
            }
            else {
                this.restartRelay();
            }
        }

        this.actuate();
    }
};

// Get the vector representing the chosen direction
GameManager.prototype.getVector = function (direction) {
    // Vectors representing tile movement
    var map = {
        0: { x: 0, y: -1 }, // Up
        1: { x: 1, y: 0 },  // Right
        2: { x: 0, y: 1 },  // Down
        3: { x: -1, y: 0 }   // Left
    };

    return map[direction];
};

// Build a list of positions to traverse in the right order
GameManager.prototype.buildTraversals = function (vector) {
    var traversals = { x: [], y: [] };

    for (var pos = 0; pos < this.size; pos++) {
        traversals.x.push(pos);
        traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
};

GameManager.prototype.findFarthestPosition = function (cell, vector) {
    var previous;

    // Progress towards the vector direction until an obstacle is found
    do {
        previous = cell;
        cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.grid.withinBounds(cell) &&
             this.grid.cellAvailable(cell));

    return {
        farthest: previous,
        next: cell // Used to check if a merge is required
    };
};

GameManager.prototype.movesAvailable = function () {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
};

// Check for available matches between tiles (more expensive check)
GameManager.prototype.tileMatchesAvailable = function () {
    var self = this;

    var tile;

    for (var x = 0; x < this.size; x++) {
        for (var y = 0; y < this.size; y++) {
            tile = this.grid.cellContent({ x: x, y: y });

            if (tile) {
                for (var direction = 0; direction < 4; direction++) {
                    var vector = self.getVector(direction);
                    var cell = { x: x + vector.x, y: y + vector.y };

                    var other = self.grid.cellContent(cell);

                    if (other && other.value === tile.value) {
                        return true; // These two tiles can be merged
                    }
                }
            }
        }
    }

    return false;
};

GameManager.prototype.positionsEqual = function (first, second) {
    return first.x === second.x && first.y === second.y;
};