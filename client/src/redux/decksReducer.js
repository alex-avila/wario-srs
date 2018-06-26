import axios from 'axios'

const initialState = {
    decks: [],
    deck: {}
}

export const getDecks = () => {
    return dispatch => {
        axios.get('/decks').then(response => {
            dispatch({
                type: 'GET_DECKS',
                decks: response.data
            })
        })
    }
}

export const getDeck = id => {
    return dispatch => {
        axios.get('/decks/' + id).then(response => {
            dispatch({
                type: 'GET_DECK',
                deck: response.data
            })
        })
    }
}

export const updateCard = (deckId, cardId, body) => {
    return dispatch => {
        axios.put(`/decks/${deckId}/cards/${cardId}`, { quality: body }).then(response => {
            dispatch(getDeck(deckId))
        })
    }
}

export const addDeck = body => {
    return dispatch => {
        axios.post('/decks', body).then(response => {
            dispatch(getDecks())
        })
    }
}

export const addCard = (id, body, addedManually = false) => {
    return dispatch => {
        axios.put(`/decks/${id}/cards`, {body, addedManually}).then(response => {
            dispatch(getDeck(id))
        })
    }
}

export const uploadCSV = body => {
    return dispatch => {
        axios.post(`/decks/`, body).then(response => {
            dispatch(getDecks())
        })
    }
}

export const deleteDeck = id => {
    return dispatch => {
        axios.delete('/decks/' + id).then(response => {
            dispatch(getDecks())
        })
    }
}

export const getCardsPerDeck = (id, cards) => {
    return {
        type: 'GET_CARDS_PER_DECK',
        id,
        cards
    }
}

const decksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DECKS':
            return { ...state, decks: action.decks }
        case 'GET_DECK':
            return { ...state, deck: action.deck }
        case 'GET_CARDS_PER_DECK':
            return {
                ...state,
                cardsPerDeck: {
                    ...state.cardsPerDeck,
                    [action.id]: action.cards
                }
            }
        default:
            return state
    }
}

export default decksReducer
