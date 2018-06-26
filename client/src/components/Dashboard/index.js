import React, { Component } from 'react'
import moment from 'moment'

import './index.css'
import ProgressBar from '../ProgressBar';

class Dashboard extends Component {
    render() {
        const { cards } = this.props
        const { availableNow, nextDay, nextReview } = this.props.dashboardData
        let percentage = 0
        let momentDate = 'never'
        const areReviewsReady = new Date(nextReview).getUTCDate() === new Date(Date.now()).getUTCDate()
        // reviews are ready but there are none available
        if (areReviewsReady && availableNow === 0) {
            momentDate = 'in a day'
        } else if (areReviewsReady) {
            momentDate = 'available now'
        } else {
            if (cards.length) {
                momentDate = moment(nextReview).fromNow()
            } else {
                momentDate = 'never'
            }
        }
        const seen = this.props.cards.reduce((final, card) => {
            return card.hasBeenSeen ? final + 1 : final
        }, 0)
        percentage = (seen / this.props.cards.length) * 100
        return (
            <div className="dashboard">
                <h3>Dashboard</h3>
                <div className="dashboard__wrapper">
                    <div>
                        <span>
                            {
                                new Date(nextReview) > Date.now() || !cards.length || new Date(nextReview).getUTCDate() === new Date(Date.now()).getUTCDate() ?
                                    momentDate.slice(0, 1).toUpperCase() + momentDate.slice(1) :
                                    'Available Now'
                            }
                        </span>
                        <p>Next Review</p>
                    </div>
                    <div>
                        <span>{availableNow ? availableNow : 0}</span>
                        <p>Available Now</p>
                    </div>
                    <div>
                        <span>{nextDay ? nextDay : 0}</span>
                        <p>Next Day</p>
                    </div>
                </div>
                <h4>
                    Percentage of cards studied <small>({percentage !== 0 && percentage < 1 ?
                        '<1' : Math.round(percentage)}%)</small>
                </h4>
                <ProgressBar percentage={percentage} />
            </div>
        );
    }
}

export default Dashboard;