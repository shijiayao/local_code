function fn (a: any): void {
    return a;
}

let a1:void;
a1 = undefined;
let u: undefined;
let n: null = null;

let x = 1;
function add () {
    x++;
    setTimeout(() => console.log(x), 0);
}
add();
console.log(x);
