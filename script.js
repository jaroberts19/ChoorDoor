//declaring important global variables & asigning them to the DOM
let door1 = document.getElementById('door1');
let door2 = document.getElementById('door2');
let door3 = document.getElementById('door3');
let door4 = document.getElementById('door4');
let door5 = document.getElementById('door5');

let openDoor1;
let openDoor2;
let openDoor3;
let openDoor4;
let openDoor5;

let numClosedDoors = 5;

const startButton = document.getElementById('start');
let currentlyPlaying = true;

//adding image sources for each door & door path
const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

//an array of the open doors
const openDoors = [botDoorPath, beachDoorPath, spaceDoorPath, beachDoorPath, spaceDoorPath];

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

//shuffles the images then assigns a new src to each
const randomChoreDoorGenerator = (arr) => {
    let i = arr.length, j, temp;
    while(--i > 0) {
      j = Math.floor(Math.random() * (i+1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp; 
    }
    openDoor1 = arr[0];
    openDoor2 = arr[1];
    openDoor3 = arr[2];
    openDoor4 = arr[3];
    openDoor5 = arr[4];
  }

//when the user clicks on a door it assigns it a new src containing one of the images
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

door4.onclick = () => {
    if (currentlyPlaying && !isClicked(door4)) {
        door4.src = openDoor4;
        playDoor(door4);
    } 
}

door5.onclick = () => {
    if (currentlyPlaying && !isClicked(door5)) {
        door5.src = openDoor5;
        playDoor(door5);
    } 
}

//starts beginning of the game
const startRound = () => {
    numClosedDoors = 5;
    door1.src = closedDoorPath;
    door2.src = closedDoorPath;
    door3.src = closedDoorPath;
    door4.src = closedDoorPath;
    door5.src = closedDoorPath;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator(openDoors);
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

shuffle(openDoors);
console.log(openDoors)