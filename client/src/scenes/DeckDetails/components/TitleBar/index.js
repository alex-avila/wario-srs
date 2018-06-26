import React, { Component } from 'react';

import settingsIcon from '../../../../icons/settings.svg'

import './index.css'

class TitleBar extends Component {
    render() {
        const { deckName, isDropdownOn, handleDelete } = this.props
        return (
            <div className="name-wrapper">
                <div className="name-wrapper--inner">
                    <h2>{deckName}</h2>
                    <div className="deck__settings">
                        <div
                            className={
                                isDropdownOn ?
                                    'settings__dropdown dropdown-show' :
                                    'settings__dropdown'
                            }
                        >
                            <span onClick={handleDelete}>Delete</span>
                        </div>
                        <img
                            className="settings__icon"
                            id="settings__icon"
                            src={settingsIcon}
                            alt="Settings icon"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default TitleBar;