/**
 * Calculates new "easiness factor" (A.K.A. EF) depending on the quality
 * response and current EF and if new EF is less than 1.3 then sets EF
 * equal to 1.3. Uses a formula created by SuperMemo 2 creator
 * @param {number} q - 0-5 scale for quality of repetition response (5 = best, 0 = worst)
 * @param {number} ef - Current EF
 */
const calcEF = (q, ef = 2.5) => {
    const newEF = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    return newEF >= 1.3 ? newEF : 1.3
}

// /**
//  * SuperMemo 2 algorithm that calculates the inter-repetition interval
//  * @param {number} i - n-th repetition
//  * @param {number} eF - Easiness factor
//  */
const calcInterval = (i, eFactor) => {
    if (i === 1) {
        return 1
    } else if (i === 2) {
        return 6
    } else if (i > 2) {
        return Math.floor(calcInterval(i - 1, eFactor) * eFactor)
    } else {
        return 0
    }
}

module.exports = {
    calcInterval,
    calcEF
}


// SUPERMEMO 2 //
// 1 //
// if repetition is 1, interval is 1
// if repetition is 2, interval is 6
// for repetition > 2, interval is (repetition - 1) * easinessFactor
// if interval is a fraction, round it up to the nearest integer
// 2 //
// Asses quality of repetition response with 0-5 grade scale
    // 5 = perfect
    // 4 = correct with hesitation
    // 3 = correct with difficulty
    // 2 = incorrect; correct one easy to recall
    // 1 = incorrect; correct one remembered
    // 0 = complete blackout
// 3 //
// After each repetition modify EF
// 4 //
// If the quality of the response was lower than 3, start repetitions for
// the item from the beginning w/out changing the EF
// (i.e. use intervals I(1) and I(2), etc.)
// 5 //
// After each repetition session of a given day repeat again all items
// that scored below four in the quality assessment. Continue repetitions
// until all of these items score at least four.
// In other words, continue review session until all items score at least four
