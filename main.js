// ES6, Harmony, ES2015 are the names for the same thing.

/*******************
 * var, let and const
 ********************/


/**
 * So let is basically blocks scope meaning instead of function scope
 * What I mean is this. By default when we define variable through var
 *  their scope is the function in which they are defined
 * Take a look at the example below
 **/

/***
 * var
 ***/

function gonnaUseVar() {
	console.log(a);
	var a = 10; // Will print undefined
	/* The reason behind this is hoisting, where the variable declarations throughout the
	 * functions are put to the top
	 */
}

// So the above function is translated to this

function gonnaUseVarActual() {
	var a;
	console.log(a);
	a = 10;
}

// With the introduction of let and const now there should be no need to use var anymore

/***
 * let
 ***/

/**
 * let is a bit different as it scope by block, meaning by these little bad boys - {}
 */

function scopingWithLet() {
 	console.log(a); //Will result in error
	let a = 10;
}

function scopingWithLetAnother() {
	if(true) {
		let a = 10;
	}
	console.log(a); //Will result in error as let is block scoped
}


/***
 * const
 ***/

function usageOfConst() {
	const THIS_IS_A_CONST = 10;
	THIS_IS_A_CONST = 49; //Will result in error because const cannot be assigned again
}

/********************
 Template literals
 ********************/

/**
 * This provides a way to have values within a string without using the string concat operator i.e. +
 */

function withoutTemplateLiterals() {
	const name = "Mohit";
	const quality = "phoenix";

	const sentence = name + "is like a " + quality;
	console.log(sentence);
}

function withTemplateLiterals() {
	const name = "Mohit";
	const quality = "phoenix";

	const sentence = `${name} is like a ${quality}`;
	console.log(sentence);
}


/****************
 * Destructing
 ***************/

/**
 * Basically it is a techinique or let's say a shorthand to do quick assignment.
 * It will get more clear with the folowing example
 */

function destructing() {
	// Arrays
	let a = [2,3,4];
	let [, second, third] = a;
	console.log(second, third); // Will print 3,4

	// Objects
	let gemstone = {
		size: "big",
		type: "diamond"
	};

	const {size} = gemstone;
}

/****************************
 * Object literals shorthands
 *****************************/

/**
 * Lot of times while creating objects we have to write redundant code
 * something like this
 */

function objectCreationDoesntLookGreat() {
	var type = 'Diamond';
	var size = 'bigass';

	var gemstone = {
		type: type,
		size: size
	}
}

/**
 * A better way to write the above function :-
 */

function crisperObjectCreation() {
	let type = 'Diamond';
	let size = 'bigass';

	let gemstone = {type, size}
}

/******************************************************
 * Iteration for...in vs foreach vs for...of(ES6) loops
 *******************************************************/

function loopingWithForIn() {
	var a = [1, 2, 3, 4, 5, 6];
	Array.prototype.intoTwo = function(array) {
		return array.map(function(element){
			return element * 2;
		});
	};

	for(var index in a) {
		console.log(a[index]);
		if(index === 2) {
			break; // This will do nothing, as we cannot break out of for...in loop
		}
		// Will print 1,2,3,4,5,6 and also the intoTwo function
		// The reason being that for...in iterates over all enumerable props even the one
		// which are in the prototype chain
		// Also very important we cannot break out of this loop
	}
}


/**
 * The for...of loops work for iterable entities for ex- arrays, string, maps so
 * it won't work on objects
 * Side-note: do study maps very interesting concept
 */
function loopingWithForOf() {
	let a = [1, 2, 3, 4];
	Array.prototype.intoTwo = function(array) {
		return array.map(function(element){
			return element * 2;
		});
	};

	for(let element of a) {
		console.log(element);
		// This will not print the intoTwo function as it only prints the
		// actual properties of the array.
		if(element === 3) {
			break;
			// Yes, it is possible here to do this, wauw
			// This is not possible even in forEach
		}
	}
}


/****************************
 * Spread and rest operator
 ***************************/

