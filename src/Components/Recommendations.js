import React, { Component } from 'react';

class Recommendations extends Component {

    render() {
        return (
            <div>
                <div className = "middleBox">
                <div className="unread">
                    <p><strong>{this.props.symbol} News from Past 24-Hours: </strong>{this.props.newsArticles.length}</p>
                </div>

                <div className="artPos">
                    <p><strong>News Positively Affecting {this.props.symbol}: </strong>{Math.abs(this.props.positive)}</p>
                </div>

                <div className="artNeg">
                    <p><strong>News Negatively Affecting {this.props.symbol}: </strong>{Math.abs(this.props.negative)}</p>
                </div>

                <div className="artNeut">
                    <p><strong>Neutral News: </strong>{this.props.neutral}</p>
                </div>

                <div className="artOverall">
                    <p><strong>Average Impact on Stock Today: </strong>{this.props.stockPrediction}</p>
                </div>
                </div>
            </div>


        )
    }
}

export default Recommendations;