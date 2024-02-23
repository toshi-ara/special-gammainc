import { gammainc } from "../dist/esm/index.js";


describe("gammainc functions", () => {
    let digits = 16;

    it("Check gammainc function (regularized)", () => {
        // results by gamma_inc function in Julia SpecialFunction package
        expect(gammainc(9, 3)).toBeCloseTo(0.9937678048936227, digits);
        expect(gammainc(9, 3, {
            upper: true
        })).toBeCloseTo(0.006232195106377318, digits);
    });

    it("Check gammainc function (unregularized)", () => {
        // results by gamma_inc function in Julia SpecialFunction package
        expect(gammainc(9, 3, {
            regularized: false
        })).toBeCloseTo(1.9875356097872454, digits);
        expect(gammainc(9, 3, {
            upper: true,
            regularized: false
        })).toBeCloseTo(0.012464390212754636, digits);
    });
});

