//declaring important global variables & asigning them to the DOM
let door1 = document.getElementById('door1');
let door2 = document.getElementById('door2');
let door3 = document.getElementById('door3');

let openDoor1;
let openDoor2;
let openDoor3;

let numClosedDoors = 3;

const startButton = document.getElementById('start');
let currentlyPlaying = true;

//adding image sources for each door & door path
const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

//checking if the user clicked on the chore bot
const isBot = door => {
    if (door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
}

//checks if the door has already been clicked on
const isClicked = door => {
    if (door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }
}

//decreases number of closed doors and checks if the user won or lost
const playDoor = door => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    }
}

//randomly choosing the door order
const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor2 = botDoorPath;
        openDoor1 = spaceDoorPath;
        openDoor3 = beachDoorPath;
    } else if (choreDoor === 2){
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
    }
}

//when the user clicks on a door it assigns it a new src containing one of the three images
door1.onclick = () => {
    if (currentlyPlaying && !isClicked(door1)) {
        door1.src = openDoor1;
        playDoor(door1);
    } 
}

door2.onclick = () => {
    if (currentlyPlaying && !isClicked(door2)) {
        door2.src = openDoor2;
        playDoor(door2);
    }
}

door3.onclick = () => {
    if (currentlyPlaying && !isClicked(door3)) {
        door3.src = openDoor3;
        playDoor(door3);
    } 
}

//starts beginning of the game
const startRound = () => {
    numClosedDoors = 3;
    door1.src = closedDoorPath;
    door2.src = closedDoorPath;
    door3.src = closedDoorPath;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

//allows user to restart the game after they finished a round
startButton.onclick = () => {
    if (currentlyPlaying === false) {
        startButton.classList.toggle("start-row-end");
        startRound();
    } 
}

//lets the user know whether or not they won or lost and ends the game
const gameOver = status => {

    if (status === 'win') {
        startButton.classList.toggle("start-row-end");
        startButton.innerHTML = 'You win! Play again?';
    } else {
        startButton.classList.toggle("start-row-end");
        startButton.innerHTML = 'Game over! Play again?';
    }
    currentlyPlaying = false;
}

startRound();

