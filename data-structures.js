// Array Methods
const friends = ["Alice", "Bob", "Charlie", "David"];
// 1- push -- mutates original one -- adds to the end
const newLength = friends.push("Eve");
console.log(friends); // ["Alice", "Bob", "Charlie", "David", "Eve"]
console.log(newLength); // 5

//2- unshift -- mutates original one -- adds to the beginning
const newLengthUnshift = friends.unshift("Zara");
console.log(friends);

//3- pop -- mutates original one -- removes from the end
const poppedFriend = friends.pop();
console.log(friends);
console.log("🚀 ~ poppedFriend:", poppedFriend);

//4- shift -- mutates original one -- removes from the beginning
const shiftedFriend = friends.shift();
console.log(friends);
console.log("🚀 ~ shiftedFriend:", shiftedFriend);

//5- indexOf -- returns index
const index = friends.indexOf("Charlie");
console.log("🚀 ~ index:", index); // 1

//6- includes -- returns boolean
const hasBob = friends.includes("Bob");
console.log("🚀 ~ hasBob:", hasBob); // true

// array destructuring
const array = [2, 3, 4];
const [a, b, c] = array;
console.log("🚀 ~ [a, b, c]:", a, b, c);
//spread operator , because it is on the right side of the =
const arr2 = [1, 5, ...array];
//REST, because on the left side of = , catches remaining elements .
const [v1, v2, ...others] = arr2;
console.log("🚀 ~ others:", others);

//Looping over arrays
for (const item of friends) {
  console.log("🚀 ~ item:", item);
}

// if u want the index as well
for (const item of friends.entries()) {
  console.log(item); // item is array
  const [i, el] = item;
  console.log(`${i + 1}: ${el}`);
}
/////////////////////////////////////////////////////////////////////////////////////

//Object Methods
const weekDaysOfRestaurant = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const restaurant = {
  name: "classico italiano",
  location: "giza",
  categories: ["italian", "pizzzeria", "vegeterian", "Organic"],
  starterMenu: ["maccaroni", "pasta", "bruchar", "salad"],
  mainMenu: ["pizza", "Risoto", "focaccia"],
  openingHours: {
    [weekDaysOfRestaurant[3]]: {
      // notice object literal syntax
      open: 12,
      close: 22,
    },
    [weekDaysOfRestaurant[4]]: {
      open: 11,
      close: 23,
    },
    [weekDaysOfRestaurant[5]]: {
      open: 0,
      close: 24,
    },
  },
};

//destructuring objects -- notice giving new var names, giving default value
const {
  name: restaurantName,
  openingHours,
  categories,
  menu = [],
} = restaurant;

console.log("🚀 ~ menu:", menu);
console.log("🚀 ~ categories:", categories);
console.log("🚀 ~ openingHours:", openingHours);
console.log("🚀 ~ name:", restaurantName);
//nested
const {
  fri: { open: o, close: cl },
} = openingHours;

//REST with objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log("🚀 ~ weekDays:", weekDays);

//REST with functions
const add = function (...params) {
  console.log("🚀 ~ add ~ params:", params);
};
add(1, 2);
add(1, 2, 3);

///////////////////////////
// then with spread we expand //
//   with rest we compress   //
//////////////////////////

//looping over objects
const objectKeys = Object.keys(restaurant.openingHours);
console.log("🚀 ~ objectKeys:", objectKeys);
for (const day of objectKeys) {
  console.log(day);
}
const objectValues = Object.values(restaurant.openingHours);
console.log("🚀 ~ objectValues:", objectValues);

for (const value of objectValues) {
  console.log(value);
}
const objectEntries = Object.entries(restaurant.openingHours);
console.log("🚀 ~ objectEntries:", objectEntries);
// notice destructuring in the for loop
for (const [day, { open, close }] of objectEntries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

/////////////////////////////////////////////////////////////////////////////////////

//Sets
const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risoto",
  "Pasta",
  "Salad",
  "Focaccia",
]);
const stringSet = new Set("aya");
console.log("🚀 ~ stringSet:", stringSet);
console.log("🚀 ~ ordersSet:", ordersSet);
console.log("🚀 ~ ordersSet.size:", ordersSet.size);
console.log("🚀 ~ ordersSet.has('Pizza'):", ordersSet.has("Pizza")); // like includes in array

ordersSet.add("Garlic Bread"); //like push in array
ordersSet.add("Garlic Bread");

ordersSet.delete("Risoto"); // can delete certain element

// Take care -- no index based access in sets
// orderSet[0]  // no index based access
console.log("🚀 ~ ordersSet:", ordersSet);
// looping over sets
for (const order of ordersSet) console.log(order);

ordersSet.clear(); // removes all elements

