var romanToInt = function(romanNumeral) {
    let result = 0;

    const values = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    for (let i = 0; i < romanNumeral.length; i++) {
        if (values[romanNumeral[i]] < values[romanNumeral[i + 1]]) {
            result -= values[romanNumeral[i]];
        } else {
            result += values[romanNumeral[i]];
        }
    }

    return result;
};