import React, { Component } from 'react'

import { Switch, Route, withRouter } from 'react-router-dom'

import Navbar from './components/Navbar'
import Decks from './scenes/Home'
import DeckDetails from './scenes/DeckDetails'
import ReviewSession from './scenes/ReviewSession'
import AddModal from './components/AddModal'
import UploadModal from './components/UploadModal'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAddModalOn: false,
            isUploadModalOn: false,
            isHome: true
        }
    }

    // Component DidMount and WillReceiveProps will work with 
    // withRouter props to check if we are home currently
    componentDidMount() {
        const { pathname } = this.props.location
        if (pathname !== '/') {
            this.setState({ isHome: false })
        } else {
            this.setState({ isHome: true })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { pathname } = this.props.location
        const { pathname: newPathname } = nextProps.location
        if (pathname !== newPathname) {
            if (newPathname !== '/') {
                this.setState({ isHome: false })
            } else {
                this.setState({ isHome: true })
            }
        }
    }

    handleShowModal = mode => {
        if (mode === 'add') {
            this.setState({ isAddModalOn: true })
        } else if (mode === 'upload') {
            this.setState({ isUploadModalOn: true })
        }
    }

    handleHideModal = e => {
        if (!e) {
            // I have this first check to make modal hide when the
            // ADD btn is clicked on the the AddDeckModal component
            this.setState({ isUploadModalOn: false, isAddModalOn: false })
        } else if (e.target.id === 'background') {
            this.setState({ isUploadModalOn: false, isAddModalOn: false })
        }
    }

    render() {
        return (
            <div className="wrapper">
                <Navbar handleShowModal={this.handleShowModal} />
                <AddModal
                    isModalOn={this.state.isAddModalOn}
                    handleHideModal={this.handleHideModal}
                    newDeck={this.state.isHome}
                    deckId={this.props.location.pathname}
                />
                <UploadModal
                    isModalOn={this.state.isUploadModalOn}
                    handleHideModal={this.handleHideModal}
                />
                <Switch>
                    <Route exact path="/" component={Decks} />
                    <Route exact path="/:id" component={DeckDetails} />
                    <Route exact path="/:id/review-session" component={ReviewSession} />
                </Switch>
                {/* Footer */}
            </div>
        )
    }
}

export default withRouter(App)
