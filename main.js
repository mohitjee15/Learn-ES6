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

	doTheCatLoveYou(didYouGiveFood) {
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

Feline.prototype.doTheCatLoveYou = function(didYouGiveFood) {
	this.eats('rubbish');
	return didYouGiveFood && this.domestic;
};





















