import { gamma } from "@toshiara/special-gamma";

let x = [
    4.0, -1.5, -0.5, 0.0, -0.0, NaN
];

for (let i = 0; i < x.length; i++) {
    console.log("gamma(", x[i], ") =", gamma(x[i]));
}