/**
 * Again with these two operators we can do alot with lesser keystrokes.
 * Let me explain what I'm talking about:-
 */

function spreadOperatorExample() {
	let a = [1, 2];
	let b = [3, 4];

	let c = [...a, ...b]; //Short way to concat two arrays.

	//Basically we are spreading an array

	//One more use case can be to pass arguments to a function

	function iAcceptTwoArgs(arg1, arg2) {
		console.log(arg1, arg2);
	}

	iAcceptTwoArgs(...c); //Since c is an array with two values we can pass it here in spreaded format
}

/**
 * Rest is the opposite of spread. Not sure how? Let's explore
 */

function restOperatorExample() {
	let calcAverage = function(...numbers) {
		var arrayOfNumbers = [...numbers];
		let sum = 0;
		for(let elem of arrayOfNumbers) {
			sum += elem;
		}
		return sum / arrayOfNumbers.length;
	};

	calcAverage(3); //return 3
	calcAverage(3, 5); //returns 4

	// So the number of argument can vary that's what a variadic function means
}


/******************
 * Arrow function
 *******************/

/**
 * Ok so arrow function are the new way to define function in ES6
 * Lets see how it react in terms of syntax, scoping, and value of 'this'
 */

/**
 * For functions having one line body we can write the function like this
 */

let arrowShort = name => `Hi ${name}`;

/**
 * If there are no arguments then we can write the function like this
 */

let arrowShortNoArgs = () => `Nada args`;
let arrowShortNoArgsUnderscore = _ => `Nada args`; // This format is also used for no funcs with no aruguments
let arrowShortMultiLineMultiArgs = (firstName, lastName) => {
	let randomNumber = Math.random() * 10;
	return `Hi ${firstName} ${lastName}, your lucky number is ${randomNumber}`
};


/**
 * Arrow functions and this
 */


/**
 * There is a difference between a regular function and an arrow function when it comes to
 * treating this keyword. The value of this for a regular function depends on how it is called, for ex
 * with new keyword, with .call etc. For arrow function the value depends on the surrounding block.
 */

// Example one without arrow function

function IceCream() {
	this.scoop = 0;
}


IceCream.prototype.addScoop = function() {
	setTimeout(function() {
		this.scoop++;
		console.log(`This ice cream has ${this.scoop}(s)`);
	}, 1);
};

let dessert = new IceCream();
/**
 * The function below will print NaN as this.scoop is undefined because the function passed
 * to setTimeout is not initialized with new keyword so for it the `this` is the window object
 */
dessert.addScoop();




/**
 * One way to deal with this is to store the context before calling setTimeout
 * This will print the value 1
 */


IceCream.prototype.addScoop = function() {
	let iceCream = this;
	setTimeout(function() {
		iceCream.scoop++;
		console.log(`This ice cream has ${this.scoop}(s)`);
	}, 1);
};

dessert = new IceCream();
dessert.addScoop();

/**
 * One way to overcome the above problem without using a temp variable to store the context
 * is to use arrow functions. Let's have a look at the example below
 */

IceCream.prototype.addScoop = function() {
	setTimeout(() => {
		this.scoop++;
		console.log(`This ice cream has ${this.scoop}(s)`);
	}, 1);
};

dessert = new IceCream();
/**
 * When addScoop is called it takes the scope from the surrounding block.
 * In this case that surrounding function is the addScoop method
 * So the value of this for addScoop become the value for the function passed to
 * setTimeout
 */
dessert.addScoop();


/**
 * Caveat, look at the interesting case below
 */

IceCream.prototype.addScoop = () => {
	setTimeout(() => {
		this.scoop++;
		console.log(`This ice cream has ${this.scoop}(s)`);
	}, 1);
};


dessert = new IceCream();
/**
 * In this example again the value of `this` inside the function passed to setTimeout
 * is the same as the value for the addScoop function same as the previous example.
 * But in this case for the addScoop function the value of `this` is borrowed from outside
 * which in this case would be the window object.
 * So to summarize the value of this for normal function depends on how it is called and for
 * arrow function it depends on what is the value of this in the surrounding function at the time of declaration
 */
