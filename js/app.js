
'use strict'
const WIN = '😛'
const LOST = '😔'
const MINE = '💣'
const CELLMARKED = '🚩'
const EMPTY = ''

var gGame
var gLevel
var gBoard
const boardEl = document.querySelector(".board-container")

function initGame() {
    gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
    gLevel = { SIZE: 4, MINES: 2 }
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard, '.board-container')
    // gBoard=buildBoard()
    //     renderBoard(gBoard)
    // gGame.isOn = true
    document.querySelector('.restartBtn').style.display = 'none'


}

function buildBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
        }
    }
    //// check the function
    // board[2][2].isMine = true
    // board[i][j].isMine = true
    //// check the function
    board = setMinesOnBoard(board)
    board = setMinesNegsCount(board)
    // //on the conole!
    checkIfItsWork(board)
    return board
}

function setMinesOnBoard(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var pos = randomLocationBombs(board)
        board[pos.i][pos.j].isMine = true
    }
    return board
}

function randomLocationBombs(board) {
    var EmptyLocation = getEmptycell(board)
    if (!EmptyLocation.length) return
    var randomLocationOnTheBoard = getRandomInt(0, EmptyLocation.length - 1)
    var randPos = EmptyLocation[randomLocationOnTheBoard]
    return randPos
}
function getEmptycell(board) {
    var emptycell = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine) {
                emptycell.push({ i: i, j: j })
            }
        }
    }
    return emptycell
}

function setMinesNegsCount(board) {
    var countMines = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            countMines = countMineNegs(i, j, board)
            board[i][j].minesAroundCount = countMines
        }
    }
    return board
}

function countMineNegs(cellI, cellJ, board) {
    var minesAroundCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) minesAroundCount++
        }
    }
    return minesAroundCount
}
// function clickedCell(i, j) {
function clickedCell(elCell, i, j) {
    
    if ( gBoard[i][j].isMine ) gameOver(elCell)
    else if ( gBoard[i][j].isMarked ) return false
    else if ( gBoard[i][j].isShown ) return false
    else {

        // gBoard[i][j].isMine=true
        var numEqualMinesAround = gBoard[i][j].minesAroundCount
        // gBoard[i][j].isShown=false
        console.log(gBoard[i][j])
        gBoard[i][j].isShown = true    
        elCell.innerHTML = numEqualMinesAround
        checkWin()

    }
}

function cellMarked(elCell,i, j) {
    if ( gBoard[i][j].isShown ) return false;

    if ( gBoard[i][j].isMarked ) {
        gBoard[i][j].isMarked = false
        // TODO - change innerHTML to default

    } 
    // elCell.stopPropagation()
    else { 
        gBoard[i][j].isMarked = true
        elCell.innerHTML = CELLMARKED
    }

           

}
function checkWin(){
    // console.log("checkWin()");
    // document.querySelector('.restartBtn').style.display = 'block'

var counter=0
for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
        if(gBoard[i][j].isShown)
        {
            counter+=1
        }

    }
    
}
if(counter+gLevel.MINES===gLevel.SIZE**2)
{
    boardEl.addEventListener("click", stopProp, {capture: true})
    boardEl.addEventListener("contectmenu", stopProp, {capture: true})
    var lost=document.querySelector('h4')
    var strHTML=`you won`
    lost.innerHTML=strHTML
}
}

// function checkGameOver(ellost) {
//     console.log("game over");

// }
function gameOver(elCell)
{
    document.querySelector('.restartBtn').style.display = 'block'
    boardEl.addEventListener("click", stopProp, {capture: true})
    boardEl.addEventListener("contectmenu", stopProp, {capture: true})
    var lost=document.querySelector('h4')
    var strHTML=`YOU LOST`
    lost.innerHTML=strHTML
    gGame.isOn = false;

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
           if(gBoard[i][j].isMine)
           {
            elCell.innerHTML=MINE
            
           }
            
        }
        
    }
  

}

function stopProp(e) {
    e.stopImmediatePropagation()
}
function expandShown(board, elCell, i, j) {


}


function checkIfItsWork(board) {
    var checkMine = []
    for (var i = 0; i < board.length; i++) {
        checkMine[i] = []
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j]
            var isMine = currCell.isMine ? true : false
            checkMine[i][j] = isMine ? MINE : currCell.minesAroundCount
        }
    }
    console.table(checkMine)
}
// function getClassName(location) {
//     var cellClass = 'cell-' + location.i + '-' + location.j
//     return cellClass
// }

