// 1- constructor function to create Person objects
const Person = function (name, birthYear) {
  this.name = name;
  this.birthYear = birthYear;
  // never do this - create methods inside constructor functions
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};
// static method
Person.hey = function () {
  console.log("Hey there 👋");
  console.log(this); //constructor function itself
};
const jonas = new Person("Jonas", 1991);
console.log(jonas);

Person.hey();
//jonas.hey(); // error

const matilda = new Person("Matilda", 2017);
console.log(matilda);

const jack = new Person("Jack", 1975);
console.log(jack);

console.log(jonas instanceof Person); // true

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// challange 1
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
// };
// const BMW = new Car("BMW", 120);
// const Mercedes = new Car("Mercedes", 95);

class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  static hey() {
    console.log("Hey there 👋");
    console.log(this);
  }
}

const jessica = new PersonCl("Jessica aya", 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
console.log(jessica.__proto__ === PersonCl.prototype); // true

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet();

//1- classes are NOT hoisted
//2- classes are first-class citizens , we can path them into functions , and return them from functions as they are a special kind of functions behind the scenes
//3- classes are executed in strict mode

// 1- getters and setters -- they are extremely helpful when we need a value that needs to be calculated based on other values
const account = {
  owner: "jonas",
  movements: [200, 530, 120, 300],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest); // 300
account.latest = 50;
console.log(account.movements); // [200, 530, 120, 300, 50]

// 2- Object.create --rarely used but very important to understand the prototypal inheritance
const PersonProto = {
  // this is our prototype for any person object
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();

/////////////////////////
//Inheritance between "classes": constructor functions
// pass same parent properties to child class (usually) , some additional ones
const Student = function (name, birthYear, course) {
  // we wanted to call the parent constructor function here, but this won't work bc 'this' keyword is not yet defined
  // Person(name, birthYear);
  // that's why we use .call() method to manually set 'this' keyword for the Person function to the new object that is being created by Student constructor function
  Person.call(this, name, birthYear);
  this.course = course;
};
// now we want to set the proto type of the Student class to be the same as the Person class so that all student objects can access the methods defined on Person.prototype (as we are going to do this manually , this means we will use Object.create() method)
Student.prototype = Object.create(Person.prototype); // u need to do this before adding any methods to the Student prototype
Student.prototype.constructor = Student; // to fix the constructor property pointing to Person instead of Student
// why not Student.prototype = Person.prototype ?
// bc then any changes to Student.prototype will also affect Person.prototype as they will both point to the same object in the memory
Student.prototype.introduce = function () {
  console.log(`My name is ${this.name} and I study ${this.course}`);
};
const aya = new Student("Aya", 2000, "Computer Science");
console.log(aya);
aya.introduce();
aya.calcAge(); // inherited method from Person prototype , not directely from Student prototype
console.log(aya.__proto__);
/////////////////////////////////////////////
// Inheritance between "classes": ES6 classes
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // always needs to happen first -- but u can have no constructor at all in the child class , and will still work , but as u created one u have to call the parent constructor
    super(fullName, birthYear); // calls the parent class constructor
    this.course = course;
  }
  introduce() {
    //those methods are added to the StudentCl prototype
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  }
  // we can also override methods inherited from parent class -- polymorphism
  // this is shadowing the calcAge method from PersonCl
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}
const mike = new StudentCl("Mike", 2020, "Mathematics");
mike.introduce();
mike.calcAge(); // inherited method from PersonCl prototype (prototype of prototype)
console.log("🚀 ~ mike.age:", mike.age); // inherited from parent class

/////////////////////////////////////////////
// Inheritance between "classes": Object.create
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (name, birthYear, course) {
  PersonProto.init.call(this, name, birthYear);
  this.course = course;
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
jay.calcAge();

///////////////////////////////////////
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods

class Account {
  locale = navigator.language;
  bank = "Bankist";
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // this.movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface (API)
  getMovements() {
    return this.#movements;
    // Not chaninable
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  #approveLoan(val) {
    // Fake method
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);
// acc1.deposit(300);
// acc1.withdraw(100);
const movements = acc1
  .deposit(300)
  .withdraw(100)
  .withdraw(50)
  .requestLoan(25000)
  .withdraw(4000)
  .getMovements();

console.log(acc1);
// console.log(acc1.#movements);
// Account.#test();
console.log(movements);

///////////////////////////////////////
