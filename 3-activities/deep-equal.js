// Your code here.

function deepEqual(x, y) {
    // check if outright equal (recursive bit)
    if (x === y) {
        return true;
    }

    // either is NOT an object 
    if (typeof(x) != "object" || typeof(x) != "object") {
        return false;
    }

    // either is null
    if (x === null || y === null) {
        return false;
    }

    // store x and y keys in arrays
    const xKeys = Object.keys(x);
    const yKeys = Object.keys(y);
    
    // same amount of keys
    if(xKeys.length != yKeys.length) {
        return false;
    }

    // check that y has all x keys
    for(let key of xKeys) {
        if(!yKeys.includes(key)) {
            return false;
        }

        // recursive bit
        // basically re-checking if value is another obj or array
        return deepEqual(x[key], y[key]);
    }

    return true;
};

let obj = {
    here: {
        is: "an"
    }, 
    object: 2
};

console.log(deepEqual(obj, obj));
// → true

console.log(deepEqual(obj, {
    here: 1, 
    object: 2
}));
// → false

console.log(deepEqual(obj, {    
    here: {is: "an"}, 
    object: 2
}));
// → true