import React, { Component } from 'react';

//General Stock Info Component
class Main extends Component {

    render() {
        return(
            <div className="stockSummary">
                <img className = "logo" src={`https://financialmodelingprep.com/images-New-jpg/${this.props.symbol}.jpg`} alt="" />
                <div className="stockSummaryTitleContainer">
                    <h2 className = "stockName">{this.props.stockArray["01. symbol"]}  ( {`${parseFloat(this.props.stockArray["10. change percent"]).toFixed(2)}%`} ) </h2>
                </div>
                <div className = "stockSummaryLeftBox">
                <div className="price">
                    <p><strong>Real-Time Price: </strong>{`$${Number(this.props.stockArray["05. price"]).toFixed(2)}`}</p>
                </div>

                <div className="open">
                    <p><strong>Open: </strong>{`$${Number(this.props.stockArray["02. open"]).toFixed(2)}`}</p>
                </div>

                <div className="high">
                    <p><strong>High: </strong>{`$${Number(this.props.stockArray["03. high"]).toFixed(2)}`}</p>
                </div>

                <div className="low">
                    <p><strong>Low: </strong>{`$${Number(this.props.stockArray["04. low"]).toFixed(2)}`}</p>
                </div>

                <div className="close">
                    <p><strong>Previous Close: </strong>{`$${Number(this.props.stockArray["08. previous close"]).toFixed(2)}`}</p>
                </div>

                <div className="volume">
                    <p><strong>Volume: </strong>{this.props.stockArray["06. volume"]}</p>
                </div>

                <div className="day">
                    <p><strong>Date: </strong>{this.props.stockArray["07. latest trading day"]}</p>
                </div>

                <div className="change">
                    <p><strong>Change: </strong>{`$${Number(this.props.stockArray["09. change"]).toFixed(2)}`}</p>
                </div>
                </div>
            </div>
        )
    }
}

export default Main;