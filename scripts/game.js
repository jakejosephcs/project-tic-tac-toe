function init(player, OPPONENT){
    const canvas = document.getElementById('cvs');
    const ctx = canvas.getContext('2d');
    const COLUMN = 3;
    const ROW = 3;

    let board = [];

    const SPACE_SIZE = 150;

    function drawBoard(){
        let id = 0;
        for(let i = 0; i < ROW; i++){
            board[i] = [];
            for(let j = 0; j < COLUMN; j++){
                board[i][j] = id;
                ctx.strokeStyle = "#000";
                ctx.strokeRect(j*SPACE_SIZE, i*SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
                id++;
            };
        };
    };
    drawBoard();  
    
    let gameData = new Array(9);
    let currentPlayer = player.man;
    let GAME_OVER = false;
    canvas.addEventListener('click', (e) => {
        if(GAME_OVER){
            return;
        }

        let X = e.clientX - canvas.getBoundingClientRect().x;
        let Y = e.clientY - canvas.getBoundingClientRect().y;

        let j = Math.floor(X / SPACE_SIZE);
        let i = Math.floor(Y / SPACE_SIZE);

        let id = board[i][j];

        if (gameData[id]){
            return;
        };

        gameData[id] = currentPlayer

        drawOnBoard(currentPlayer, i, j);

        if(isWinner(currentPlayer, gameData)){
            showGameOver(currentPlayer)
            GAME_OVER = true;
            return;
        };

        if(isTie(gameData)){
            showGameOver("tie");
            GAME_OVER = true;
            return;
        }

        if(currentPlayer == player.man) {
            currentPlayer = player.friend;
        }else {
            currentPlayer = player.man;
        }
        
    });

    const xImage = new Image();
    xImage.src = "images/X.png";
    const oImage = new Image();
    oImage.src = "images/O.png";

    function drawOnBoard(player, i, j){
        let img = player == "X" ? xImage : oImage;
        ctx.drawImage(img, j*SPACE_SIZE, i*SPACE_SIZE);
    }

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

    const gameOverElement = document.querySelector('.gameover');

    function showGameOver(player){
        let imgSrc = `images/${player}.png`
        let message = player == "tie" ? "Opps No Winner!" : "The Winner is"

        gameOverElement.innerHTML = `
            <h1>${message}</h1>
            <img class='winner-img' src=${imgSrc} alt=''>
            <div class='play' onclick="location.reload();">PLAY AGAIN</div>
        `;
        gameOverElement.classList.remove('hide');
    }


};

