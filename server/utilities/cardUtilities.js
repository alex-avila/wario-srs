const { calcEF, calcInterval } = require('../supermemo/supermemo2')

const getNewDate = (availableDate, interval) => {
    let date = new Date(availableDate)
    if (date < Date.now()) {
        date = new Date(Date.now())
    }
    date.setUTCDate(date.getUTCDate() + interval)
    return date
}

const getDateAndRepetition = (quality, repetition, oldDate, interval) => {
    // Set new review date
    let newDate
    let newRepetition
    // Card is only given new date if quality is 4 or 5
    if (quality > 3) {
        newDate = getNewDate(oldDate, interval)
        newRepetition = repetition + 1
    } else if (quality === 3) {
        newRepetition = repetition
    } else if (quality < 3) {
        newRepetition = 1
    }
    return [newDate || oldDate, newRepetition]
}

const getIntervalAndEF = (quality, eFactor, repetition) => {
    return [calcEF(quality, eFactor), calcInterval(repetition, eFactor)]
}

module.exports = {
    getDateAndRepetition,
    getIntervalAndEF
}
