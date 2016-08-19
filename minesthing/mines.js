//Global constants, change as needed for game generation
var MineFrequencyEasy = 6.5;
var MineFrequencyNormal = 5.8;
var MineFrequencyHard = 5.2;
var MineFrequencyBrutal = 4.8;
var MineFrequencyInsane = 4.5;
var MineFrequencyLudicrous = 3.5;

var EasyDimentions = [9, 9];
var NormalDimentions = [16, 12];
var HardDimentions = [30, 16];
var BrutalDimentions = [42, 24];
var InsaneDimentions = [64, 48];
var LudicrousDimentions = [128, 96];

var NumberColors = [
    "#FFFFFF",  //0
    "#208220",  //1
    "#E0E066",  //2
    "#A04000",  //3
    "#8080B0",  //4
    "#00A0C0",  //5
    "#F080A0",  //6
    "#FF0000",  //7
    "#000000",  //8
];

//Global internal constants
var GamestateMenu = 0;
var GamestateGame = 1;
var GamestatePaused = 2;
var GamestateCustomSelection = 3;

var SquareWidth = 24;
var SquareHeight = 24;

var AdjacentSquares = [[1, 0], [1, 1], [0, 1],
                        [-1, 0], [-1, -1], [0, -1],
                        [-1, 1], [1, -1]];

//Global variables for game state and whatnot
var DaBoard = null;
var ctx = document.getElementById("DaCanvas").getContext("2d");
var ctxWidth = 360;
var ctxHeight = 480;

var MainMenu = document.getElementById("MainMenu");
var GameBoard = document.getElementById("GameBoard");
var CustomMenu = document.getElementById("CustomMenu");
var BeginButton = document.getElementById("BeginButton");
var GameCanvas = document.getElementById("DaCanvas");

var DidSelectMines = false;
var DidSelectBoard = false;

var Gamestate = GamestateMenu;
var SelectedMines = MineFrequencyEasy;
var SelectedDimentions = EasyDimentions;
var CustomMineSelection = MineFrequencyEasy;
var CustomDimentionSelection = EasyDimentions;

//Image assets
var mineImg = document.getElementById("mine_png");
var flagImg = document.getElementById("flag_png");

/*

Format of board element:
{
    BOOL revealed,
    BOOL flagged,
    int count
}

*/

