import React, { Component } from 'react';

import Button from '../../../../components/Button'

import './index.css'

class QualityGetter extends Component {

    render() {
        const { handleQRes, len, id, wasAnswerRevealed, handleFlip } = this.props
        return (
            <div>
                {
                    wasAnswerRevealed ?
                        <div className="quality-getter">
                            <Button
                                onClick={() => handleQRes(len, id, 1)}
                            >
                                1
                            </Button>
                            <Button
                                onClick={() => handleQRes(len, id, 2)}
                            >
                                2
                            </Button>
                            <Button
                                onClick={() => handleQRes(len, id, 3)}
                            >
                                3
                            </Button>
                            <Button
                                onClick={() => handleQRes(len, id, 4)}
                            >
                                4
                            </Button>
                            <Button
                                onClick={() => handleQRes(len, id, 5)}
                            >
                                5
                            </Button>
                        </div> :
                        <div className="quality-getter__reveal" onClick={handleFlip}>
                            REVEAL ANSWER
                        </div>
                }
            </div>
        );
    }
}

export default QualityGetter;