//Example of removing duplicates from array
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const staffUnique = [...new Set(staff)]; // we can spread sets like arrays
console.log("🚀 ~ staffUnique:", staffUnique);

const italianFoods = new Set([
  "pasta",
  "gnocchi",
  "tomatoes",
  "olive oil",
  "garlic",
  "basil",
]);

const mexicanFoods = new Set([
  "tortillas",
  "beans",
  "rice",
  "tomatoes",
  "avocado",
  "garlic",
]);
// newer methods in sets : union , intersection , difference ,symmetricDifference, but needs new browsers
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log("🚀 ~ commonFoods:", [...commonFoods]);

const allFoods = italianFoods.union(mexicanFoods);
console.log("🚀 ~ allFoods:", [...allFoods]);

const italianUniqueFoods = italianFoods.difference(mexicanFoods);
console.log("🚀 ~ italianUniqueFoods:", [...italianUniqueFoods]);

const mexicanUniqueFoods = mexicanFoods.difference(italianFoods);
console.log("🚀 ~ mexicanUniqueFoods:", [...mexicanUniqueFoods]);

const allUniqueFoods = italianFoods.symmetricDifference(mexicanFoods);
console.log("🚀 ~ allUniqueFoods:", [...allUniqueFoods]);

// Maps --> key-value pairs, but the difference between map and object is that in maps keys can have any data type (not just strings or symbols, they can be objects, functions, etc)
const rest = new Map();
rest.set("name", "classico italiano"); //adds new element to the map (similar to add in sets)
rest.set(1, "giza, egypt");
rest.set(2, "cairo, egypt");
rest.set("categories", ["italian", "pizzzeria", "vegeterian", "Organic"]);
rest.set("open", 11);
rest.set("close", 23);
rest.set(true, "we are open :D");
//it returns the map itself to allow chaining
rest.set(false, "we are closed :(").set("rating", 4.8);

rest.get("name"); // to get value from map
rest.get(true); // we are open :D
const time = 21;
rest.get(time > rest.get("open") && time < rest.get("close")); // we are open :D
console.log("🚀 ~ rest:", rest);
console.log("🚀 ~ rest.get('name'):", rest.get("name"));
console.log("🚀 ~ rest.get('name'):", rest.get("categories"));

// to check if certain key exists
console.log("🚀 ~ rest.has('categories'):", rest.has("categories")); // true
// to remove element
rest.delete(2);
console.log("🚀 ~ rest:", rest);
// rest.clear(); // removes all elements
console.log("🚀 ~ rest.size:", rest.size); // number of elements in map

rest.set([1, 2], "test");
console.log("🚀 ~ rest.get([1, 2]):", rest.get([1, 2])); // undefined because different references

//solution
const arrKey = [1, 2];
rest.set(arrKey, "test");
console.log("🚀 ~ rest.get(arrKey):", rest.get(arrKey)); // test

//array of arrays to create map [[key1, value1], [key2, value2] , ...]
const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct 🎉"],
  [false, "Try again!"],
]);
console.log("🚀 ~ question:", question);
//convert object to map
const hoursMap = new Map(Object.entries(restaurant.openingHours)); // as the structure of Object.entries is like array of arrays
console.log("🚀 ~ hoursMap:", hoursMap);