function MinesBoard() {
    this.Board = [];
    this.Dimentions = [0, 0];
    this.MinesLeft = 0;
    this.FreeSpacesLeft = 0;
    this.GameEnd = true;
    this.GameLoss = false;
    this.BoardGenerated = false;
    
    this.initBoard = function() {
        this.Dimentions = SelectedDimentions;
        this.MinesLeft = Math.floor((this.Dimentions[0] * this.Dimentions[1]) / SelectedMines);
        ctxWidth = this.Dimentions[0] * SquareWidth;
        ctxHeight = this.Dimentions[1] * SquareHeight;
        GameCanvas.width = ctxWidth;
        GameCanvas.height = ctxHeight;

        this.Board.length = this.Dimentions[0] * this.Dimentions[1];
        for(var i = 0; i < this.Board.length; i++) {
            this.Board[i] = { revealed: false, flagged: false, count: 0 };
        }
        this.GameEnd = false;
        this.GameLoss = false;
        this.BoardGenerated = false;
    };

    this.generateBoard = function(x, y) {
        var i, j, k, mineSkipped, minePos, v, h, tx, ty;

        this.BoardGenerated = true;
        this.FreeSpacesLeft = this.Dimentions[0] * this.Dimentions[1];
        for(i = 0; i < Math.floor(((this.Dimentions[0] * this.Dimentions[1]) / SelectedMines)); i++) {
            minePos = Math.floor(Math.random() * (this.FreeSpacesLeft - 9));    //Safe space is 3x3
            mineSkipped = 0;
            v = 0;
            h = 0;

            for(j = 0; j < this.Board.length; j++) {
                if((v < (x - 1)) || (v > (x + 1)) || (h < (y - 1)) || (h > (y + 1))) {  //Not in safe space
                    if(this.Board[j].count != -1) {     //Is not mine
                        if(mineSkipped == minePos) {
                            this.Board[j].count = -1;
                            this.FreeSpacesLeft--;

                            for(k = 0; k < AdjacentSquares.length; k++) {
                                tx = v + AdjacentSquares[k][0];
                                ty = h + AdjacentSquares[k][1];
                                if(((tx < this.Dimentions[0]) && (tx >= 0)) &&
                                    ((ty < this.Dimentions[1]) && (ty >= 0))) {
                                    if(this.Board[(ty * this.Dimentions[0]) + tx].count != -1) {
                                        this.Board[(ty * this.Dimentions[0]) + tx].count++;
                                    }
                                }
                            }
                            break;
                        }
                        else {
                            mineSkipped++;
                        }
                    }
                }

                v++;
                if(v >= this.Dimentions[0]) {
                    v = 0;
                    h++;
                }
            }
        }
    }

    this.revealSquare = function(x, y) {
        if(((x < this.Dimentions[0]) && (y < this.Dimentions[1])) && ((x >= 0) && (y >= 0))) {  
            if(!this.Board[(y * this.Dimentions[0]) + x].revealed && !this.Board[(y * this.Dimentions[0]) + x].flagged) {
                this.Board[(y * this.Dimentions[0]) + x].revealed = true;
                if(this.Board[(y * this.Dimentions[0]) + x].count == -1) {  //Boom
                    this.GameEnd = true;
                    this.GameLoss = true;
                }
                else if(this.Board[(y * this.Dimentions[0]) + x].count == 0) {  //Auto-reveal
                    for(var i = 0; i < AdjacentSquares.length; i++) {
                        this.revealSquare(x + AdjacentSquares[i][0], y + AdjacentSquares[i][1]);
                    }
                }

                if(!this.GameEnd) {
                    this.FreeSpacesLeft--;
                    if(this.FreeSpacesLeft == 0) {
                        this.GameEnd = true;
                    }
                }
            }
        }
    };

    this.validateAdjacent = function(x, y) {
        if(!(((x < this.Dimentions[0]) && (x >= 0)) && ((y < this.Dimentions[1]) && (y >= 0)))) {
            return false;
        }

        var count = this.Board[(y * this.Dimentions[0]) + x].count;
        var found = 0;
        var tx, ty;
        for(var i = 0; i < AdjacentSquares.length; i++) {
            tx = x + AdjacentSquares[i][0];
            ty = y + AdjacentSquares[i][1];
            if(((tx < this.Dimentions[0]) && (tx >= 0)) && ((ty < this.Dimentions[1]) && (ty >= 0))) {
                if(this.Board[(ty * this.Dimentions[0]) + tx].flagged) {
                    found++;
                }
            }
        }

        if(found >= count) {
            return true;
        }
        return false;
    };

    this.mouseEvent = function(x, y, isFlag, isDbclick) {
        var sx = Math.floor(x / SquareWidth);
        var sy = Math.floor(y / SquareHeight);

        //Is in bounds
        if((((sx < this.Dimentions[0]) && (sy < this.Dimentions[1])) && ((sx >= 0)) & (sy >= 0)) && !this.GameEnd) {
            if(isFlag && !this.Board[(sy * this.Dimentions[0]) + sx].revealed) {
                if(this.Board[(sy * this.Dimentions[0]) + sx].flagged) {
                    this.Board[(sy * this.Dimentions[0]) + sx].flagged = false;
                    this.MinesLeft++;
                }
                else {
                    this.Board[(sy * this.Dimentions[0]) + sx].flagged = true;
                    this.MinesLeft--;
                }
            }
            else {
                if(!this.BoardGenerated && !this.Board[(sy * this.Dimentions[0]) + sx].flagged) {
                    this.generateBoard(sx, sy);
                }
                if(!this.Board[(sy * this.Dimentions[0]) + sx].revealed) {
                    this.revealSquare(sx, sy);
                }
                else if(isDbclick) {
                    if(this.validateAdjacent(sx, sy)) {
                        for(var i = 0; i < AdjacentSquares.length; i++) {
                            this.revealSquare(sx + AdjacentSquares[i][0], sy + AdjacentSquares[i][1]);
                        }
                    }
                }
            }
        }
    };
    
    return this;
}

