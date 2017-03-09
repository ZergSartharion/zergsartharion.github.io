//Global constants, change as needed for game generation
var MineFrequencyEasy = 6.0;
var MineFrequencyNormal = 5.6;
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

var MineSpeeds = [3000, 1500, 750, 250];
var MineLoopsRequired = [2, 4, 8, 12, 8, 8];

//Audio
var MineAudioTracks = [document.getElementById("mineAudio")];

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

//Banned Cases (because guessing is neither fun nor interactive)
//  (For Validation: 0 = Blank, 1 = Mine, 2 = Ignored)
//  (For Replacement: Value is index of old array to be copied into new array)
//  (For Anchor: 0 = None, 1 = Left, 2 = Right, 3 = Top, 4 = Bottom,
//      5 = Top Left, 6 = Top Right, 7 = Bottom Left, 8 = Bottom Right)

var centerBannedCase0 = {
    Validation: [[1, 2, 2, 1],
                [2, 1, 0, 2],
                [2, 0, 1, 2],
                [1, 2, 2, 1]],
    Replacement:    [[0, 1, 2, 3],
                    [4, 6, 5, 7],
                    [8, 9, 10, 11],
                    [12, 13, 14, 15]],
    Anchor: 0,
    Width: 4,
    Height: 4
};

var centerBannedCase1 = {
    Validation: [[1, 2, 2, 1],
                [2, 0, 1, 2],
                [2, 1, 0, 2],
                [1, 2, 2, 1]],
    Replacement:    [[0, 1, 2, 3],
                    [4, 6, 5, 7],
                    [8, 9, 10, 11],
                    [12, 13, 14, 15]],
    Anchor: 0,
    Width: 4,
    Height: 4
};

var topBannedCase0 = {
    Validation: [[2, 0, 1, 2],
                [2, 1, 0, 2],
                [1, 2, 2, 1]],
    Replacement:    [[0, 1, 2, 3],
                    [4, 6, 5, 7],
                    [8, 9, 10, 11]],
    Anchor: 3,
    Width: 4,
    Height: 3
};

var topBannedCase1 = {
    Validation: [[2, 1, 0, 2],
                [2, 0, 1, 2],
                [1, 2, 2, 1]],
    Replacement:    [[0, 1, 2, 3],
                    [4, 6, 5, 7],
                    [8, 9, 10, 11]],
    Anchor: 3,
    Width: 4,
    Height: 3
};

var bottomBannedCase0 = {
    Validation: [[1, 2, 2, 1],
                [2, 1, 0, 2],
                [2, 0, 1, 2]],
    Replacement:    [[0, 1, 2, 3],
                    [4, 6, 5, 7],
                    [8, 9, 10, 11]],
    Anchor: 4,
    Width: 4,
    Height: 3
};

var bottomBannedCase1 = {
    Validation: [[1, 2, 2, 1],
                [2, 0, 1, 2],
                [2, 1, 0, 2]],
    Replacement:    [[0, 1, 2, 3],
                    [4, 6, 5, 7],
                    [8, 9, 10, 11]],
    Anchor: 4,
    Width: 4,
    Height: 3
};

var leftBannedCase0 = {
    Validation: [[2, 2, 1],
                [0, 1, 2],
                [1, 0, 2],
                [2, 2, 1]],
    Replacement:    [[0, 1, 2],
                    [4, 3, 5],
                    [6, 7, 8],
                    [9, 10, 11]],
    Anchor: 1,
    Width: 3,
    Height: 4
};

var leftBannedCase1 = {
    Validation: [[2, 2, 1],
                [1, 0, 2],
                [0, 1, 2],
                [2, 2, 1]],
    Replacement:    [[0, 1, 2],
                    [4, 3, 5],
                    [6, 7, 8],
                    [9, 10, 11]],
    Anchor: 1,
    Width: 3,
    Height: 4
};

