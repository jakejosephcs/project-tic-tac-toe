const options = document.querySelector('.options');
const computerBtn = document.querySelector('.computer');
const friendBtn = document.querySelector('.friend');
const xBtn = document.querySelector('.x');
const oBtn = document.querySelector('.o');
const playBtn = document.querySelector('.play');

const player = new Object;
let OPPONENT;

function switchActive(off, on){
    off.classList.remove('active');
    on.classList.add('active');
}


computerBtn.addEventListener('click', () => {
    OPPONENT = 'computer';
    switchActive(friendBtn, computerBtn);
});
// ===========
friendBtn.addEventListener('click', () => {
    OPPONENT = 'friend';
    switchActive(computerBtn, friendBtn);
});
// ===========
oBtn.addEventListener('click', () => {
    player.man = "O";
    player.computer = "X";
    player.friend = "X";
    switchActive(xBtn, oBtn);
});
// ===========
xBtn.addEventListener('click', () => {
    player.man = "X";
    player.computer = "O";
    player.friend = "O";
    switchActive(oBtn, xBtn);
});
// ===========
playBtn.addEventListener('click', () => {
    if(!OPPONENT) {
        computerBtn.style.backgroundColor = "red";
        friendBtn.style.backgroundColor = "red";
        return;
    }

    if(!player.man) {
        oBtn.style.backgroundColor = "red";
        xBtn.style.backgroundColor = "red";
        return;
    }

    init(player, OPPONENT);
    
    options.classList.add('hide');
});