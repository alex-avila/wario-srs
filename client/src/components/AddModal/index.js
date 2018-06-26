import React, { Component } from 'react';

import { connect } from 'react-redux'
import { addDeck, addCard } from '../../redux/decksReducer'

import './index.css'
import Button from '../Button';

class AddDeckModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                valOne: '',
                valTwo: '',
            },
            cardsAdded: 0
        }
        this.initialState = this.state
    }

    handleAdd = () => {
        // if newDeck we're in ADD DECK mode else we're in ADD CARD mode
        const { valOne, valTwo } = this.state.inputs
        if (this.props.newDeck) {
            this.props.addDeck({ name: valOne, description: valTwo })
            this.props.handleHideModal()
            this.setState(this.initialState)
        } else {
            const deckId = this.props.deckId.slice(1)
            // id, new card, and true means that it was added manually
            this.props.addCard(deckId, { cards: [{ question: valOne, answer: valTwo }] }, true)
            this.setState(this.initialState)
        }
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                [name]: value
            }
        }))
    }

    render() {
        const { isModalOn, newDeck, handleHideModal } = this.props
        let modalClasses = "add-deck-modal"
        if (isModalOn) {
            modalClasses += " modal__show"
        }
        const { valOne, valTwo } = this.state.inputs
        return (
            <div
                id="background"
                className={modalClasses}
                onClick={handleHideModal}
            >
                <div className="add-deck-modal__wrapper">
                    <input
                        name="valOne"
                        value={valOne}
                        type="text"
                        placeholder={newDeck ? "Name" : "Question"}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    {
                        newDeck ?
                            <textarea
                                name="valTwo"
                                value={valTwo}
                                type="text"
                                placeholder="Describe this deck..."
                                onChange={this.handleChange}
                                autoComplete="off"
                            /> :
                            <div>
                                <input
                                    name="valTwo"
                                    value={valTwo}
                                    type="text"
                                    placeholder="Answer"
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                />
                                {/* <p>Added = {this.state.cardsAdded}</p> */}
                            </div>
                    }
                    <Button rounded onClick={this.handleAdd}>ADD {newDeck ? 'DECK' : 'CARD'}</Button>
                </div>
            </div>
        );
    }
}

export default connect(state => ({ deck: state.deckData.deck }), { addDeck, addCard })(AddDeckModal)