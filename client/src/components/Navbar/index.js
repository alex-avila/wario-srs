import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import addIcon from '../../icons/add.svg'

import './index.css'

class Navbar extends Component {
    render() {
        return (
            <nav className="header__nav">
                <div className="nav__wrapper utility-wrapper">
                    <Link to="/" className="nav__to-home">
                        <div className="nav__logo">WARIO ANKI</div>
                    </Link>
                    <div className="nav__actions">
                        <div
                            className="nav__action"
                            onClick={() => this.props.handleShowModal('upload')}
                        >
                            UPLOAD
                        </div>
                        <div
                            className="nav__action"
                            onClick={() => this.props.handleShowModal('add')}
                        >
                            <img className="add-icon" src={addIcon} alt="Add icon." />
                            NEW
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar