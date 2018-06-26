import React, { Component } from 'react';

import './index.css'

class Button extends Component {
    render() {
        const { children, rounded, onClick } = this.props
        return (
            <button onClick={onClick} className="utility-btn" style={rounded ? { borderRadius: 100 } : null}>
                {children}
            </button>
        );
    }
}

export default Button;