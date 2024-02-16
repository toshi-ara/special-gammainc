import { gamma } from "@toshiara/special-gamma";
import { gammaln } from "@toshiara/special-gammaln";


const EPSILON = 1e-16;

type Option = {
    lower?: boolean,
    regularized?: boolean
}


// INCOMPlETE GAMMA FUNCTION //

/**
 * FUNCTION: gammainc(x, a[, options])
 *	Computes the incomplete gamma function.
 *
 * @param {Number} x
 * @param {Number} a
 * @param {Object} [options] - function options
 * @param {Boolean} [options.lower=true] - boolean indicating whether to compute the lower (`true`) or upper (`false`) incomplete gamma function
 * @param {Boolean} [options.regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
 * @returns {Number} function value(s)
 */
export function gammainc(x: number, a: number, options?: Option): number {
    if (x === 0) {
        return 0;
    }
    if (x < 0 || a <= 0) {
        return NaN;
    }
    if (x === null || isNaN(x)) {
        return NaN;
    }

    let lower;
    let regularized;

    if (options === undefined) {
        lower = true;
        regularized = true;
    } else {
        // tail
        lower = (options.lower === undefined)
            ? true
            : options.lower;

        // regularized
        regularized = (options.regularized === undefined)
            ? true
            : options.regularized;
    }

    return (lower)
        ? gammainc_l(x, a, regularized)
        : gammainc_u(x, a, regularized);
}



// UPPER INCOMPLETE GAMMA FUNCTION
// via modified Lentz's method for computing continued fraction, see README.md

/**
 * FUNCTION: gammainc_u(x, s, regularized)
 *	Computes the regularized upper incomplete gamma function
 * @param {Number} x - function parameter
 * @param {Number} s - function parameter
 * @param {Boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
 * @returns {Number} function value
 */
function gammainc_u(x: number, s: number, regularized: boolean): number {
    if (x === 0) {
        return 0;
    }
    if (x < 0 || s <= 0) {
        return NaN;
    }

    if (x <= 1.1 || x <= s) {
        if (regularized !== false) {
            return 1 - gammainc_l(x, s, regularized);
        } else {
            return gamma(s) - gammainc_l(x, s, regularized);
        }
    }

    let f = 1 + x - s;
    let C = f;
    let D = 0;
    for (let i = 1; i < 10000; i++) {
        const a = i * (s - i);
        const b = (i << 1) + 1 + x - s;
        D = b + a * D;
        C = b + a / C;
        D = 1 / D;
        const chg = C * D;
        f *= chg;

        if (Math.abs(chg - 1) < EPSILON) {
            break;
        }
    }

    if (regularized !== false) {
        return Math.exp(s * Math.log(x) - x - gammaln(s) - Math.log(f));
    } else {
        return Math.exp(s * Math.log(x) - x - Math.log(f));
    }
}


// LOWER INCOMPlETE GAMMA FUNCTION //
// via power series expansion, see README.md

/**
* FUNCTION: gammainc_l(x, s[, regularized] )
*	Computes the regularized lower incomplete gamma function
* @param {Number} x - function parameter
* @param {Number} s - function parameter
* @param {Boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @returns {Number} function value
*/

function gammainc_l(x: number, s: number, regularized: boolean): number {
    if (x === 0) {
        return 0;
    }
    if (x < 0 || s <= 0) {
        return NaN;
    }

    if (x > 1.1 && x > s) {
        return regularized
            ? 1 - gammainc_u(x, s, regularized)
            : gamma(s) - gammainc_u(x, s, regularized);
    }

    let r = s;
    let c = 1;
    let pws = 1;

    let ft = regularized
        ? s * Math.log(x) - x - gammaln(s)
        : s * Math.log(x) - x;
    ft = Math.exp(ft);
    do {
        r += 1;
        c *= x/r;
        pws += c;
    } while (c / pws > EPSILON);

    return pws * ft / s;
}

