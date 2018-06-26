import React, { Component } from 'react'

import { connect } from 'react-redux'
import { updateCard, getDeck } from '../../redux/decksReducer'

import { Redirect } from 'react-router-dom'

import QualityGetter from './components/QualityGetter';
import Card from './components/Card';

import './index.css'
// import ProgressBar from '../../components/ProgressBar';
import ReviewProgress from './components/ReviewProgress'

class ReviewSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0,
            isCardFlipped: false,
            wasAnswerRevealed: false,
            lastAvailableLen: 0,
            initialCardsNum: 0,       // This will be used to get percentage
            currentCardsNum: 0        // This will be used to get percentage
        }
    }

    componentDidMount() {
        if (!Object.keys(this.props.deck).length) {
            return
        } else {
            this.setState({
                lastAvailableLen: this.props.deck.inQueue.len,
                initialCardsNum: this.props.deck.inQueue.len,
            })
        }
    }

    handleQRes = (len, cardId, quality) => {
        // Handles what happens when a certain quality is given so that it does not break
        const { deckId } = this.props.location.state
        this.props.updateCard(deckId, cardId, quality)
        if (quality > 3) {
            this.setState(prevState => ({
                lastAvailableLen: prevState.lastAvailableLen - 1,
                currentCardsNum: prevState.currentCardsNum + 1,
            }))
            if (this.state.currentIndex + 1 >= len - 1) {
                this.setState({ currentIndex: 0 })
            }
            this.setState({ isCardFlipped: false, wasAnswerRevealed: false })
        } else {
            if (this.state.currentIndex + 1 <= len - 1) {
                this.setState(prevState => ({
                    currentIndex: prevState.currentIndex + 1,
                    isCardFlipped: false,
                    wasAnswerRevealed: false
                }))
            } else {
                this.setState({ currentIndex: 0, isCardFlipped: false, wasAnswerRevealed: false })
            }
        }
    }

    handleFlip = () => {
        this.setState(prevState => ({
            isCardFlipped: !prevState.isCardFlipped,
            wasAnswerRevealed: true
        }))
    }

    render() {
        if (!Object.keys(this.props.deck).length) {
            return <Redirect exact to={`/${this.props.location.state.deckId}`} />
        }
        const deck = this.props.deck
        const { 
            initialCardsNum, 
            currentCardsNum, 
            isCardFlipped, 
            wasAnswerRevealed 
        } = this.state
        let availableCards
        if (Object.keys(deck).length) {
            if (deck.inQueue.cards) {
                availableCards = [...deck.inQueue.newCards, ...deck.inQueue.reviews]
            }
        }
        const card = availableCards ? availableCards[this.state.currentIndex] : null
        return (
            <div className="review-session__wrapper">
                {
                    deck && card &&
                    <Card {...card} handleFlip={this.handleFlip} isCardFlipped={isCardFlipped} />
                }
                {
                    card &&
                    <div className="review__status-and-controls">
                        <ReviewProgress
                            className="progresss"
                            percentage={ (currentCardsNum / initialCardsNum) * 100 }
                        />
                        <QualityGetter
                            handleQRes={this.handleQRes}
                            len={availableCards.length}
                            id={card._id}
                            wasAnswerRevealed={wasAnswerRevealed}
                            handleFlip={this.handleFlip}
                        />
                    </div>
                }
                {
                    !card &&
                    <div className="utility-wrapper">
                        <h1>Finished review.</h1>
                    </div>
                }
            </div>
        );
    }
}

export default connect(state => ({ deck: state.deckData.deck }), { updateCard, getDeck })(ReviewSession)