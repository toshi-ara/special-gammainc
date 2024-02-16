type Option = {
    upper?: boolean;
    regularized?: boolean;
};
/**
 * FUNCTION: gammainc(x, a[, options])
 *	Computes the incomplete gamma function.
 *
 * @param {Number} x
 * @param {Number} a
 * @param {Object} [options] - function options
 * @param {Boolean} [options.upper=false] - boolean indicating whether to compute the lower (`false`) or upper (`true`) incomplete gamma function
 * @param {Boolean} [options.regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
 * @returns {Number} function value(s)
 */
export declare function gammainc(x: number, a: number, options?: Option): number;
export {};