var rightBannedCase0 = {
    Validation: [[1, 2, 2],
                [2, 1, 0],
                [2, 0, 1],
                [1, 2, 2]],
    Replacement:    [[0, 1, 2],
                    [3, 5, 4],
                    [6, 7, 8],
                    [9, 10, 11]],
    Anchor: 2,
    Width: 3,
    Height: 4
};

var rightBannedCase1 = {
    Validation: [[1, 2, 2],
                [2, 0, 1],
                [2, 1, 0],
                [1, 2, 2]],
    Replacement:    [[0, 1, 2],
                    [3, 5, 4],
                    [6, 7, 8],
                    [9, 10, 11]],
    Anchor: 2,
    Width: 3,
    Height: 4
};


/*

Format of board element:
{
    BOOL revealed,
    BOOL flagged,
    BOOL exploded,
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
    
    //Game Time support
    this.gameTime = 0;
    this.gameTimer = null;

    this.initBoard = function() {
        this.Dimentions = SelectedDimentions;
        this.MinesLeft = Math.floor((this.Dimentions[0] * this.Dimentions[1]) / SelectedMines);
        ctxWidth = this.Dimentions[0] * SquareWidth;
        ctxHeight = this.Dimentions[1] * SquareHeight;
        GameCanvas.width = ctxWidth;
        GameCanvas.height = ctxHeight;

        this.Board.length = this.Dimentions[0] * this.Dimentions[1];
        for(var i = 0; i < this.Board.length; i++) {
            this.Board[i] = { revealed: false, flagged: false, exploded: false, count: 0 };
        }
        this.GameEnd = false;
        this.GameLoss = false;
        this.BoardGenerated = false;

        this.initTimer();
    };

    this.generateBoard = function(x, y) {
        var i, j, k, mineSkipped, minePos, v, h, tx, ty;

        this.BoardGenerated = true;
        this.FreeSpacesLeft = this.Dimentions[0] * this.Dimentions[1];
        for(i = 0; i < Math.floor(((this.Dimentions[0] * this.Dimentions[1]) / SelectedMines)) ; i++) {
            minePos = Math.floor(Math.random() * (this.FreeSpacesLeft - 9));    //Safe space is 3x3
            this.placeMineAtIndex(minePos, x, y);
        }
    };

    this.initTimer = function() {
        if(this.gameTimer != null) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }

        document.getElementById("GameTime").innerHTML = "0";
        this.gameTime = 0;
    };

    this.incrementAdjacentCount = function(x, y) {
        var v, h;
        for(var i = 0; i < AdjacentSquares.length; i++) {
            v = x + AdjacentSquares[i][0];
            h = y + AdjacentSquares[i][1];
            if(this.pointIsInBoard(v, h)) {
                if(this.Board[(h * this.Dimentions[0]) + v].count != -1) {
                    this.Board[(h * this.Dimentions[0]) + v].count++;
                }
            }
        }
    };

    this.countFromAdjacent = function(x, y) {
        if(this.Board[(y * this.Dimentions[0]) + x].count == -1) {
            return;
        }
        var v, h;
        this.Board[(y * this.Dimentions[0]) + x].count = 0;

        for(var i = 0; i < AdjacentSquares.length; i++) {
            v = x + AdjacentSquares[i][0];
            h = y + AdjacentSquares[i][1];
            if(this.pointIsInBoard(v, h)) {
                if(this.Board[(h * this.Dimentions[0]) + v].count == -1) {
                    this.Board[(y * this.Dimentions[0]) + x].count++;
                }
            }
        }
    }

    this.placeMineAtIndex = function(index, sx, sy) {   //safe point
        var mineSkipped = 0;
        var v = 0;
        var h = 0;

        for(var i = 0; i < this.Board.length; i++) {
            if((v < (sx - 1)) || (v > (sx + 1)) || (h < (sy - 1)) || (h > (sy + 1))) {  //Not in safe space
                if(this.Board[i].count != -1) {     //Is not a mine
                    if(mineSkipped == index) {
                        this.Board[i].count = -1;
                        this.FreeSpacesLeft--;

                        this.incrementAdjacentCount(v, h);
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
    };

    this.revealAllMines = function() {
        for(var i = 0; i < this.Board.length; i++) {
            if(this.Board[i].count == -1) {
                this.Board[i].revealed = true;
            }
        }
    };

    this.validateAnchor = function(val, x, y) {
        if(val.Anchor == 0) {
            return true;
        }

        if(((val.Anchor == 3) || (val.Anchor == 5) || (val.Anchor == 6)) &&
                (y != 0)) {   //Top
            return false;
        }
        if(((val.Anchor == 4) || (val.Anchor == 7) || (val.Anchor == 8)) &&
                ((y + val.Height + 1) != this.Dimentions[1])) {   //Bottom
            return false;
        }
        if(((val.Anchor == 1) || (val.Anchor == 5) || (val.Anchor == 7)) &&
                (x != 0)) {   //Left
            return false;
        }
        if(((val.Anchor == 2) || (val.Anchor == 6) || (val.Anchor == 8)) &&
                ((x + val.Width + 1) != this.Dimentions[0])) {   //Right
            return false;
        }
        
        return true;
    }

    this.validateCase = function(val, x, y) {
        if(!this.pointIsInBoard(x + val.Width - 1, y + val.Height - 1)) {
            return false;
        }
        if((val.Anchor != 0) && (!this.validateAnchor(val, x, y))) {
            return false;
        }

        var i, j;

        for(i = 0; i < val.Width; i++) {
            for(j = 0; j < val.Height; j++) {
                if((val.Validation[j][i] == 0) && (this.Board[((j + y) * 
                        this.Dimentions[0]) + x + i].count == -1)) {    //Check is not mine
                    return false;
                }
                if((val.Validation[j][i] == 1) && (this.Board[((j + y) *
                        this.Dimentions[0]) + x + i].count != -1)) {    //Check is mine
                    return false;
                }
            }
        }

        return true;
    };

    this.createReplacementMatrix = function(val, x, y) {
        var ret = [];
        var i, j, tempx, tempy;
        ret.length = val.Height;

        for(j = 0; j < val.Height; j++) {
            ret[j] = [];
            ret[j].length = val.Width;

            for(i = 0; i < val.Width; i++) {
                tempy = val.Replacement[j][i] % val.Width;
                tempx = (val.Replacement[j][i] - tempy) / val.Width;
                ret[j][i] = this.Board[((tempy + y) * this.Dimentions[0]) + 
                    tempx + x].count;
            }
        }

        return ret;
    };

    this.recheckAroundCase = function(val, x, y) {
        var i, j;

        for(i = x - 1; i < (x + val.Width + 1); i++) {
            for(j = y - 1; j < (y + val.Height + 1) ; j++) {
                if(this.pointIsInBoard(i, j)) {
                    this.countFromAdjacent(i, j);
                }
            }
        }
    }

    this.emplaceMatrix = function(matrix, x, y) {
        var i, j;
        for(j = 0; j < matrix.length; j++) {
            for(i = 0; i < matrix[j].length; i++) {
                this.Board[((j + y) * this.Dimentions[0]) + i + x].count = matrix[j][i];
            }
        }
    };

    this.banCase = function(val) {
        var x = 0;
        var y = 0;

        for(var i = 0; i < this.Board.length; i++) {
            if(this.pointIsInBoard(x, y) && this.validateCase(val, x, y)) {
                this.emplaceMatrix(this.createReplacementMatrix(val, x, y), x, y);
                this.recheckAroundCase(val, x, y);
            }

            x++;
            if(x >= this.Dimentions[0]) {
                x = 0;
                y++;
            }
        }
    };

    this.banStandardCases = function() {
        this.banCase(centerBannedCase0);
        this.banCase(centerBannedCase1);
        this.banCase(topBannedCase0);
        this.banCase(topBannedCase1);
        this.banCase(bottomBannedCase0);
        this.banCase(bottomBannedCase1);
        this.banCase(leftBannedCase0);
        this.banCase(leftBannedCase1);
        this.banCase(rightBannedCase0);
        this.banCase(rightBannedCase1);
    };

    this.revealSquare = function(x, y) {
        if(this.pointIsInBoard(x, y)) {  
            if(!this.Board[(y * this.Dimentions[0]) + x].revealed && !this.Board[(y * this.Dimentions[0]) + x].flagged) {
                this.Board[(y * this.Dimentions[0]) + x].revealed = true;
                if(this.Board[(y * this.Dimentions[0]) + x].count == -1) {  //Boom
                    this.GameEnd = true;
                    this.GameLoss = true;

                    this.Board[(y * this.Dimentions[0]) + x].exploded = true;
                    this.revealAllMines();

                    mineSound();
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

                if(this.GameEnd) {
                    clearInterval(this.gameTimer);
                    this.gameTimer = null;
                }
            }
        }
    };

    this.validateAdjacent = function(x, y) {
        if(!this.pointIsInBoard(x, y)) {
            return false;
        }

        var count = this.Board[(y * this.Dimentions[0]) + x].count;
        var found = 0;
        var tx, ty;
        for(var i = 0; i < AdjacentSquares.length; i++) {
            tx = x + AdjacentSquares[i][0];
            ty = y + AdjacentSquares[i][1];
            if(this.pointIsInBoard(tx, ty)) {
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

    this.pointIsInBoard = function(x, y) {
        if(!(((x < this.Dimentions[0]) && (x >= 0)) &&
            ((y < this.Dimentions[1]) && (y >= 0)))) {
            return false;
        }
        return true;
    }

    this.mouseEvent = function(x, y, isFlag, isDbclick) {
        var sx = Math.floor(x / SquareWidth);
        var sy = Math.floor(y / SquareHeight);

        //Is in bounds
        if(this.pointIsInBoard(sx, sy) && !this.GameEnd) {
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
                    this.banStandardCases();

                    //Init timer as well
                    this.gameTime = 0;
                    this.gameTimer = setInterval(timerTick, 1000);
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
                        if(DaBoard.Board[(j * DaBoard.Dimentions[0]) + i].exploded) {
                            ctx.fillStyle = "#FFBFBB";
                            ctx.fillRect((i * SquareWidth) + 1, (j * SquareHeight) + 1, SquareWidth - 2, SquareHeight - 2);
                        }

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

function timerTick(e) {
    if(DaBoard != null) {
        DaBoard.gameTime++;
        document.getElementById("GameTime").innerHTML = DaBoard.gameTime.toString();
    }
}

function mineSound() {
    MineAudioTracks[0].play();
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

            if(DaBoard.gameTimer != null) {
                clearInterval(DaBoard.gameTimer);
                DaBoard.gameTimer = null;
            }
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

function CloseBoardImage() {
    document.getElementById("ExportBoard").hidden = true;
}

function ExportBoardImg() {
    var tempctx = ctx;
    var tempcanv = document.createElement("canvas");
    tempcanv.width = ctxWidth;
    tempcanv.height = ctxHeight;
    ctx = tempcanv.getContext("2d");

    DrawGame();

    ctx = tempctx;
    document.getElementById("ExportBoardImage").innerHTML = "";
    document.getElementById("ExportBoardImage").appendChild(tempcanv);

    document.getElementById("ExportBoard").hidden = false;
    document.getElementById("ExportBoard").style.width = ctxWidth.toString() + "px";
    document.getElementById("ExportBoardImage").style.height = ctxHeight.toString() + "px";
}

function init() {
    DaBoard = new MinesBoard();
}

init();