function DrawScene() {
    switch(Gamestate) {
        case GamestateMenu:
            DrawMenu();
            break;
        case GamestateGame:
            DrawGame();
            break;
        case GamestatePaused:
            DrawPaused();
            break;
        case GamestateCustomSelection:
            DrawCustomSelection();
            break;
    }
}

function DrawMenu() {

}

function DrawGame() {
    ctx.fillStyle = "#FCF8F0";
    ctx.fillRect(0, 0, ctxWidth, ctxHeight);

    if(DaBoard != null) {
        var i, j;
        for(i = 0; i < DaBoard.Dimentions[0]; i++) {
            for(j = 0; j < DaBoard.Dimentions[1]; j++) {
                if(DaBoard.Board[(j * DaBoard.Dimentions[0]) + i].revealed) {
                    if((DaBoard.Board[(j * DaBoard.Dimentions[0]) + i].count > 0) && 
                        (DaBoard.Board[(j * DaBoard.Dimentions[0]) + i].count <= 8)) {
                        ctx.strokeStyle = "#E2DFD8";
                        ctx.lineWidth = 2;
                        ctx.strokeRect((i * SquareWidth) + 2, (j * SquareHeight) + 2, SquareWidth - 4, SquareHeight - 4);

                        ctx.fillStyle = NumberColors[DaBoard.Board[(j * DaBoard.Dimentions[0]) + i].count];
                        ctx.font = "16px Arial";
                        ctx.fillText(DaBoard.Board[(j * DaBoard.Dimentions[0]) + i].count.toString(), 
                            (i * SquareWidth) + 8, (j * SquareHeight) + (SquareHeight * 0.5) + 6);
                    }
                    else if(DaBoard.Board[(j * DaBoard.Dimentions[0]) + i].count == -1) {   //Mine
                        ctx.drawImage(mineImg, i * SquareWidth, j * SquareHeight);
                    }
                }
                else {
                    ctx.fillStyle = "#D1CFCB";
                    ctx.strokeStyle = "#D8C8B6";
                    ctx.lineWidth = 1;
                    ctx.fillRect((i * SquareWidth) + 1, (j * SquareHeight) + 1, SquareWidth - 2, SquareHeight - 2);
                    ctx.strokeRect((i * SquareWidth) + 3, (j * SquareHeight) + 3, SquareWidth - 6, SquareHeight - 6);

                    if(DaBoard.Board[(j * DaBoard.Dimentions[0]) + i].flagged) {
                        ctx.drawImage(flagImg, i * SquareWidth, j * SquareHeight);
                    }
                }
            }
        }

        document.getElementById("MinesLeft").innerHTML = DaBoard.MinesLeft.toString();
        if(DaBoard.GameEnd) {
            if(DaBoard.GameLoss) {
                document.getElementById("gsText").innerHTML = "Game Over!";
            }
            else {
                document.getElementById("gsText").innerHTML = "You Win!";
            }
        }
        else {
            document.getElementById("gsText").innerHTML = "";
        }
    }
}

function DrawPaused() {

}

function DrawCustomSelection() {

}

function RightClickOnBoard(e) {
    e.preventDefault();
    if(DaBoard != null) {
        DaBoard.mouseEvent(e.offsetX, e.offsetY, true, false);
        DrawScene();
    }
}

function LeftClickOnBoard(e) {
    if(e.button == 0) { //Left mouse
        if(DaBoard != null) {
            DaBoard.mouseEvent(e.offsetX, e.offsetY, false, false);
            DrawScene();
        }
    }
}

