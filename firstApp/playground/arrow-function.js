var square = x => x*x;

console.log(square(5));


var user = {
    name: 'Karol',
    sayHi: (x,y,z) => {
        console.log(arguments);
        console.log(`Hi!. I'm ${this.name}`);
    },
    sayHiAlt () {
        console.log(arguments);
        console.log(`Hi!. I'm ${this.name}`);
    }
};

user.sayHi(1, 2 , 3);
