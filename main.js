class Ship {
  constructor(hull, firepower, accuracy, name = 'alien') {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
}