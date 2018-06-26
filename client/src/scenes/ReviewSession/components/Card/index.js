import React, { Component } from 'react';

import './index.css'

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNewCard: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.question !== this.props.question) {
            this.setState({ isNewCard: true })
        } else if (this.state.isNewCard) {
            this.setState({ isNewCard: false })
        }
    }

    render() {
        const { question, answer, handleFlip, isCardFlipped } = this.props
        const { isNewCard } = this.state
        return (
            <div className="card__wrapper">
                <div className={isCardFlipped ? "card flipped" : "card"} onClick={handleFlip}>
                    <div className="card__side card__back" >
                        <p style={isNewCard ? { animation: 'fadeIn 0.5s ease-in' } : null}>{question}</p>
                    </div>
                    <div className="card__side card__front" >
                        <p style={isNewCard ? { animation: 'fadeIn 0.5s ease-in' } : null}>{answer}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;