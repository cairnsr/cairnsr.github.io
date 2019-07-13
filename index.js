/*
 * Add your JavaScript to this file to complete the assignment.
 */

var modalBackdrop = document.getElementById('modal-backdrop');
var createTwit = document.getElementById('create-twit-modal');

var createWordsearch = document.getElementById('create-wordsearch-modal');


var addButton = document.getElementById('navbar-search-button');

var cancelButton = document.querySelector('.wordsearch-modal-cancel-button');
var closeButton = document.querySelector('.wordsearch-modal-close-button');
var createButton = document.querySelector('.modal-accept-button');
var twitContainer = document.querySelector('.twit-container');


function makingTweet() {

  modalBackdrop.style.display = 'block';
  //createTwit.style.display = 'block';
  createWordsearch.style.display = 'block';

}

addButton.addEventListener('click', makingTweet);

function closingTweet (){

  //textInput.value = '';
  //authorInput.value = '';

  modalBackdrop.style.display = 'none';
  //createTwit.style.display = 'none';
  createWordsearch.style.display = 'none';

}

closeButton.addEventListener('click', closingTweet);
cancelButton.addEventListener('click', closingTweet);


function continueMakeTweet(event){

  var newTwit = document.createElement('article');
  var newDiv = document.createElement('div');
  var newI = document.createElement('i');
  var newTwitDiv = document.createElement('div');
  var newTwitText = document.createElement('p');
  var newTwitAuthor = document.createElement('p');


  newTwit.classList.add('twit');
  newDiv.classList.add('twit-icon');
  newI.classList.add('fa', 'fa-bullhorn');
  newTwit.appendChild(newDiv);
  newDiv.appendChild(newI);

  newTwitDiv.classList.add('twit-content');
  newTwitAuthor.classList.add('twit-attribution');
  newTwitText.classList.add('twit-text');
  newTwitText.textContent = textInput.value;
  newTwitAuthor.textContent = authorInput.value;

  newTwitDiv.appendChild(newTwitText);
  newTwitDiv.appendChild(newTwitAuthor);
  newTwit.appendChild(newTwitDiv);
  twitContainer.appendChild(newTwit);
}

function makeTweet (){


  if ((textInput.value == '') || (authorInput.value == '')){

    alert("You did not input text in both boxes");

  }
  else {
    //continueMakeTweet();
    modalBackdrop.style.display = 'none';
    //createTwit.style.display = 'none';
    createWordsearch.style.display = 'none';

    //textInput.value = '';
    //authorInput.value = '';
  }
}

//createButton.addEventListener('click', makeTweet);

var elem = document.body.firstChild;
var twit = document.getElementsByClassName('twit');
var content = document.querySelector('div.twit-content');
var icon = document.querySelectorAll('.twit-icon');
var textInput = document.getElementById('twit-text-input');
var authorInput = document.getElementById('twit-attribution-input');
var searchInput = document.getElementById('navbar-search-input');
var searchButton = document.getElementById('navbar-search-button');

//var searchButton = document.getElementById('add-word');


var allTweets = document.querySelectorAll('.twit');


function searchWords() {

  for (var i = 0; i < allTweets.length; i++) {
    var allWords = allTweets[i].getElementsByTagName('p');

    if (allWords.twitText == searchInput.value){

     allTweets[i].remove(allTweets.twit);
    }
    console.log (searchInput.value);
 }
}

// searchButton.addEventListener('click', searchWords);

searchButton.addEventListener('click', makingTweet);




/**
* Wordfind.js 0.0.1
* (c) 2012 Bill, BunKat LLC.
* Wordfind is freely distributable under the MIT license.
* For all details and documentation:
*     http://github.com/bunkat/wordfind
*/

