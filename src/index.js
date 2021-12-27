// index.js

const units = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",

    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
];

const dozens = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
];

const scales = [
    "",
    "thousand",
    "million",
    "billion",
    // the largest number that can be translated with the used technique is
    // (2**31)*10-1 = 21474836479
    "trillion", // -> doesn't really work due to integer overflow
    "quadrillion",
    "quintillion",
    "sextillion",
    /* . . . */
];

function select(n, mod, div, numerals, text) {
    const m = n % mod;
    if (m > 0) {
        text.unshift(numerals[m]);
    }
    return (n / div) | 0;
}

function unit(n, text) {
    return select(n, 10, 10, units, text);
}

function dozen(n, text) {
    if (n % 100 < 20) {
        n = select(n, 20, 100, units, text);
    } else {
        n = unit(n, text);
        n = select(n, 10, 10, dozens, text);
    }
    return n;
}

function hundred(n, text) {
    n = dozen(n, text);
    if (n % 10 > 0) {
        text.unshift("hundred");
        n = unit(n, text);
    } else {
        n = (n / 10) | 0;
    }
    return n;
}

function hrn(n, scale, text) {
    if (n > 0) {
        n = hundred(n, text);
        if (n % 1000 > 0) {
            text.unshift(scales[scale]);
        }
        if (n === 0) return text;
        return hrn(n, scale + 1, text);
    } else if (n < 0) {
        text.unshift("minus");
        return hrn(-n, text);
    } else {
        text.unshift(units[n]);
    }
    return text;
}

function toReadable(number) {
    return hrn(number, 1, []).join(" ");
}

module.exports = toReadable;

// console.log(toReadable(9991));
// console.log(toReadable(1000111));
// console.log(toReadable(987654321));
// console.log(toReadable(1000000000));
// console.log(toReadable(1000000001));
// console.log(toReadable(2 ** 32));
// console.log(toReadable(10000000000));
// console.log(toReadable(21474836479));
// console.log(toReadable(2 ** 31 * 10 - 1));
// console.log(toReadable(2 ** 31 * 10)); // <- error due to integer overflow

//__EOF__
