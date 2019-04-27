function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

/* This function sorts arrays using an arbitrary comparator (don't 
 * use builtin sort). You pass it a comparator and an array of objects 
 * appropriate for that comparator and it will return a new array which 
 * is sorted with the largest object in index 0 and the smallest in the 
 * last index
 */
function sortArr( comparator, array ){
    for (let n = 0; n < array.length; n++) {
        for (let i = 0; i < array.length-1; i++) {
            if (comparator(array[i+1], array[i])) {
                const temp = array[i];
                array[i] = array[i+1];
                array[i+1] = temp;
            }
        }
    }
    return array;
}

/* A comparator takes two arguments and uses some algorithm to compare 
 * them. If the first argument is larger or greater than the 2nd it 
 * returns true, otherwise it returns false. Here is an example that 
 * works on integers
 */
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/* For all comparators if cars are 'tied' according to the comparison rules 
 * then the order of those 'tied' cars is not specified and either can come 
 * first
 */

/* This compares two automobiles based on their year. Newer cars are "greater" 
 * than older cars.
 */
function yearComparator( auto1, auto2){
    return (auto1.year < auto2.year);
}

/* This compares two automobiles based on their make. It should be case insensitive 
 * and makes which are alphabetically earlier in the alphabet are "greater" than 
 * ones that come later.
 */
function makeComparator( auto1, auto2){
    return (auto1.make.toLowerCase() < auto2.make.toLowerCase());
}

/* This compares two automobiles based on their type. The ordering from "greatest" 
 * to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise 
 * listed). It should be case insensitive. If two cars are of equal type then 
 * the newest one by model year should be considered "greater".
 */

 function typeComparator( auto1, auto2){
    if (auto1.type === auto2.type) {
        return yearComparator(auto1, auto2);
    }

    let auto1Type = auto1.type.toLowerCase();
    let auto2Type = auto2.type.toLowerCase();

    switch (auto1.type) {
        case "roadster":
            auto1Type = 5;
        case "pickup": 
            auto1Type = 4;
        case "suv": 
            auto1Type = 3;
        case "wagon":
            auto1Type = 2;
        default:
            auto1Type = 0;
    }

    switch (auto2.type) {
        case "roadster":
            auto1Type = 5;
        case "pickup": 
            auto1Type = 4;
        case "suv": 
            auto1Type = 3;
        case "wagon":
            auto1Type = 2;
        default:
            auto1Type = 0;
    }

    return (auto1Type > auto2Type);
}

Automobile.prototype.logMe = function(boolInput) {
    let string = '\n' + this.year + ' ' + this.make + ' ' + this.model;

    if(boolInput) {
        string += ' ' + this.type;
    }

    console.log(string)
}

/* Your program should output the following to the console.log, including the opening 
 * and closing 5 stars. All values in parenthesis should be replaced with appropriate 
 * values. Each line is a seperate call to console.log.

TODO: Each line representing a car should be produced via a logMe function. 
This function should be added to the Automobile class and accept a single 
boolean argument. If the argument is 'true' then it prints "year make model type" 
with the year, make, model and type being the values appropriate for the automobile. 
If the argument is 'false' then the type is ommited and just the "year make model" 
is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */

console.log("***** \nThe cars sorted by year are: ");
sortArr(yearComparator, automobiles);
for (let i = 0; i < automobiles.length; i++) {
    automobiles[i].logMe(false);
}


console.log("\n\nThe cars sorted by make are:");
sortArr(makeComparator, automobiles);

for (let i = 0; i < automobiles.length; i++) {
    automobiles[i].logMe(false);
}

console.log("\n\nThe cars sorted by type are:");
sortArr(typeComparator, automobiles);

for (let i = 0; i < automobiles.length; i++) {
    automobiles[i].logMe(true);
}

console.log("\n*****");