(function () {

  'use strict';

  /**
  * Generates a new word find (word search) puzzle provided a set of words.
  * Can automatically determine the smallest puzzle size in which all words
  * fit, or the puzzle size can be manually configured.  Will automatically
  * increase puzzle size until a valid puzzle is found.
  *
  * WordFind has no dependencies.
  */

  /**
  * Initializes the WordFind object.
  *
  */
  var WordFind = function () {

    // Letters used to fill blank spots in the puzzle
    const LETTERS = 'abcdefghijklmnoprstuvwy';

    /**
    * Definitions for all the different orientations in which words can be
    * placed within a puzzle. New orientation definitions can be added and they
    * will be automatically available.
    */

    // The list of all the possible orientations
    var allOrientations = ['horizontal','horizontalBack','vertical','verticalUp',
                           'diagonal','diagonalUp','diagonalBack','diagonalUpBack'];

    // The definition of the orientation, calculates the next square given a
    // starting square (x,y) and distance (i) from that square.
    var orientations = {
      horizontal:     function(x,y,i) { return {x: x+i, y: y  }; },
      horizontalBack: function(x,y,i) { return {x: x-i, y: y  }; },
      vertical:       function(x,y,i) { return {x: x,   y: y+i}; },
      verticalUp:     function(x,y,i) { return {x: x,   y: y-i}; },
      diagonal:       function(x,y,i) { return {x: x+i, y: y+i}; },
      diagonalBack:   function(x,y,i) { return {x: x-i, y: y+i}; },
      diagonalUp:     function(x,y,i) { return {x: x+i, y: y-i}; },
      diagonalUpBack: function(x,y,i) { return {x: x-i, y: y-i}; }
    };

    // Determines if an orientation is possible given the starting square (x,y),
    // the height (h) and width (w) of the puzzle, and the length of the word (l).
    // Returns true if the word will fit starting at the square provided using
    // the specified orientation.
    var checkOrientations = {
      horizontal:     function(x,y,h,w,l) { return w >= x + l; },
      horizontalBack: function(x,y,h,w,l) { return x + 1 >= l; },
      vertical:       function(x,y,h,w,l) { return h >= y + l; },
      verticalUp:     function(x,y,h,w,l) { return y + 1 >= l; },
      diagonal:       function(x,y,h,w,l) { return (w >= x + l) && (h >= y + l); },
      diagonalBack:   function(x,y,h,w,l) { return (x + 1 >= l) && (h >= y + l); },
      diagonalUp:     function(x,y,h,w,l) { return (w >= x + l) && (y + 1 >= l); },
      diagonalUpBack: function(x,y,h,w,l) { return (x + 1 >= l) && (y + 1 >= l); }
    };

    // Determines the next possible valid square given the square (x,y) was ]
    // invalid and a word lenght of (l).  This greatly reduces the number of
    // squares that must be checked. Returning {x: x+1, y: y} will always work
    // but will not be optimal.
    var skipOrientations = {
      horizontal:     function(x,y,l) { return {x: 0,   y: y+1  }; },
      horizontalBack: function(x,y,l) { return {x: l-1, y: y    }; },
      vertical:       function(x,y,l) { return {x: 0,   y: y+100}; },
      verticalUp:     function(x,y,l) { return {x: 0,   y: l-1  }; },
      diagonal:       function(x,y,l) { return {x: 0,   y: y+1  }; },
      diagonalBack:   function(x,y,l) { return {x: l-1, y: x>=l-1?y+1:y    }; },
      diagonalUp:     function(x,y,l) { return {x: 0,   y: y<l-1?l-1:y+1  }; },
      diagonalUpBack: function(x,y,l) { return {x: l-1, y: x>=l-1?y+1:y  }; }
    };

    /**
    * Initializes the puzzle and places words in the puzzle one at a time.
    *
    * Returns either a valid puzzle with all of the words or null if a valid
    * puzzle was not found.
    *
    */
    var fillPuzzle = function (words, options) {

      var puzzle = [], i, j, len;

      // initialize the puzzle with blanks
      for (i = 0; i < options.height; i++) {
        puzzle.push([]);
        for (j = 0; j < options.width; j++) {
          puzzle[i].push('');
        }
      }

      // add each word into the puzzle one at a time
      for (i = 0, len = words.length; i < len; i++) {
        if (!placeWordInPuzzle(puzzle, options, words[i])) {
          // if a word didn't fit in the puzzle, give up
          return null;
        }
      }

      // return the puzzle
      return puzzle;
    };

    /**
    * Adds the specified word to the puzzle by finding all of the possible
    * locations where the word will fit and then randomly selecting one. Options
    * controls whether or not word overlap should be maximized.
    *
    * Returns true if the word was successfully placed, false otherwise.
    */
    var placeWordInPuzzle = function (puzzle, options, word) {

      // find all of the best locations where this word would fit
      var locations = findBestLocations(puzzle, options, word);

      if (locations.length === 0) {
        return false;
      }

      // select a location at random and place the word there
      var sel = locations[Math.floor(Math.random() * locations.length)];
      placeWord(puzzle, word, sel.x, sel.y, orientations[sel.orientation]);

      return true;
    };

    /**
    * Iterates through the puzzle and determines all of the locations where
    * the word will fit. Options determines if overlap should be maximized or
    * not.
    *
    * Returns a list of location objects which contain an x,y cooridinate
    * indicating the start of the word, the orientation of the word, and the
    * number of letters that overlapped with existing letter.
    */
    var findBestLocations = function (puzzle, options, word) {

      var locations = [],
          height = options.height,
          width = options.width,
          wordLength = word.length,
          maxOverlap = 0; // we'll start looking at overlap = 0

      // loop through all of the possible orientations at this position
      for (var k = 0, len = options.orientations.length; k < len; k++) {

        var orientation = options.orientations[k],
            check = checkOrientations[orientation],
            next = orientations[orientation],
            skipTo = skipOrientations[orientation],
            x = 0, y = 0;

        // loop through every position on the board
        while( y < height ) {

          // see if this orientation is even possible at this location
          if (check(x, y, height, width, wordLength)) {

            // determine if the word fits at the current position
            var overlap = calcOverlap(word, puzzle, x, y, next);

            // if the overlap was bigger than previous overlaps that we've seen
            if (overlap >= maxOverlap || (!options.preferOverlap && overlap > -1)) {
              maxOverlap = overlap;
              locations.push({x: x, y: y, orientation: orientation, overlap: overlap});
            }

            x++;
            if (x >= width) {
              x = 0;
              y++;
            }
          } else {
            // if current cell is invalid, then skip to the next cell where
            // this orientation is possible. this greatly reduces the number
            // of checks that we have to do overall
            var nextPossible = skipTo(x,y,wordLength);
            x = nextPossible.x;
            y = nextPossible.y;
          }

        }
      }

      // finally prune down all of the possible locations we found by
      // only using the ones with the maximum overlap that we calculated
      return options.preferOverlap ?
             pruneLocations(locations, maxOverlap) :
             locations;
    };

    /**
    * Determines whether or not a particular word fits in a particular
    * orientation within the puzzle.
    *
    * Returns the number of letters overlapped with existing words if the word
    * fits in the specified position, -1 if the word does not fit.
    */
    var calcOverlap = function (word, puzzle, x, y, fnGetSquare) {
      var overlap = 0;

      // traverse the squares to determine if the word fits
      for (var i = 0, len = word.length; i < len; i++) {

        var next = fnGetSquare(x, y, i),
            square = puzzle[next.y][next.x];

        // if the puzzle square already contains the letter we
        // are looking for, then count it as an overlap square
        if (square === word[i]) {
          overlap++;
        }
        // if it contains a different letter, than our word doesn't fit
        // here, return -1
        else if (square !== '' ) {
          return -1;
        }
      }

      // if the entire word is overlapping, skip it to ensure words aren't
      // hidden in other words
      return overlap;
    };

    /**
    * If overlap maximization was indicated, this function is used to prune the
    * list of valid locations down to the ones that contain the maximum overlap
    * that was previously calculated.
    *
    * Returns the pruned set of locations.
    */
    var pruneLocations = function (locations, overlap) {
      var pruned = [];
      for(var i = 0, len = locations.length; i < len; i++) {
        if (locations[i].overlap >= overlap) {
          pruned.push(locations[i]);
        }
      }
      return pruned;
    };

    /**
    * Places a word in the puzzle given a starting position and orientation.
    */
    var placeWord = function (puzzle, word, x, y, fnGetSquare) {
      for (var i = 0, len = word.length; i < len; i++) {
        var next = fnGetSquare(x, y, i);
        puzzle[next.y][next.x] = word[i];
      }
    };

    return {

      /**
      * Returns the list of all of the possible orientations.
      */
      validOrientations: allOrientations,

      /**
      * Returns the orientation functions for traversing words.
      */
      orientations: orientations,

      /**
      * Generates a new word find (word search) puzzle.
      *
      * Settings:
      *
      * height: desired height of the puzzle, default: smallest possible
      * width:  desired width of the puzzle, default: smallest possible
      * orientations: list of orientations to use, default: all orientations
      * fillBlanks: true to fill in the blanks, default: true
      * maxAttempts: number of tries before increasing puzzle size, default:3
      * maxGridGrowth: number of puzzle grid increases, default:10
      * preferOverlap: maximize word overlap or not, default: true
      *
      * Returns the puzzle that was created.
      *

      */
      newPuzzle: function(words, settings) {
        if (!words.length) {
          throw new Error('Zero words provided');
        }
        var wordList, puzzle, attempts = 0, gridGrowths = 0, opts = settings || {};

        // copy and sort the words by length, inserting words into the puzzle
        // from longest to shortest works out the best
        wordList = words.slice(0).sort();

        // initialize the options
        // var maxWordLength = wordList[0].length;
        var maxWordLength =12;

        var options = {
          height:           opts.height || maxWordLength,
          width:            opts.width || maxWordLength,
          orientations:     opts.orientations || allOrientations,
          fillBlanks:       opts.fillBlanks !== undefined ? opts.fillBlanks : true,
          allowExtraBlanks: opts.allowExtraBlanks !== undefined ? opts.allowExtraBlanks : true,
          maxAttempts:      opts.maxAttempts || 3,
          maxGridGrowth:    opts.maxGridGrowth !== undefined ? opts.maxGridGrowth : 10,
          preferOverlap:    opts.preferOverlap !== undefined ? opts.preferOverlap : true
        };

        // add the words to the puzzle
        // since puzzles are random, attempt to create a valid one up to
        // maxAttempts and then increase the puzzle size and try again
        while (!puzzle) {
          while (!puzzle && attempts++ < options.maxAttempts) {
            puzzle = fillPuzzle(wordList, options);
          }

          if (!puzzle) {
            gridGrowths++;
            if (gridGrowths > options.maxGridGrowth) {
              throw new Error(`No valid ${options.width}x${options.height} grid found and not allowed to grow more`);
            }
            console.log(`No valid ${options.width}x${options.height} grid found after ${attempts - 1} attempts, trying with bigger grid`);
            options.height++;
            options.width++;
            attempts = 0;
          }
        }

        // fill in empty spaces with random letters
        if (options.fillBlanks) {
            var lettersToAdd, fillingBlanksCount = 0, extraLetterGenerator;
            if (typeof options.fillBlanks === 'function') {
                extraLetterGenerator = options.fillBlanks;
            } else if (typeof options.fillBlanks === 'string') {
                lettersToAdd = options.fillBlanks.toLowerCase().split('');
                extraLetterGenerator = () => lettersToAdd.pop() || (fillingBlanksCount++ && '');
            } else {
                extraLetterGenerator = () => LETTERS[Math.floor(Math.random() * LETTERS.length)];
            }

            var extraLettersCount = this.fillBlanks({puzzle, extraLetterGenerator: extraLetterGenerator});
            if (lettersToAdd && lettersToAdd.length) {
                throw new Error(`Some extra letters provided were not used: ${lettersToAdd}`);
            }
            if (lettersToAdd && fillingBlanksCount && !options.allowExtraBlanks) {
                throw new Error(`${fillingBlanksCount} extra letters were missing to fill the grid`);
            }
            var gridFillPercent = 100 * (1 - extraLettersCount / (options.width * options.height));
            console.log(`Blanks filled with ${extraLettersCount} random letters - Final grid is filled at ${gridFillPercent.toFixed(0)}%`);
        }

        return puzzle;
      },

      /**
      * Wrapper around `newPuzzle` allowing to find a solution without some words.
      *
      * Same as `newPuzzle` + allowedMissingWords
      */
      newPuzzleLax: function(words, opts) {
        try {
            return this.newPuzzle(words, opts);
        } catch (e) {
            if (!opts.allowedMissingWords) {
                throw e;
            }
            var opts = Object.assign({}, opts); // shallow copy
            opts.allowedMissingWords--;
            for (var i = 0; i < words.length; i++) {
                var wordList = words.slice(0);
                wordList.splice(i, 1);
                try {
                    var puzzle = this.newPuzzleLax(wordList, opts);
                    console.log(`Solution found without word "${words[i]}"`);
                    return puzzle;
                } catch (e) {} // continue if error
            }
            throw e;
        }
      },

      /**
      * Fills in any empty spaces in the puzzle with random letters.
      *
      */
      fillBlanks: function ({puzzle, extraLetterGenerator}) {
        var extraLettersCount = 0;
        for (var i = 0, height = puzzle.length; i < height; i++) {
          var row = puzzle[i];
          for (var j = 0, width = row.length; j < width; j++) {
            if (!puzzle[i][j]) {
              puzzle[i][j] = extraLetterGenerator();
              extraLettersCount++;
            }
          }
        }
        return extraLettersCount;
      },

      /**
      * Returns the starting location and orientation of the specified words
      * within the puzzle. Any words that are not found are returned in the
      * notFound array.
      *
      * Returns
      *   x position of start of word
      *   y position of start of word
      *   orientation of word
      *   word
      *   overlap (always equal to word.length)
      */
      solve: function (puzzle, words) {
        var options = {
              height:       puzzle.length,
              width:        puzzle[0].length,
              orientations: allOrientations,
              preferOverlap: true
            },
            found = [],
            notFound = [];

        for(var i = 0, len = words.length; i < len; i++) {
          var word = words[i],
              locations = findBestLocations(puzzle, options, word);

          if (locations.length > 0 && locations[0].overlap === word.length) {
            locations[0].word = word;
            found.push(locations[0]);
          } else {
            notFound.push(word);
          }
        }

        return { found: found, notFound: notFound };
      },

      /**
      * Outputs a puzzle to the console, useful for debugging.
      * Returns a formatted string representing the puzzle.
      *
      */
      print: function (puzzle) {
        var puzzleString = '';
        for (var i = 0, height = puzzle.length; i < height; i++) {
          var row = puzzle[i];
          for (var j = 0, width = row.length; j < width; j++) {
            puzzleString += (row[j] === '' ? ' ' : row[j]) + ' ';
          }
          puzzleString += '\n';
        }

        console.log(puzzleString);
        return puzzleString;
      }
    };
  };

  /**
  * Allow library to be used within both the browser and node.js
  */
  var root = typeof exports !== "undefined" && exports !== null ? exports : window;
  root.wordfind = WordFind();

}).call(this);