function DbClickOnBoard(e) {
    if(e.button == 0) { //Left mouse
        if(DaBoard != null) {
            DaBoard.mouseEvent(e.offsetX, e.offsetY, false, true);
            DrawScene();
        }
    }
}

function SelectCustomMenu() {
    if(Gamestate == GamestateMenu) {
        MainMenu.hidden = true;
    }
    Gamestate = GamestateCustomSelection;
    CustomMenu.hidden = false;
}

function SelectMainMenu() {
    if(Gamestate == GamestateCustomSelection) {
        CustomMenu.hidden = true;
    }
    if(Gamestate == GamestateGame) {
        if(DaBoard != null) {
            DaBoard.GameEnd = true;
            DrawScene();
        }
        GameBoard.hidden = true;
    }
    Gamestate = GamestateMenu;
    MainMenu.hidden = false;
}

function StartPlay() {
    if(Gamestate == GamestateMenu) {
        MainMenu.hidden = true;
    }
    else if(Gamestate == GamestateCustomSelection) {
        CustomMenu.hidden = true;
        SelectedMines = CustomMineSelection;
        SelectedDimentions = CustomDimentionSelection;
    }
    Gamestate = GamestateGame;
    GameBoard.hidden = false;

    if(DaBoard != null) {
        DaBoard.initBoard();
        DrawScene();
    }
}

function SelectDifficultyPreset(difficulty) {
    switch(difficulty) {
        case "e":
            SelectedMines = MineFrequencyEasy;
            SelectedDimentions = EasyDimentions;
            StartPlay();
            break;
        case "n":
            SelectedMines = MineFrequencyNormal;
            SelectedDimentions = NormalDimentions;
            StartPlay();
            break;
        case "h":
            SelectedMines = MineFrequencyHard;
            SelectedDimentions = HardDimentions;
            StartPlay();
            break;
        case "b":
            SelectedMines = MineFrequencyBrutal;
            SelectedDimentions = BrutalDimentions;
            StartPlay();
            break;
        case "i":
            SelectedMines = MineFrequencyInsane;
            SelectedDimentions = InsaneDimentions;
            StartPlay();
            break;
    }
}

function SelectMineDifficulty(difficulty) {
    switch(difficulty) {
        case "e":
            DidSelectMines = true;
            CustomMineSelection = MineFrequencyEasy;
            break;
        case "n":
            DidSelectMines = true;
            CustomMineSelection = MineFrequencyNormal;
            break;
        case "h":
            DidSelectMines = true;
            CustomMineSelection = MineFrequencyHard;
            break;
        case "b":
            DidSelectMines = true;
            CustomMineSelection = MineFrequencyBrutal;
            break;
        case "i":
            DidSelectMines = true;
            CustomMineSelection = MineFrequencyInsane;
            break;
        case "l":
            DidSelectMines = true;
            CustomMineSelection = MineFrequencyLudicrous;
            break;
    }
    if(DidSelectBoard && DidSelectMines) {
        BeginButton.disabled = false;
    }
}

function SelectBoardDifficulty(difficulty) {
    switch(difficulty) {
        case "e":
            DidSelectBoard = true;
            CustomDimentionSelection = EasyDimentions;
            break;
        case "n":
            DidSelectBoard = true;
            CustomDimentionSelection = NormalDimentions;
            break;
        case "h":
            DidSelectBoard = true;
            CustomDimentionSelection = HardDimentions;
            break;
        case "b":
            DidSelectBoard = true;
            CustomDimentionSelection = BrutalDimentions;
            break;
        case "i":
            DidSelectBoard = true;
            CustomDimentionSelection = InsaneDimentions;
            break;
        case "l":
            DidSelectBoard = true;
            CustomDimentionSelection = LudicrousDimentions;
            break;
    }
    if(DidSelectMines && DidSelectBoard) {
        BeginButton.disabled = false;
    }
}

function init() {
    DaBoard = new MinesBoard();
}

init();