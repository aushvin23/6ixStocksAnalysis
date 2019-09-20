import React, { Component } from 'react';

class Recommendations extends Component {

    render() {
        return (
            <div>
                <div className="unread">
                    <p>{this.props.symbol} News from Past 24-Hours</p>
                    <p>{this.props.newsArticles.length}</p>
                </div>

                <div className="artPos">
                    <p>News Positively Affecting {this.props.symbol}: </p>
                    <p>{Math.abs(this.props.positive)}</p>
                </div>

                <div className="artNeg">
                    <p>News Negatively Affecting {this.props.symbol}: </p>
                    <p>{Math.abs(this.props.negative)}</p>
                </div>

                <div className="artNeut">
                    <p>Neutral News:</p>
                    <p>{this.props.neutral}</p>
                </div>

                <div className="artOverall">
                    <p>Average Impact on Stock Today: </p>
                    <p>{this.props.stockPrediction}</p>
                </div>
            </div>


        )
    }
}

export default Recommendations;