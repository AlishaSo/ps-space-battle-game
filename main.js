// const readlineSync = require("readline-sync");

// function getInput(prompt) {
//   return readlineSync.question(`${prompt}: `);
// }

class Ship {
  constructor(hull, firepower, accuracy, type = 'alien') {
    this.type = type;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attack(attackee) {
    const hero = this.type == 'hero';
    if(Math.random() < this.accuracy) {
      attackee.hull -= this.firepower;
      if(hero) {
        console.log(`%cYou Hit the alien! 💪🏽`, 'font-size: 1rem; color: red');
      }
      else
        console.log('%cThe alien has hit You 😖', 'font-size: 1rem; color: red');

      console.log(`%cYou have ${hero ? 'done' : 'taken'} ${this.firepower} damage`, 'font-size: 1rem; font-style: italic; background: azure; border: 1px solid grey');
      console.log(`%c${!hero ? 'You have' : 'The alien has'} ${attackee.hull <= 0 ? 0 : attackee.hull} hull left`, 'font-size: 1rem; font-style: italic');
    }
    else {
      if(hero)
        console.log('%cYou have Missed the alien 🙃', 'font-size: 1rem; color: yellow; text-shadow: black 1px 1px');
      else
        console.log('%cThe alien has missed You! 🙌🏽', 'font-size: 1rem; color: yellow; text-shadow: black 1px 1px');
      console.log('');
    }
  }

  isShipDestroyed() {
    if(this.hull <= 0)
      return true;
    console.log('');
    return false;
  }
}

const createEnemyShips = () => {
  let enemyShips = [];
  for(let i = 0; i < 6; i++) {
    let hull = Math.floor(Math.random() * (6 - 3 + 1) + 3);
    let firepower = Math.floor(Math.random() * (4 - 2 + 1) + 2);
    let accuracy = Number((Math.random() * (.8-.6) + .6).toFixed(1));

    enemyShips.push(new Ship(hull, firepower, accuracy));
  }
  return enemyShips;
}

const playAgain = () => {
  const userChoice = window.prompt('\nDo you want to play again? (y/n)');

  if(userChoice == null) {
    return;
  }
  if(userChoice.toLowerCase() == 'y')
    playGame()
  else if(userChoice.toLowerCase() == 'n')
    console.log('%cThat was a great game! 👊🏽', 'font-size: 1rem; color: #C0C0C0');
  else {
    console.log('Please enter a valid choice');
    playAgain();
  }
}

const playGame = () => {
  const theUSSHelloWorld = new Ship(20, 5, .7, 'hero');
  const aliens = createEnemyShips();
  let index = 0;
  let validUserInput = false;
  let keepPlaying = true;
  
  while(keepPlaying) {
    console.log('%cYou are attacking an alien! 🥊', 'font-size: 1rem; color: green');
    theUSSHelloWorld.attack(aliens[index]);
    if(aliens[index].isShipDestroyed()) {
      console.log('%cThe alien has been destroyed! 💯', 'font-size: 1rem; color: #2E1A62');

      if(index >= 5) {
        keepPlaying = false;
      }
      else {
        while(!validUserInput) {
          console.log('');
          let userChoice = window.prompt('Would you like to attack (a) the next enemy, or retreat (r)?');

          if(userChoice == null) {
            return;
          }
          else if(userChoice == 'a') {
            keepPlaying = true;
            index++;
            validUserInput = true;
          }
          else if(userChoice == 'r') {
            keepPlaying = false;
            validUserInput = true;
          }
          else {
            console.log("Please enter a valid choice");
            validUserInput = false;
          }
        }
        validUserInput = false;
      }
    }
    else {
      console.log('%cThe alien is attacking you! 😡', 'font-size: 1rem; color: blue');
      aliens[index].attack(theUSSHelloWorld);
      if(theUSSHelloWorld.isShipDestroyed()) {
        console.log('%cYou have been destroyed 🥲', 'font-size: 1rem; font-style: bold; color: red');
        keepPlaying = false;
      }
    }
  }
  console.log("%cThat's the end of the game! Til next time 👋🏽", 'font-size: 1rem; color: #D4AF37');
  playAgain();
}

playGame();
