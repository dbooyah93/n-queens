// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) { // rowIndex === attributes.keys && colIndex === array index
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    // CHESS BOARD
    /** N = 4
     * [[1,0,0,0], [0,0,0,0],[0,0,0,0], [0,0,0,0]]
     *
     * makeEmptyMatrix may be the intial board
     *
     */

    /**
     * Main objective:
     * Allow a user to create a chess board
     * The chess board should contain values
     *    rows and coloums
     * Create a bunch of trees
     * Then check trees
     *
     */
    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ \(_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___|(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    // DOM selection for the queen: td.square.positive
    // THIS FUNCTION IS RAN ON CLICK ALREADY  x NxN

    // CHESS BOARD
    /** N = 4
     * [[1,0,0,0], [0,0,0,0],[0,0,0,0], [0,0,0,0]]
     */
    /**
     * runs on Board
     * itterates through parent array
     * then itterates through each child array
     *
     * define a conflict
     *
     *
     * rook1 = {
     *    var colm: parent[0]
     *    let row: parent[0][0]
     * }
     * if( check === 1 )
     *
     */

    /**
     * this === child === board that is created in the html
     * this.attributes === {object} keys ===
     *                      object === 0: [0,0,0,0] . . .
     *                                 1: [0,0,0,0]
     *                                 2: [0,0,0,0]
     * v
     */
    hasRowConflictAt: function(rowIndex) {
      //console.log(n);

      var keys = Object.keys(this.attributes);
      var count = 0;
      for ( var i = 0; i < this.attributes[rowIndex].length; i++ ) {
        var curEle = this.attributes[rowIndex][i];
        if ( curEle === 1 ) {
          count++;
        }
        if ( count > 1 ) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {


      var keys = Object.keys(this.attributes);
      for ( let j = 0; j < keys.length - 1; j++ ) {
        var count = 0;
        var row = this.attributes[j];
        for ( var k = 0; k < row.length; k++ ) {
          if ( row[k] === 1 ) {
            count++;
          }
        }
        if ( count > 1 ) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      var count = 0;

      var keys = Object.keys(this.attributes); // itterates over different arrays [0, 1, 2, 3, n]
      for ( var i = 0; i < keys.length - 1; i++ ) {
        var row = this.attributes[keys[i]];
        if ( row[colIndex] === 1 ) {
          count++;
        }
      }
      if ( count > 1 ) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var checkers = {};
      for ( var key in this.attributes ) {
        var row = this.attributes[key]; // [0,0,0,0]
        for ( var j = 0; j < row.length; j++ ) {
          if ( row[j] === 1 ) {
            if ( checkers[j] ) {
              return true;
            } else {
              checkers[j] = 1;
            }
          }
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(look) {
      let count = 0;
      for ( let r = 0; r < this.attributes.n; r++ ) {
        for ( let c = 0; c < this.attributes[r].length; c++ ) {
          if ( this.attributes[r][c] === 1 ) {
            if ( c - r === look ) {
              count++;
            }
          }
        }
      }
      if (count > 1) {
        return true;
      }
      /** col - row
       * for ( let r = 0; r < this.attributes.n; r++ ) {
       *    for ( let c = 0; c < this.attributes.n; c++ ) {
       *      if ( this.attributes[r][c] === 1 ) {
       *      if ( c - r === majorDiagonalColumnIndexAtFirstRow ) {
       *        return true;
       *      }
       *    }
       *  }
       * }
      * this === child === board that is created in the html
      * this.attributes === {object} keys ===
      *                      object === 0: [0, 1, 2, 3] // 0
      *                                 1: [-1, 0, 1, 2]
      *                                 2: [-2, -1, 0, 1]
      *                                 3: [-3, -2, -1, 0] // 3
      *
      *                      object === 0: [0,1,0,0] // 1
      *                                 1: [0,0,0,0] //
      *                                 2: [0,0,0,1] // 3
      *                                 3: [0,0,0,0]
      *
      *                      object === 0: [0,0,0,0] . . .
      *                                 1: [1,0,0,0]
      *                                 2: [0,1,0,0]
      *                                 3: [0,0,1,0]
      */


      /**
       * if ( this.attributes.)
       */
      // for ( let r = 0; r < this.attributes.n; r++ ) {
      //   if ( this.attributes[r].indexOf(1) >= 0 ) {
      //     for ( let c = r + 1; c < this.attributes.n; c++ ) {
      //       if ( this.attributes[c].indexOf(1) === this.attributes[r].indexOf(1) + c ) {
      //         return true;
      //       }
      //     }
      //   }
      // }

      // /**
      //  * find where 1 starts
      //  * decend one row
      //  * start one colomn out
      //  *
      //  * if no
      //  *
      //  * decend another row
      //  * start another colomn out
      //  */

      // for ( let i = 0; i < this.attributes.n; i++ ) {
      //   if ( this.attributes[i][0] === 1 ) {
      //     for ( let c = 1; c < this.attributes.n; c++ ) {
      //       console.log( this.attributes );
      //       console.log( this.attributes[i]);
      //       console.log('' + i + c);
      //       if ( this.attributes[i + c][i] === 1 ) {
      //         return true;
      //       }
      //     }
      //   }
      // }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let checkers = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      };


      /**
       * indexes = 0 === 1
       * n === 4
       * checkers = {
       *
       * }
       * for ( r = 0; r < n - 1; r++ ) {
       *  for ( ) {}
       *    seeker = this.attributes[r][c];
       *    if ( seeker === 1 ) {
       *      checker[r][c] === 1 || ++
       *  }
       * }
       */


      let seeker = this.attributes;
      if ( seeker[2][0] === 1 || seeker[3][1] === 1 ) {
        checkers[1]++;
      }
      if ( seeker[1][0] === 1 || seeker[2][1] === 1 || seeker[3][2] === 1 ) {
        checkers[2]++;
      }

      if ( seeker[0][0] === 1 || seeker[1][1] === 1 || seeker[2][2] === 1 || seeker[3][3] === 1 ) {
        checkers[3]++;
      }

      if ( seeker[0][1] === 1 || seeker[1][2] === 1 || seeker[2][3] === 1 ) {
        checkers[4]++;
      }
      if ( seeker[0][2] === 1 || seeker[1][3] === 1 ) {
        checkers[5]++;
      }

      for ( var prop in checkers ) {
        //console.log(checkers[prop]);
        if ( checkers[prop] > 1 ) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // Iterate over the last row from right to left and find index of 1
      // for (var r = this.attributes.n - 1; r >= 0; r--) {
      //   if ( this.attributes[r].indexOf(1) >= 0 ) {
      //     let firstQueen = this.attributes[r].indexOf(1);
      //     // Iterate again to find indexOf 1 for each of the following rows
      //     for (var j = r - 1; j < this.attributes[j].length; j--) {
      //       if ( this.attributes[j].indexOf(1) === firstQueen - j) {
      //         return true;
      //       }
      //     }
      //   }
      // }
      // Repeat process starting at second to last row

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
