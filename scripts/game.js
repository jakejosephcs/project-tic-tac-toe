function init(player, OPPONENT){
    // We'll need to grab out canvas element in order to manipulate it
    const canvas = document.getElementById('cvs');

    // We also need to create the context of the canvas (2D in our case)
    const ctx = canvas.getContext('2d');

    // We'll have a 3x3 grid so we'll define our rows and columns
    const COLUMN = 3;
    const ROW = 3;

    // We also have to define our board which will be a 2D array of [rows[columns]]
    let board = [];

    /* Each cell in our grid we'll have a fixed width and height of 150px since we
       defined our canvas to 450px by 450px */
    const SPACE_SIZE = 150;

    /* As the player clicks on a cell, we'll need to store where they clicked so 
       we'll create a gameData array that has 9 slots, one for each cell */
    let gameData = new Array(9);

    // The first move will be given to the user and not the friend/computer
    let currentPlayer = player.man;

    // We'll need to keep track if the game is over or not in our isWinner() or isTie() functions
    let GAME_OVER = false;

    // When the user clicks their chosen cell, we want to display either X or O
    const xImage = new Image();
    xImage.src = "images/X.png";
    const oImage = new Image();
    oImage.src = "images/O.png";

    // We'll have to check if a user has won or not. We'll hold the winning combination in a 2D array
    const COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    // To display the game over message, we'll need to grab the .gameover class to manipulate it
    const gameOverElement = document.querySelector('.gameover');

    // When we first switch to the cavas, we'll want to draw the board
    function drawBoard(){
        // We'll also want to assign each cell an ID for future use
        let id = 0;
        // Iterating through our rows variable and each time creating a new array in our board variable
        for(let i = 0; i < ROW; i++){
            board[i] = [];
            /* Each time we iterate through a column inside a row, we'll assign it an ID as well as 
               draw the outline of the cell and then increment out id */
            for(let j = 0; j < COLUMN; j++){
                board[i][j] = id;
                ctx.strokeStyle = "#000";
                ctx.strokeRect(j*SPACE_SIZE, i*SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
                id++;
            };
        };
    };

    // Now we can draw our board
    drawBoard();  
    
    // When we click on the canvas we'll trigger an event to add either an X or O to it
    canvas.addEventListener('click', (e) => {
        // First we'll check if the GAME_OVER variable has changed from true to false, if it has we'll exit the function
        if(GAME_OVER){ return; };

        // When the user clicks the canvas, we'll need to get where they clicked
        let X = e.clientX - canvas.getBoundingClientRect().x;
        let Y = e.clientY - canvas.getBoundingClientRect().y;

        // We'll want to convert our X and Y values into i and j values to assign an ID
        let j = Math.floor(X / SPACE_SIZE);
        let i = Math.floor(Y / SPACE_SIZE);
        let id = board[i][j];

        // If the ID already exits in our gameData array, we'll exit the function otherwise, we'll assign it
        if (gameData[id]){
            return;
        } else  {
            gameData[id] = currentPlayer
        }

        /* Once the user has clicked a cell that has no already been assigned, we'll draw their choice (X or O)
           onto the board */
        drawOnBoard(currentPlayer, i, j);

        // Once the current player draws on the board we have to check if there is a winner
        if(isWinner(currentPlayer, gameData)){
            showGameOver(currentPlayer)
            GAME_OVER = true;
            return;
        };

        // If there is no winner, we'll check to see if there is a tie
        if(isTie(gameData)){
            showGameOver("tie");
            GAME_OVER = true;
            return;
        }

        // If it is none of the above, we'll switch the currentPlayer's turn
        if(currentPlayer == player.man) {
            currentPlayer = player.friend;
        }else {
            currentPlayer = player.man;
        }
        
    });

    // The draw on board takes the current player and the location they clicked and uses that to draw on the canvas
    function drawOnBoard(player, i, j){
        let img = player == "X" ? xImage : oImage;
        ctx.drawImage(img, j*SPACE_SIZE, i*SPACE_SIZE);
    }

    // We check if there is a winner by looping through our COMBOS array and checking if the gameData array matches a combo
    function isWinner(player, gameData){
        for(let i = 0; i < COMBOS.length; i++){
            let won = true;
            for (let j = 0; j < COMBOS[i].length; j++) {
                let id = COMBOS[i][j];
                won = gameData[id] == player && won;
            }
            if(won){
                return true;
            }
        }
        return false;
    }

    // We check for a tie by checking if the board is full
    function isTie(gameData) {
        let isBoardFull = true;
        for (let i = 0; i < gameData.length; i++) {
            isBoardFull = gameData[i] && isBoardFull;
        }
        if(isBoardFull){
            return true;
        }
        return false
    }

    // Once  the game is over, we display who the winner is or if there was a tie
    function showGameOver(player){
        let imgSrc = `images/${player}.png`;
        let message = player == "tie" ? "Opps No Winner!" : "The Winner is";

        gameOverElement.innerHTML = `
            <h1>${message}</h1>
            <img class='winner-img' src=${imgSrc} alt=''>
            <div class='play' onclick="location.reload();">PLAY AGAIN</div>
        `;
        gameOverElement.classList.remove('hide');
    }


};

