gammainc
===

> [Incomplete gamma function](https://en.wikipedia.org/wiki/Incomplete_gamma_function).

Evaluates the *unregularized* or *unregularized* gamma functions.

This package is a rewrite of
 [@compute-io/gammainc](https://github.com/compute-io/gammainc)
 in Typescript.
This package supports both CommonJs and ES Modules.

---

Computes the regularized lower
[incomplete gamma function](https://en.wikipedia.org/wiki/Incomplete_gamma_function):

<div class="equation" align="center" data-raw-text="P( x, a ) = \frac{\gamma(a,x)}{\Gamma(a)} = \frac{1}{\Gamma(a)} \int_0^x t^{a-1} e^{-t} \; dt" data-equation="eq:lower_incomplete_gamma">
<img src="https://cdn.rawgit.com/compute-io/gammainc/68d3e61dfeace303cffe14b75c5b249ba75b5281/docs/img/eqn1.svg" alt="Equation for the regularized lower incomplete gamma function.">
<br>
</div>

The function can also be used to evaluate
 the regularized upper incomplete gamma function, which is defined as follows:

<div class="equation" align="center" data-raw-text="Q( x, a ) = \frac{\Gamma(a,x)}{\Gamma(a)} = \frac{1}{\Gamma(a)} \int_x^\infty t^{a-1} e^{-t} \; dt" data-equation="eq:upper_incomplete_gamma">
<img src="https://cdn.rawgit.com/compute-io/gammainc/68d3e61dfeace303cffe14b75c5b249ba75b5281/docs/img/eqn2.svg" alt="Equation for the regularized upper incomplete gamma function.">
<br>
</div>

The two functions have the relationship `Q(x,a) = 1 - P(x,a)`.

In addition,
 this package can be used to evaluate the *unregularized* gamma functions.
The range of above functions is `[0, 1]`,
 which is not the case fo the *unregularized* versions.
The unregularized lower incomplete gamma function is defined as

<div class="equation" align="center" data-raw-text="\gamma(a,x) = \int_0^x t^{a-1} e^{-t} \; dt" data-equation="eq:unreg_lower_incomplete_gamma">
<img src="https://cdn.rawgit.com/compute-io/gammainc/edb25812443645fa97017137b1f84708a84cea2c/docs/img/eqn3.svg" alt="Equation for the unregularized lower incomplete gamma function.">
<br>
</div>

and the upper unregularized incomplete gamma function is

<div class="equation" align="center" data-raw-text="\Gamma(a,x)= \int_x^\infty t^{a-1} e^{-t} \; dt" data-equation="eq:unreg_upper_incomplete_gamma">
<img src="https://cdn.rawgit.com/compute-io/gammainc/edb25812443645fa97017137b1f84708a84cea2c/docs/img/eqn4.svg" alt="Equation for the unregularized upper incomplete gamma function.">
<br>
</div>

The relationship between the two functions is `γ(a,x) + Γ(a,x) = Γ(a)`.


## Installation

``` bash
$ npm install @toshiara/special-gammainc
```


## Usage

``` javascript
// for CommonJs
const { gammainc } = require('@toshiara/special-gammainc');

// for ES Modules
import { gammainc } from '@toshiara/special-gammainc';
```

### gammainc(x, a[, options])


The domain of the function are the non-negative real numbers for `x`
 and the positve real numbers for `a`.
If supplied a value outside the domain,
 the function returns `NaN`.
For both the regularized and unregularized versions
 of the incomplete gamma function,
 in this implementation the first argument is `x`
 and the second argument is the scale factor `a`.

The function accepts the following `options`:

* __lower__:`boolean` indicating whether to evaluate
  the *lower* (`true`) or *upper* (`false`) incomplete gamma function.
  Default: `true`.
* __regularized__: `boolean` indicating if the `function` should compute
  the *regularized* (`true`) or *unregularized* (`false`)
  incomplete gamma functions. Default: `true`.

By default, the function evaluates
 the *lower* regularized incomplete gamma function, `P(x,a)`.
To evaluate the *upper* function instead,
 i.e. `Q(x,a)`, set the `lower` option to `false`.


```javascript
//// Regularized
gammainc(9, 3);
// returns 0.9937678048936227

gammainc(9, 3, { lower: false });
// returns 0.006232195106377313
```

```javascript
//// Unregularized
gammainc(9, 3, { regularized: false });
// returns 1.9875356097872454

gammainc(9, 3, { lower: false, regularized: false });
// returns 0.012464390212754625
```

## Notes

If an element is __not__ a numeric value, the returned value  is `NaN`.

``` javascript
gammainc(null, 1);
// returns NaN
```


## Implementation

All of the four functions (regularized and non-regularized, upper and lower)
 share a common implementation
 as they are all related to each other
 (see the [Boost C++ library documentation](http://www.boost.org/doc/libs/1_35_0/libs/math/doc/sf_and_dist/html/math_toolkit/special/sf_gamma/igamma.html)
 for a good discussion of the functions and implementation strategies).

To evaluate the regularized *lower* incomplete gamma function,
 this package uses the following representation of the integral
 as a power series in its implementation:

<div class="equation" align="center" data-raw-text="
P(x, a) = \frac{1}{\Gamma(a)}\sum_{k=0}^\infty \frac{x^a e^{-x} x^k}{a(a+1)...(a+k)} " data-equation="eq:power_series">
<img src="https://cdn.rawgit.com/compute-io/gammainc/f38461aaa66adafa47885a4f79ef393d8d140bdc/docs/img/eqn5.svg" alt="Power series representation for the lower incomplete gamma function.">
<br>
</div>

This series is evaluated for all inputs `x` and `s` unless `x > 1.1` and `x > s`,
 in which case the function is evaluated using the upper incomplete gamma function
 as `P(x,s) = 1 - Q(x,s)`.
To evaluate the upper incomplete gamma function,
 [Gauss' continued fraction expansion](https://en.wikipedia.org/wiki/Gauss%27s_continued_fraction) is used:

<div class="equation" align="center" data-raw-text="Q(x, a) = \frac{1}{\Gamma(a)}\cfrac{x^a e^{-x}}{1+x-a+ \cfrac{a-1}{3+x-a+ \cfrac{2(a-2)}{5+x-a+ \cfrac{3(a-3)} {7+x-a+ \cfrac{4(a-4)}{9+x-a+ \ddots}}}}} " data-equation="eq:continued_fraction">
<img src="https://cdn.rawgit.com/compute-io/gammainc/f38461aaa66adafa47885a4f79ef393d8d140bdc/docs/img/eqn6.svg" alt="Continued fraction expansion for the upper incomplete gamma function.">
<br>
</div>

To compute the continued fractions,
 the modified Lentz's method is implemented.
For a discussion of this method,
 see section 5.2 of "Numerical Recipes in C (2nd Ed.):
 The Art of Scientific Computing".

### References
- Lentz, W. J. (1976). Generating bessel functions in mie scattering calculations using continued fractions. Applied Optics, 15(3), 668–671. doi:10.1364/AO.15.000668
- William H. Press, Saul A. Teukolsky, William T. Vetterling, and Brian P. Flannery. 1992. Numerical Recipes in C (2nd Ed.): The Art of Scientific Computing. Cambridge University Press, New York, NY, USA.


## License
[MIT license](http://opensource.org/licenses/MIT).


## Copyright
Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.

