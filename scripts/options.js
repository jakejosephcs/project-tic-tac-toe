// Grabbing all of our classes and assigning them to variables
const options = document.querySelector('.options');
const computerBtn = document.querySelector('.computer');
const friendBtn = document.querySelector('.friend');
const xBtn = document.querySelector('.x');
const oBtn = document.querySelector('.o');
const playBtn = document.querySelector('.play');

// Since we'll have a player and an opponent, we'll create an object and variable
const player = new Object;
let OPPONENT;

// When the user clicks the COMPUTER button
computerBtn.addEventListener('click', () => {
    // Since the opponent is playing with a computer, opponent get assigned computer
    OPPONENT = 'computer';
    switchActive(friendBtn, computerBtn);
});

// When the user clicks the FRIEND button
friendBtn.addEventListener('click', () => {
    // Since the opponent is playing with a friend, opponent get assigned friend
    OPPONENT = 'friend';
    switchActive(computerBtn, friendBtn);
});

// When the user clicks the O button
oBtn.addEventListener('click', () => {
    // The choice of the player becomes O and the opponent (player or friend) is X
    player.man = "O";
    player.computer = "X";
    player.friend = "X";
    switchActive(xBtn, oBtn);
});

// When the user clicks the X button
xBtn.addEventListener('click', () => {
    // The choice of the player becomes X and the opponent (player or friend) is O
    player.man = "X";
    player.computer = "O";
    player.friend = "O";
    switchActive(oBtn, xBtn);
});

// When the user clicks the PLAY button
playBtn.addEventListener('click', () => {
    /* We need to check if the user selected either COMPUTER or OPPONENT
       This can be done by checking is OPPONENT has been assigned */
    if(!OPPONENT) {
        computerBtn.style.backgroundColor = "red";
        friendBtn.style.backgroundColor = "red";
        return;
    }
    /* We need to check if the user selected either X or O
       This can be done by checking is player.man has been assigned */
    if(!player.man) {
        oBtn.style.backgroundColor = "red";
        xBtn.style.backgroundColor = "red";
        return;
    }

    // If all selections are valid, we'll start the game (game.js)
    init(player, OPPONENT);
    
    // Once the game is started we'd like to hide the options page
    options.classList.add('hide');
});

// We need to switch each button from active to nonactive once we pick/switch an option
function switchActive(off, on){
    off.classList.remove('active');
    on.classList.add('active');
    off.style.backgroundColor = "white";
};