/**
* Wordfind.js 0.0.1
* (c) 2012 Bill, BunKat LLC.
* Wordfind is freely distributable under the MIT license.
* For all details and documentation:
*     http://github.com/bunkat/wordfind
*/

(function (document, $, wordfind) {
  'use strict';

  /**
  * An example game using the puzzles created from wordfind.js. Click and drag
  * to highlight words.
  *
  * WordFindGame requires wordfind.js and jQuery.
  */

    /**
    * Draws the puzzle by inserting rows of buttons into el.
    *
    */
    var drawPuzzle = function (el, puzzle) {
      var output = '';
      // for each row in the puzzle
      for (var i = 0, height = puzzle.length; i < height; i++) {
        // append a div to represent a row in the puzzle
        var row = puzzle[i];
        output += '<div>';
        // for each element in that row
        for (var j = 0, width = row.length; j < width; j++) {
            // append our button with the appropriate class
            output += '<button class="puzzleSquare" x="' + j + '" y="' + i + '">';
            output += row[j] || '&nbsp;';
            output += '</button>';
        }
        // close our div that represents a row
        output += '</div>';
      }

      $(el).html(output);
    };

    var getWords = function () {
      return $('input.word').toArray().map(wordEl => wordEl.value.toLowerCase()).filter(word => word);
    };

    /**
    * Given two points, ensure that they are adjacent and determine what
    * orientation the second point is relative to the first
    *
    */
    var calcOrientation = function (x1, y1, x2, y2) {

      for (var orientation in wordfind.orientations) {
        var nextFn = wordfind.orientations[orientation];
        var nextPos = nextFn(x1, y1, 1);

        if (nextPos.x === x2 && nextPos.y === y2) {
          return orientation;
        }
      }

      return null;
    };


  /**
  * Initializes the WordFindGame object.
  *
  * Creates a new word find game and draws the board and words.
  *
  * Returns the puzzle that was created.
  *
  */
  var WordFindGame = function (puzzleEl, options) {

    // Class properties, game initial config:
    var wordList, puzzle;

    /**
    * Game play events.
    *
    * The following events handle the turns, word selection, word finding, and
    * game end.
    *
    */

    // Game state
    var startSquare, selectedSquares = [], curOrientation, curWord = '';

    /**
    * Event that handles mouse down on a new square. Initializes the game state
    * to the letter that was selected.
    *
    */
    var startTurn = function () {
      $(this).addClass('selected');
      startSquare = this;
      selectedSquares.push(this);
      curWord = $(this).text();
    };

    var touchMove = function(e) {
      var xPos = e.originalEvent.touches[0].pageX;
      var yPos = e.originalEvent.touches[0].pageY;
      var targetElement = document.elementFromPoint(xPos, yPos);
      select(targetElement)
    };

    var mouseMove = function() {
      select(this);
    };

    /**
    * Event that handles mouse over on a new square. Ensures that the new square
    * is adjacent to the previous square and the new square is along the path
    * of an actual word.
    *
    */
    var select = function (target) {
      // if the user hasn't started a word yet, just return
      if (!startSquare) {
        return;
      }

      // if the new square is actually the previous square, just return
      var lastSquare = selectedSquares[selectedSquares.length-1];
      if (lastSquare == target) {
        return;
      }

      // see if the user backed up and correct the selectedSquares state if
      // they did
      var backTo;
      for (var i = 0, len = selectedSquares.length; i < len; i++) {
        if (selectedSquares[i] == target) {
          backTo = i+1;
          break;
        }
      }

      while (backTo < selectedSquares.length) {
        $(selectedSquares[selectedSquares.length-1]).removeClass('selected');
        selectedSquares.splice(backTo,1);
        curWord = curWord.substr(0, curWord.length-1);
      }


      // see if this is just a new orientation from the first square
      // this is needed to make selecting diagonal words easier
      var newOrientation = calcOrientation(
          $(startSquare).attr('x')-0,
          $(startSquare).attr('y')-0,
          $(target).attr('x')-0,
          $(target).attr('y')-0
          );

      if (newOrientation) {
        selectedSquares = [startSquare];
        curWord = $(startSquare).text();
        if (lastSquare !== startSquare) {
          $(lastSquare).removeClass('selected');
          lastSquare = startSquare;
        }
        curOrientation = newOrientation;
      }

      // see if the move is along the same orientation as the last move
      var orientation = calcOrientation(
          $(lastSquare).attr('x')-0,
          $(lastSquare).attr('y')-0,
          $(target).attr('x')-0,
          $(target).attr('y')-0
          );

      // if the new square isn't along a valid orientation, just ignore it.
      // this makes selecting diagonal words less frustrating
      if (!orientation) {
        return;
      }

      // finally, if there was no previous orientation or this move is along
      // the same orientation as the last move then play the move
      if (!curOrientation || curOrientation === orientation) {
        curOrientation = orientation;
        playTurn(target);
      }
    };

    /**
    * Updates the game state when the previous selection was valid.
    *
    */
    var playTurn = function (square) {

      // make sure we are still forming a valid word
      for (var i = 0, len = wordList.length; i < len; i++) {
        if (wordList[i].indexOf(curWord + $(square).text()) === 0) {
          $(square).addClass('selected');
          selectedSquares.push(square);
          curWord += $(square).text();
          break;
        }
      }
    };

    /**
    * Event that handles mouse up on a square. Checks to see if a valid word
    * was created and updates the class of the letters and word if it was. Then
    * resets the game state to start a new word.
    *
    */
    var endTurn = function () {
      // see if we formed a valid word
      for (var i = 0, len = wordList.length; i < len; i++) {

        if (wordList[i] === curWord) {
          $('.selected').addClass('found');
          wordList.splice(i,1);
          $('input.word[value="' + curWord + '"]').addClass('wordFound');
        }

        if (wordList.length === 0) {
          $('.puzzleSquare').addClass('complete');
        }
      }

      // reset the turn
      $('.selected').removeClass('selected');
      startSquare = null;
      selectedSquares = [];
      curWord = '';
      curOrientation = null;
    };

    /* Constructor START */
    $('input.word').removeClass('wordFound');

    // Class properties, game initial config:
    wordList = getWords().sort();
    puzzle = wordfind.newPuzzleLax(wordList, options);

    // Draw all of the words
    drawPuzzle(puzzleEl, puzzle);

    // attach events to the buttons
    // optimistically add events for windows 8 touch
    if (window.navigator.msPointerEnabled) {
      $('.puzzleSquare').on('MSPointerDown', startTurn);
      $('.puzzleSquare').on('MSPointerOver', select);
      $('.puzzleSquare').on('MSPointerUp', endTurn);
    } else {
      $('.puzzleSquare').mousedown(startTurn);
      $('.puzzleSquare').mouseenter(mouseMove);
      $('.puzzleSquare').mouseup(endTurn);
      $('.puzzleSquare').on("touchstart", startTurn);
      $('.puzzleSquare').on("touchmove", touchMove);
      $('.puzzleSquare').on("touchend", endTurn);
    }

    /**
    * Solves an existing puzzle.
    *
    */
    this.solve = function() {
      var solution = wordfind.solve(puzzle, wordList).found;

      for( var i = 0, len = solution.length; i < len; i++) {
        var word = solution[i].word,
            orientation = solution[i].orientation,
            x = solution[i].x,
            y = solution[i].y,
            next = wordfind.orientations[orientation];

        var wordEl = $('input.word[value="' + word + '"]');
        if (!wordEl.hasClass('wordFound')) {
          for (var j = 0, size = word.length; j < size; j++) {
            var nextPos = next(x, y, j);
            $('[x="' + nextPos.x + '"][y="' + nextPos.y + '"]').addClass('solved');
          }

          wordEl.addClass('wordFound');
        }
      }
    };
  };

  WordFindGame.emptySquaresCount = function () {
    var allSquares = $('.puzzleSquare').toArray();
    return allSquares.length - allSquares.filter(b => b.textContent.trim()).length;
  };

  // Static method
  WordFindGame.insertWordBefore = function (el, word) {
    $('<li><input class="word" value="' + (word || '') + '"></li>').insertBefore(el);
  };


  /**
  * Allow game to be used within the browser
  */
  window.WordFindGame = WordFindGame;

}(document, jQuery, wordfind));
