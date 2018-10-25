console.log('Starting app');

setTimeout(() => {
    console.log("inside of setTimeout");

}, 2000)

setTimeout(() => {
    console.log("inside of setTimeout 2");

}, 0)

console.log('Finishing up');