dessert.addScoop();


/**************************
 * Default Function Params
 **************************/

/**
 * With ES6 now we can have default params for functions like below
 */
const justANormieFunction = (name = 'user') => `Hi ${name}`;

/***
 * Object as default parameter
 ****/

let functionWithDefaultObject = ({name = 'person', hobbies = ['sleeping']}) => {
	return `Hi ${name} loves ${hobbies.join(', ')}`;
};

/**
 * We can call the above function in the following ways
 */

functionWithDefaultObject({});
functionWithDefaultObject({name: "Mohit"});
functionWithDefaultObject({hobbies: ['Football', 'Sleeping']});

functionWithDefaultObject(); //This will throw an error though as we will try to access props of undefined


/**
 * To overcome the above problem we can define the object like this
 */

functionWithDefaultObject = ({name = 'person', hobbies = ['sleeping']} = {}) => {
	return `Hi ${name} loves ${hobbies.join(', ')}`;
};

// Now we can call the above function with
functionWithDefaultObject();

/****
 * Array as default params
 ****/

let functionWithDefaultArray = ([width = 10, height = 10]) => {
	return width * height;
};

// The above will not work for
functionWithDefaultArray();

// To make the above work we need to define the function like this

let fucntionWithDefaultArray = ([width = 10, height = 10] = []) => {
	return width * height;
};

// Now the above function can be called like below
functionWithDefaultArray(); // All Good


/*********************
 * Classes and inheritance
 *********************/

class Animal {
	constructor(name = "Human", energy = 50) {
		this.name = name;
		this.energy = energy;
	}

	eats (food) {
		return `${this.name} eats  ${food} and then get ${this.energy} points`;
	}
}


class Feline extends Animal{
	constructor(name = "Somecat", energy = 80, domestic = true) {
		super(name, energy);
		this.domestic = domestic;
	}

	doesTheCatLoveYou(didYouGiveFood) {
		super.eats("Rubbish");
		return didYouGiveFood && this.domestic;
	}
}

/**
 * The super keyword can also be used as a instance like we did above. So to summarize
 * There are two ways to use the super keyword. One as a constructor, two as reference to the parent object
 */

/**
 * To achieve the same functionality in ES5 we would need to do the following
 */

var Animal = function(name, energy) {
	this.name = name || 'Human';
	this.energy = energy || energy;
};

Animal.prototype.eats = function(food) {
	return "This " + this.name + " eats "+ food + " and gets "+ this.energy + " points";
};

var Feline = function(name, energy, domestic) {
	Animal.call(this, name, energy); // This will make sure the constructor is called
	this.domestic = domestic;
};

Feline.prototype = new Animal();

Feline.prototype.doesTheCatLoveYou = function(didYouGiveFood) {
	this.eats('rubbish');
	return didYouGiveFood && this.domestic;
};


/**
 * Sets
 */

/**
 * In ES6 there's a new built-in objects called Sets.
 * Roughly speaking sets are like arrays but sets have the following props
 * - The elements in sets are unique.
 * - Sets are not index based so we can't refer to items based on their position.
 * - Items in Set cannot be accessed individually.
 */


/**
 * Following are examples of proper set creation
 *
 */

let setA = new Set([1, 2, 3, 0]);
let setB = new Set([1, false, 0, "0"]);
let setC = new Set([1, 2, 3, false, false]); //It will only contain 4 values so the duplicate false will be ignored

/**
 * Modifying sets
 */

setA.delete(1);
setA.add('Not a numberoo');


// Adding a duplicate item in set will not result in error
setA.add(1); // return the set itself

// Removing a non-existent item form a set will also not result in a error
setA.delete(25); // returns true or false

// The size of a Set is accessed by .size instead of .length
console.log(setA.length);  //undefined
console.log(setA.size); // 5

// Emptying a set
setA.clear();

// Checking whether an item exist in the set
setB.has(1); // true


let setBValues = setB.values();
console.log(setBValues.next()); // {done: false, value: 1}

