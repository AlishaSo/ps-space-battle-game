class Ship {
  constructor(hull, firepower, accuracy, type = 'alien') {
    this.type = type;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attack(attackee) {
    const hero = this.type == 'hero';
    if(this.accuracy > attackee.accuracy) {
      attackee.hull -= this.firepower;
      if(hero) {
        console.log(`You Hit an alien! 💪🏽`);
      }
      else
        console.log('The alien has hit You 😖');
      console.log(`You have ${hero ? 'done' : 'taken'} ${this.firepower} damage`);
      console.log(`${!hero ? 'You have' : 'The alien has'} ${attackee.hull <= 0 ? 0 : attackee.hull} left`);
    }
    else {
      if(hero)
        console.log('You have Missed the alien 🙃');
      else
        console.log('The alien has missed You! 🙌🏽');
    }
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

  // console.log(theUSSHelloWorld, aliens)
  // theUSSHelloWorld.attack(aliens[0]);
  // console.log(aliens[0]);
}

playGame();

// const hero = new Ship(20, 5, .7, 'hero');
// const alien = new Ship(Math.floor(Math.random() * (6 - 3 + 1) + 3), Math.floor(Math.random() * (4 - 2 + 1) + 2), Number((Math.random() * (.8-.6) + .6).toFixed(1)))

// console.log(hero, alien);
// hero.attack(alien);
// alien.attack(hero);