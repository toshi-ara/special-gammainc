import { gammainc } from "@toshiara/special-gammainc";

const x = 9;
const a = 3;

console.log("gammainc(9, 3) =", gammainc(x, a));
console.log("gammainc(9, 3, { upper: true }) =",
    gammainc(x, a, { upper: true}));
console.log("gammainc(9, 3, { regularized: false }) =",
    gammainc(x, a, { regularized: false }));
console.log("gammainc(9, 3, { upper: true, regularized: false }) =",
    gammainc(x, a, { upper: true, regularized: false }));

