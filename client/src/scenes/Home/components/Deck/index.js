import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import ProgressBar from '../../../../components/ProgressBar'

import './index.css'

class Deck extends Component {
    render() {
        const seen = this.props.cards.reduce((final, card) => {
            return card.hasBeenSeen ? final + 1 : final
        }, 0)
        const percentage = (seen / this.props.cards.length) * 100
        const { _id, name } = this.props
        return (
            <Link to={_id} className="deck-item">
                <div className="deck-item__wrapper">
                    <div id={_id}>
                        <h3>{name}</h3>
                    </div>
                    <ProgressBar percentage={percentage} />
                </div>
            </Link>
        );
    }
}

export default Deck