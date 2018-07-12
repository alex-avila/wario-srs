const express = require('express')
const deckRoutes = express.Router()
const Deck = require('../models/deck')
const csv = require('csv')

const handleRes = (err, res, data, method = '') => {
    if (err) return res.status(500).send(err)
    return res.status(method === 'POST' ? 201 : 200).send(data)
}

deckRoutes.route('/')
    .get((req, res) => {
        Deck.find((err, decks) => handleRes(err, res, decks))
    })
    .post((req, res) => {
        if (req.files) {
            const csvFile = req.files.file
            const { name, description } = req.body
            csv.parse(csvFile.data, (err, data) => {
                const cards = data.reduce((final, row) => {
                    final.push(
                        row.reduce((final, item) => {
                            if (row.indexOf(item) === 0) {
                                return { ...final, question: item }
                            } else {
                                return { ...final, answer: item }
                            }
                        }, {})
                    )
                    return final
                }, [])
                const deck = new Deck({cards, name, description})
                deck.save((err, savedDeck) => handleRes(err, res, savedDeck, req.method))
            })
        } else {
            const deck = new Deck(req.body)
            deck.save((err, savedDeck) => handleRes(err, res, savedDeck, req.method))
        }

    })

deckRoutes.route('/:deckId')
    .get((req, res) => {
        Deck.findById(req.params.deckId, (err, foundDeck) => {
            foundDeck.save((err, savedDeck) => {
                handleRes(err, res, savedDeck)
            })
        })
    })
    .delete((req, res) => {
        Deck.findByIdAndRemove(req.params.deckId, (err, deletedDeck) => handleRes(err, res, deletedDeck))
    })

deckRoutes.use('/:deckId/cards', require('./cardRoutes'))

module.exports = deckRoutes