//looping over maps
console.log("🚀 ~ question:", question.get("question"));
for (const [key, value] of question) {
  // for the object we used Object.entries
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
const answer = 2;

console.log(question.get(answer == question.get("correct")));

//converting map to array --results in array of arrays
const mapToArray = [...question];
console.log("🚀 ~ mapToArray:", mapToArray);
const mapKeys = [...question.keys()];
console.log("🚀 ~ mapKeys:", mapKeys);
const mapValues = [...question.values()];
console.log("🚀 ~ mapValues:", mapValues);

//////////////////////////////////////////////////////

//Strings

const airLine = "TAP Air Portugal";
const plane = "A320";
console.log("🚀 ~ plane length:", plane.length);
console.log("🚀 ~ plane :", airLine.indexOf("r")); //like array, returns -1 if not found
console.log("🚀 ~ airLine :", airLine.lastIndexOf("r"));
console.log("🚀 ~ airLine :", airLine.lastIndexOf("r"));
console.log("🚀 ~ airLine :", airLine.toLowerCase());
console.log("🚀 ~ airLine :", airLine.toUpperCase());

//take a slice from the string -- extract from position 4
console.log("🚀 ~ airLine :", airLine.slice(4));
//take last 2 letters
console.log("🚀 ~ airLine :", airLine.slice(-2));
//start from to , cut off the last char
console.log("🚀 ~ airLine :", airLine.slice(1, -1));
// Comparing emails
const email = "hello@jonas.io";
const loginEmail = "  Hello@Jonas.Io \n";

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";

console.log(announcement.replace("door", "gate"));
console.log(announcement.replaceAll("door", "gate"));

// Alternative solution to replaceAll with regular expression -- g : global
console.log(announcement.replace(/door/g, "gate"));

// Booleans
const newPlane = "Airbus A320neo";
console.log(newPlane.includes("A320"));
console.log(newPlane.includes("Boeing"));
console.log(newPlane.startsWith("Airb"));
if (newPlane.startsWith("Airbus") && newPlane.endsWith("neo")) {
  console.log("Part of the NEW ARirbus family");
}

// Split and join -- takes a divider
console.log("a+very+nice+string".split("+"));
console.log("Jonas Schmedtmann".split(" "));

const [firstName, lastName] = "Jonas Schmedtmann".split(" ");
const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log("🚀 ~ newName:", newName);

// Padding
const message = "Go to gate 23!";
console.log(message.padStart(20, "+").padEnd(30, "+"));
console.log("Jonas".padStart(20, "+").padEnd(30, "+"));

// converting number into string
const number = 123;
const str = number + "";

////////////////////////////////////
// Array Methods: Map
const books = [
  { id: 2, title: "  The Great Gatsby  ", noPages: 180 },
  { id: 3, title: "  1984  ", noPages: 200 },
  { id: 4, title: "  To Kill a Mockingbird  ", noPages: 90 },
];
// the map method creates a new array by applying a function to each element of the original array.
const mapArr = [1, 2, 3, 4, 5].map((n) => n * 2);
console.log("🚀 ~ mapArr:", mapArr);

const cleanBooks = books.map((book) => book.title.trim());
console.log("🚀 ~ cleanBooks:", cleanBooks);

// Array Methods: Filter -- creates a new array with all elements that pass the test implemented by the provided function.
const filteredBooks = books.filter((book) => book.noPages >= 100);
console.log("🚀 ~ filteredBooks:", filteredBooks);

// Array Methods: Reduce -- executes a reducer function on each element of the array, resulting in a single output value. -- its common usage is to add together all values in an array -- total is the accumulator that holds the accumulated value
const totalPages = books.reduce((total, book) => total + book.noPages, 0); // total starts from 0 and it will hold the sum of the noPages
console.log("🚀 ~ totalPages:", totalPages);

// Array Methods: Find -- returns the value of the first element in the array that satisfies the provided testing function.
const bookWith200Pages = books.find((book) => book.noPages === 200);
console.log("🚀 ~ bookWith200Pages:", bookWith200Pages);
// Array Methods: Sort -- sorts the elements of an array in place and returns the sorted array. note that it change the original array to !!!!!!!
// that is why we use that slice() to create a shallow copy first
const numArr = [5, 3, 8, 1, 2];
numArr.slice().sort((a, b) => a - b); // ascending order
console.log("🚀 ~ numArr ascending:", numArr);
numArr.slice().sort((a, b) => b - a); // descending order
console.log("🚀 ~ numArr descending:", numArr);
//sorting objects based on a property
const sortedBooksByPages = books.slice().sort((a, b) => a.noPages - b.noPages);

// Array Methods: Flat -- creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
const nestedArr = [1, [2, 3], [4, [5, 6]]];
const flatArr = nestedArr.flat(2); // depth of 2
console.log("🚀 ~ flatArr:", flatArr);

//////////////////////////////////////////
// working with immutable arrays as React likes (CRUD)
// 1) Add
const newBook = {
  id: 6,
  title: "Brave New World",
  author: "Aldous Huxley",
};
const booksAfterAdd = [...books, newBook]; // adding
//booksAfterAdd.push(newBook); // wrong ! this will mutate the original array
console.log("🚀 ~ booksAfterAdd:", booksAfterAdd);

//2) Delete -- filter out (make ur arr shorter)
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);
console.log("🚀 ~ booksAfterDelete:", booksAfterDelete);

// 3) Update - map (resulting array will have the same length as before)
const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 2 ? { ...book, noPages: 110 } : book
);
console.log("🚀 ~ booksAfterUpdate:", booksAfterUpdate);

//Array.from -- creates array from array-like or iterable objects
const strArray = Array.from("Hello");
console.log("🚀 ~ strArray:", strArray);
/*

Position 0: 0 + 1 = 1
Position 1: 1 + 1 = 2
Position 2: 2 + 1 = 3
Position 3: 3 + 1 = 4
Position 4: 4 + 1 = 5
*/
const numArray = Array.from({ length: 5 }, (_, i) => i + 1); // second argument is a map function
console.log("🚀 ~ numArray:", numArray);