/**
 * A much easier way to do this is by using the for...of iterator
 *
 */

for(const val of setB) {
	console.log(val); // it will print value of elements in setB
}

/**
 * WeakSet
 */

// A WeakSet only contains objects

let suchAWeakSet = new WeakSet([{value: 23, name: 'Weakling'}]); // Good
let suchAWrongWeakSet = new WeakSet([23]); //Error

// A cool gotcha for WeakSet

/**
 * Consider the following example.
 * We create an object and then add that object to
 * a WeakSet
 * Now when the object is deleted, the memory occupied by it will auto freed
 * when the JS collection runs, you wont have to do anything special for this.
 * So we don't have to worry about deleting the reference from the WeakSet
 */

// Important thing to not is that WeakSet don't have a .values function


/***************************
 * MAPS
 ***************************/

/**
 * If sets are similar to Array then Maps are similar to Objects.
 * Essentially maps let you store key value pairs where the both keys
 * and values can be objects.
 */


// Creating a map
const employees = new Map();

employees.set('mohit.suman@gmail.com', {
	firstName: 'Mohit',
	lastName: 'Suman'
});


// To find out if a key exists
employees.has('mohit.suman@gmail.com');

// To get the value of a particular key
let employee = employees.get('mohit.suman@gmail.com');

// To delete an entry, simply use .delete
employees.delete('mohit.suman@gmail.com');

// To delete all entries from the set
employees.clear();

// To iterate over a map

// You can use the keys
let employeeValues = employees.values();
employeeValues.next(); //Object {value : "mohit.suman@gmail.com", done: true}

// You can also use the values
let employeeKeys = employees.values();
employeeKeys.next(); //Object {value: {firstName: "Mohit", lastName: "Suman"}, done: true }

// Using a for...of loop
// we get an array as the value which contains first the key then the value of the set

for(const employee of employees) {
	let [email, details] = employee;
	console.log(email, details);
}

// Using a forEach loop
employees.forEach((value, key) => console.log(value,key));

/*************************
 * WeakMaps
 ************************/

// We can only add objects as key of WeakMap
// WeakMaps are not iterable
// WeakMaps don't have a .clear method

let book1 = {title: 'TLOR', author: 'Tera Baap'};
let book2 = {title: 'TLOR 2', author: 'Tera Baap'};

const library = new WeakMap();
library.set(book1, true);
library.set(book2, false);

// If we add anything other than an object we will get an error
library.set('Aloha', false);

/** Again if set the reference of the book1 object
 * to null then it will be deleted from the WeakMap as well
 */

book1 = null;

console.log(library); // WeakMap {Object{title: 'TLOR 2', author: 'Tera Baap'} => false}

/**
 * Promises
 */

/**
 * Promises basically take in a function as argument, which might complete in a bit
 * It also passes two arguments to this function one called resolve and the other called reject
 * When either resolve or reject is called, the promise is completed and any callbacks attached to
 * the promise using the .then are called.
 * Let's see how it works in practice
 */


let promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		if(Math.ceil(Math.random(1,10) * 10) % 2 === 0) {
			resolve('Awesome');
		} else {
			reject('Not great');
		}
	}, 1000);
});


promise.then((data) => {
	console.log(`The day is simply ${data}`);
}, (data) => {
	console.log(`It's a shame that the day is ${data}`);
});


/**
 * Proxies
 *
 * Proxies basically acts as interceptors for objects
 * So when the properties of an objects are accessed via a proxy
 * The proxy can alter the behaviour, lets look at the example below
 * to understand the concepts better.
 */

let object = {
	name: "Mohit",
	age: () => Math.ceil(Math.random(30, 50) * 10)
};

let objectHandler = {
	get(target, propertyName) {
		if(['name', 'age'].indexOf(propertyName) > -1) {
			if(target.confidential) {
				return `We cannot reveal the ${propertyName} to you`;
			}
		}
		return target[propertyName];
	},

	set(target, propertyName, value) {
		if(['name', 'age'].indexOf(propertyName) > -1) {
			if(target.confidential) {
				console.log('We cannot set the props for confidentiality reasons');
				return;
			}
		}

		target[propertyName] = value;
	}
};


