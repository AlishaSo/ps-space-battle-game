class Ship {
  constructor(hull, firepower, accuracy, name = 'alien') {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attack(attackee) {
    const hero = this.name == 'hero';
    if(this.accuracy > attackee.accuracy) {
      attackee.hull -= this.firepower;
      if(hero) {
        console.log(`You Hit an alien! 💪🏽`);
      }
      else
        console.log('The alien has hit You 😖');
      console.log(`You have ${hero ? 'done' : 'taken'} ${this.firepower} damage`);
      console.log(`${!hero ? 'You have' : 'The alien has'} ${attackee.hull} left`);
    }
    else {
      if(hero)
        console.log('You have Missed the alien 🙃');
      else
        console.log('The alien has missed You! 🙌🏽');
    }
  }
}

// const hero = new Ship(20, 5, .7, 'hero');
// const alien = new Ship(Math.floor(Math.random() * (6 - 3 + 1) + 3), Math.floor(Math.random() * (4 - 2 + 1) + 2), Number((Math.random() * (.8-.6) + .6).toFixed(1)))

// console.log(hero, alien);
// hero.attack(alien);
// alien.attack(hero);