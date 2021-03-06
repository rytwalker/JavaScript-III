/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance heirarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properites and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

// Object
function GameObject(attributes) {
  this.createdAt = attributes.createdAt;
  this.dimensions = attributes.dimensions = {
    length: attributes.dimensions.length,
    width: attributes.dimensions.width,
    height: attributes.dimensions.height
  };
}

// Prototypes
GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game`;
};

/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(charAttributes) {
  GameObject.call(this, charAttributes);
  this.hp = charAttributes.hp;
  this.name = charAttributes.name;
}

// Init prototype
CharacterStats.prototype = Object.create(GameObject.prototype);

// Prototypes
CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage`;
};

/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(humanoidAttributes) {
  CharacterStats.call(this, humanoidAttributes);
  this.faction = humanoidAttributes.faction;
  this.weapons = humanoidAttributes.weapons;
  this.language = humanoidAttributes.language;
  this.maxHP = humanoidAttributes.maxHP;
}

// Init prototype
Humanoid.prototype = Object.create(CharacterStats.prototype);

// Prototypes
Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}`;
};

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by uncommenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  hp: 5,
  name: 'Bruce',
  faction: 'Mage Guild',
  weapons: ['Staff of Shamalama'],
  language: 'Common Toungue'
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  hp: 15,
  name: 'Sir Mustachio',
  faction: 'The Round Table',
  weapons: ['Giant Sword', 'Shield'],
  language: 'Common Toungue'
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  hp: 10,
  name: 'Lilith',
  faction: 'Forest Kingdom',
  weapons: ['Bow', 'Dagger'],
  language: 'Elvish'
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.hp); // 15
console.log(mage.name); // Bruce
console.log(swordsman.faction); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:

// DOM SELECTORS
const villain = document.getElementById('villain');
const hero = document.getElementById('hero');
const messages = document.querySelector('.messages');

// HP BARS
villainHPBar = document.querySelector('.villain-hp-bar');
heroHPBar = document.querySelector('.hero-hp-bar');
heroTotalHP = document.querySelector('.hero-total-hp');
heroHP = document.querySelector('.hero-current-hp');

villainTotalHP = document.querySelector('.villain-total-hp');
villainHP = document.querySelector('.villain-current-hp');

// GAME OVER
gameOverScreen = document.querySelector('.game-over');

// FUNCTIONS
function messageFlicker() {
  messages.style.background = '#ff7878';
  messages.style.color = '#fff';
  setTimeout(() => {
    messages.style.background = '#eee';
    messages.style.color = '#000';
  }, 350);
}

// HERO
function Hero(heroAttributes) {
  Humanoid.call(this, heroAttributes);
}

// Init prototype
Hero.prototype = Object.create(Humanoid.prototype);

// HERO PROTOTYPE METHODS
Hero.prototype.castSpell = function(villain) {
  if (villain.hp > 1) {
    villain.hp -= 1;
    villainHPBar.style.width =
      ((villain.hp / villain.maxHP) * 100).toString() + '%';
    messages.textContent = `${
      this.name
    } casted Paper Cut!!! ${villain.takeDamage()}... HP: ${villain.hp}`;
    messageFlicker();
  } else if (villain.hp === 1) {
    villain.hp -= 1;
    villainHPBar.style.width =
      ((villain.hp / villain.maxHP) * 100).toString() + '%';
    messages.textContent = `${villain.destroy()}... Boom, roasted.`;
    messageFlicker();
  } else if (villain.hp === 0) {
    gameOverScreen.classList.add('.game-over-active');
  }
};

Hero.prototype.superAttack = function(villain) {
  if (villain.hp >= 4) {
    villain.hp -= 3;
    villainHPBar.style.width =
      ((villain.hp / villain.maxHP) * 100).toString() + '%';
    messages.textContent = `${
      this.name
    } Threw a Party!!! ${villain.takeDamage()}... HP: ${villain.hp}`;
    messageFlicker();
  } else if (villain.hp === 0) {
    messages.textContent = `${villain.destroy()}... Boom, roasted.`;
    messageFlicker();
  } else {
    messages.textContent = 'Use normal attack... super is too much';
  }
};

function Villain(villainAttributes) {
  Humanoid.call(this, villainAttributes);
}

// Init prototype
Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.baseAttack = function(hero) {
  if (hero.hp > 1) {
    hero.hp -= 1;
    heroHPBar.style.width = ((hero.hp / hero.maxHP) * 100).toString() + '%';
    messages.textContent = `${
      this.name
    } attacked with Endless Paperwork!!! ${hero.takeDamage()}... HP: ${
      hero.hp
    }`;
    messageFlicker();
  } else if (hero.hp === 1) {
    hero.hp -= 1;
    heroHPBar.style.width = ((hero.hp / hero.maxHP) * 100).toString() + '%';
    messages.textContent = `${hero.destroy()}... Boom, roasted.`;
    messageFlicker();
  }
};

Villain.prototype.superAttack = function(hero) {
  if (hero.hp >= 4) {
    hero.hp -= 3;
    heroHPBar.style.width = ((hero.hp / hero.maxHP) * 100).toString() + '%';
    messages.textContent = `${
      this.name
    } Threw Bureaucratic Shade!!! ${hero.takeDamage()}... HP: ${hero.hp}`;
    messageFlicker();
  } else if (hero.hp === 0) {
    messages.textContent = `${hero.destroy()}... Boom, roasted.`;
    messageFlicker();
  } else {
    messages.textContent = 'Use normal attack... super is too much';
  }
};

// * Create two new objects, one a villain and one a hero and fight it out with methods!
const michael = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  hp: 15,
  maxHP: 15,
  name: 'Michael Scott',
  faction: 'Dunder Mifflin',
  weapons: ['Improv Comedy', 'Party Planning Committee'],
  language: 'Common Toungue'
});

const charles = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  hp: 10,
  maxHP: 10,
  name: 'Charles Minor',
  faction: 'Corporate',
  weapons: ['Bureaucracy', 'Dagger'],
  language: 'Elvish'
});

// INIT SET UP

heroTotalHP.textContent = michael.maxHP;
heroHP.textContent = michael.maxHP;
villainTotalHP.textContent = charles.maxHP;
villainHP.textContent = charles.maxHP;

// BUTTON EVENT LISTENERS

villain.addEventListener('click', e => {
  if (e.target.classList.contains('attack-btn')) {
    console.log('hello');
    charles.baseAttack(michael);
  } else if (e.target.classList.contains('super-btn')) {
    charles.superAttack(michael);
  }
  heroHP.textContent = michael.hp;
});

hero.addEventListener('click', e => {
  if (e.target.classList.contains('attack-btn')) {
    michael.castSpell(charles);
  } else if (e.target.classList.contains('super-btn')) {
    michael.superAttack(charles);
  }
  villainHP.textContent = charles.hp;
});
