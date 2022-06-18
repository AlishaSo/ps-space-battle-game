const readlineSync = require("readline-sync");

function getInput(prompt) {
  return readlineSync.question(`${prompt}: `);
}

class Ship {
  constructor(hull, firepower, accuracy, type = 'alien') {
    this.type = type;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.shipDestroyed = false;
  }

  attack(attackee) {
    const hero = this.type == 'hero';
    if(this.accuracy > attackee.accuracy) {
      attackee.hull -= this.firepower;
      if(hero) {
        console.log(`You Hit the alien! 💪🏽`);
      }
      else
        console.log('The alien has hit You 😖');
      console.log(`You have ${hero ? 'done' : 'taken'} ${this.firepower} damage`);
      console.log(`${!hero ? 'You have' : 'The alien has'} ${attackee.hull <= 0 ? 0 : attackee.hull} hull left`);
    }
    else {
      if(hero)
        console.log('You have Missed the alien 🙃');
      else
        console.log('The alien has missed You! 🙌🏽');
    }
  }

  isShipDestroyed() {
    if(this.hull <= 0) {
      this.shipDestroyed = true;
      return true;
    }
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

const playGame = () => {
  const theUSSHelloWorld = new Ship(20, 5, .7, 'hero');
  const aliens = createEnemyShips();
  let index = 0;
  let validUserInput = false;
  let keepPlaying = true;

  console.log(theUSSHelloWorld, aliens[0])
  theUSSHelloWorld.attack(aliens[0]);
  console.log(aliens[0]);
  if(aliens[0].isShipDestroyed()) {
    console.log('The alien has been destoyed! 💯');

    while(!validUserInput) {
      let userChoice = getInput('Would you like to attack (a) the next enemy, or retreat (r)?');

      if(userChoice == 'a') {
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
  }
  else {
    console.log('The alien is attacking you! 😡');
    aliens[0].attack(theUSSHelloWorld);
  }

}

playGame();
