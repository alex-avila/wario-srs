import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getDecks } from '../../redux/decksReducer'

import Deck from './components/Deck';

import './index.css'

class Decks extends Component {
    componentDidMount() {
        this.props.getDecks()
    }

    render() {
        const { decks } = this.props
        const mappedDecks = decks
            .map(deck => <Deck key={deck._id} {...deck} />)
        return (
            <section className="decks-list">
                <h2 className="utility-wrapper">Decks</h2>
                <div className="decks-list__wrapper utility-wrapper">
                    {mappedDecks}
                </div>
            </section>
        )
    }
}

export default connect(state => ({ decks: state.deckData.decks }), { getDecks })(Decks);