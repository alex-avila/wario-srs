const mongoose = require('mongoose')
const { Schema } = mongoose

const cardSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    repetition: {
        type: Number,
        required: true,
        default: 1
    },
    eFactor: {
        type: Number,
        required: true,
        default: 2.5
    },
    availableDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    hasBeenSeen: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const deckSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    cards: [cardSchema],
    inQueue: {
        newCards: [],
        reviews: [],
        cards: [],
        len: {
            type: Number,
            default: 0
        }
    },
    dashboardData: {
        availableNow: Number,
        nextDay: Number,
        nextReview: Date
    },
    settings: {
        newCards: {
            perDay: {
                type: Number,
                default: 10
            }
        },
        reviews: {
            perDay: {
                type: Number,
                default: 20
            }
        }
    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

deckSchema.pre('save', function (next) {
    if (this.isNew || new Date(this.lastUpdated).getDate() !== new Date(Date.now()).getDate()) {
        if (this.cards.length) {
            const cardsInQueue = this.cards.filter(card => new Date(card.availableDate) <= Date.now())
            this.inQueue.newCards = cardsInQueue.filter(card => !card.hasBeenSeen).slice(0, this.settings.newCards.perDay)
            this.inQueue.reviews = cardsInQueue.filter(card => card.hasBeenSeen).slice(0, this.settings.reviews.perDay)
            this.inQueue.len = this.inQueue.newCards.length + this.inQueue.reviews.length
            this.lastUpdated = Date.now()
            const nextDayLen = this.cards.filter(card => {
                const cardDate = new Date(card.availableDate).getDate()
                const tomorrowDate = new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 1)).getDate()
                return cardDate >= tomorrowDate
            }).length
            if (cardsInQueue.filter(card => !card.hasBeenSeen).length >= 10) {
                this.dashboardData.nextDay = nextDayLen + 10
            } else {
                this.dashboardData.nextDay = nextDayLen + cardsInQueue.filter(card => !card.hasBeenSeen).length
            }
            this.dashboardData.nextReview = this.cards.sort((a, b) => {
                return new Date(a.availableDate).getDate() > new Date(b.availableDate).getDate()
            })[0].availableDate
        }

    }
    if (this.$addedManually) {
        this.inQueue.newCards.push(this.cards[this.cards.length - 1])
        this.inQueue.len = this.inQueue.newCards.length
        this.lastUpdated = Date.now()
        this.dashboardData.nextReview = this.cards.sort((a, b) => {
            return new Date(a.availableDate).getDate() > new Date(b.availableDate).getDate()
        })[0].availableDate
        const imSorryForThisVariableName = this.cards.filter(card => {
            const cardDate = new Date(card.availableDate).getDate()
            const tomorrowDate = new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 1)).getDate()
            return cardDate >= tomorrowDate
        }).length
        const imSorryForThisOneToo = this.cards.filter(card => new Date(card.availableDate) <= Date.now())
        if (imSorryForThisOneToo.filter(card => !card.hasBeenSeen).length >= 10) {
            this.dashboardData.nextDay = imSorryForThisVariableName + 10
        } else {
            this.dashboardData.nextDay = imSorryForThisVariableName + imSorryForThisOneToo.filter(card => !card.hasBeenSeen).length
        }
    }
    // console.log(this.dashboardData.nextReview)
    this.dashboardData.availableNow = this.inQueue.len
    next()
})

deckSchema.pre('save', function () {
    if (this.$card && this.$quality > 3) {
        if (this.inQueue.newCards.findIndex(card => card.question === this.$card.question) !== -1) {
            this.inQueue.newCards.splice(this.inQueue.newCards.findIndex(card => card.question === this.$card.question), 1)
        } else {
            this.inQueue.reviews.splice(this.inQueue.reviews.indexOf(this.$card), 1)
        }
        this.inQueue.len = this.inQueue.newCards.length + this.inQueue.reviews.length

        // this.dashboardData.availableNow = this.inQueue.len
        const nextDayLen = this.cards.filter(card => {
            const cardDate = new Date(card.availableDate).getDate()
            const tomorrowDate = new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 1)).getDate()
            return cardDate >= tomorrowDate
        }).length
        if (this.cards.filter(card => new Date(card.availableDate) <= Date.now()).filter(card => !card.hasBeenSeen).length >= 10) {
            this.dashboardData.nextDay = nextDayLen + 10
        } else {
            this.dashboardData.nextDay = nextDayLen + cardsInQueue.filter(card => !card.hasBeenSeen).length
        }
        this.dashboardData.nextReview = this.cards.sort((a, b) => {
            return new Date(a.availableDate).getDate() > new Date(b.availableDate).getDate()
        })[0].availableDate
    }
    this.dashboardData.availableNow = this.inQueue.len
})

module.exports = mongoose.model('Deck', deckSchema)