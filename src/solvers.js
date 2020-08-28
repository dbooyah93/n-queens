/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting



// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// USE HELPER FUNCTIONS IN Board.js TO FILL THESE FUNCTIONS

window.findNRooksSolution = function(n) {
  var solution = []; //fixme


  var board = new Board( {n: n} );

  let recur = function( n, board ) {

    for ( let r = board.attributes.n - n; r < board.attributes.n; r++ ) {
      for ( let c = 0; c < board.attributes.n; c++ ) {
        board.togglePiece( r, c );
        // recur( n - 1, board );
        if ( board.hasAnyRooksConflicts() ) {
          board.togglePiece( r, c );
        }
      }
      if ( !board.hasAnyRooksConflicts() && n === 1 ) {
        return board;
      }
      return recur( n - 1, board );
    }
  };

  debugger;
  let wrk = recur(board.attributes.n, board);
  for ( let i = 0; i < board.attributes.n; i++ ) {
    let row = board.attributes[i];
    solution.push(row);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  var board = new Board( {n: n} );
  /** build a tree
   * itterate accross row " this.attributes; "
   * this.togglePiece(rowIndex, colIndex);
   *  recur1     recur2    recur3    recur4         5
   * [1,0,0,0] [1,0,0,0] [1,0,0,0] [1,0,0,0]
   * [0,0,0,0] [1,0,0,0] [1,0,0,0] [1,0,0,0]   check the board
   * [0,0,0,0] [0,0,0,0] [1,0,0,0] [1,0,0,0]    after n rooks
   * [0,0,0,0] [0,0,0,0] [0,0,0,0] [0,1,0,0]
   *
   * for each single space
   * build the next section of tree
   *
   * once tree is finished
   * check tree for conflicts
   *
   * if ( conflicts )
   * go back
   * else
   * return solution
   *
   * solution === 1 successful branch
   *
   *
   * if ( success ) {
   *  solution = board;
   * }
   *
   */

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme
  if ( n === 1 ) {
    solutionCount = 1;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