let objectProxy = new Proxy(object, objectHandler);

// Here the name and age cannot be accessed
// as the proxy as the object.confidential = true
object.confidential = true;
console.log(objectProxy.name);
console.log(objectProxy.age());
objectProxy.father = 'Sabka Maalik ek hai';

// Here the name and age will be printed and will be accessible through
// the proxy as the object.confidential = false
object.confidential = false;
console.log(objectProxy.name);
console.log(objectProxy.age());


/**
 * Proxies vs ES5 getter and setter
 */

// In ES5 there were getter and setter

var obj1 = {
	_age: 34,
	get age() {
		console.log(this._age);
		return this._age;
	}
};


/** As you can see in the ES5 getter setter we couldn't work with
 * dynamic name of the properties
 */


/*******************************
 * Generators & Iterators
 *
 * It is one of the most confusing topic that I have witnessed so far in ES6.
 * Basically we can pause a function execution for a bit, get a value.
 * Then when we call the generator function again with .next() we resume the execution of the
 * function, till we encounter the next "yield" statement
 * What adds to the confusion is that you can pass value to the generator function as well.
 *******************************/


/**
 * How to define a constructor function
 * Having a asterisk between the function keyword and the name of the function will
 * result in the function being a generator function
 *
 * So all of these are correct
 *
 *
 * function *getStudent() {}
 * function * getStudent() {}
 * function* getStudent() {} - THIS IS THE STANDARD PRACTICE THOUGH
 */

function* getStudent() {
	console.log('Func exec started');
	const numbers = [1, 2, 3, 4 ,5, 6];

	for (let num of numbers) {
		console.log(num);
	}

	console.log('This is the last line of the function');
}

getStudent(); // Returns something like getStudent{<suspended>}


/**
 * IMPORTANT - When the a generator function runs it actually doesn't run
 * any code inside the function. Instead it create and returns an iterator.
 * The iterator can be used to execute the actual code inside the function
 *
 * So following up from our previous example:-
 */

let studentIterator = getStudent();
studentIterator.next();
/**
 * Will print the all the six numbs
 * 1
 * 2
 * 4
 * 5
 * 6
 */

/**
 * Yield keyword
 *
 * yield keyword inside a generator function causes the function to stop
 */

function* getStudentWithYield() {
	console.log('Func exec started');
	const numbers = [1, 2, 3, 4 ,5, 6];

	for (let num of numbers) {
		console.log(num);
		yield;
	}

	console.log('This is the last line of the function');
}

let studentIteratorYield = getStudentWithYield();
studentIteratorYield.next();
/**
 * This will print 1 and stop executing.
 * So would need to run the .next() 6 times for printing all values of the array
 * And we would need to run it for the 7 time to print the last line of console.log();
 */


/**
 * Return the a value from the generator function
 */

function* getStudentWithYieldReturn() {
	console.log('Func exec started');
	const numbers = [1, 2, 3, 4 ,5, 6];

	for (let num of numbers) {
		yield num;
	}

	console.log('This is the last line of the function');
}

let studentIteratorYieldReturn = getStudentWithYieldReturn();
let firstNumber = studentIteratorYieldReturn.next();
/**
 * Basically yield is like a return you can say.
 * firstNumber.value will contain the value 1, and firstNumber.done would be false
 */


/**
 * Passing value in a generator
 *
 * Now this is the real tricky part of generator, and would require
 * some iterations and practice from the brain to completely grasp the concept
 * Let see how it works
 */

function* displayResponse() {
	const response = yield;
	console.log(`That's what you want me to print ${response}`);
}

let displayResponseIterator = displayResponse();
displayResponseIterator.next();
/**
 * IMPORTANT First call to next needs to be run without passing any value
 * This will just return without assigning any value
 * When we run yield again then the value will be passed
 */

displayResponseIterator.next("Wassa Wassa Wassa"); // Will print the message and the function will run completely














































