import React, { Component } from 'react';

//General Stock Info Component
class Main extends Component {

    render() {
        return(
            <div className="stockSummary">

                <div className="stockSummaryTitleContainer">
                    <img src={`https://financialmodelingprep.com/images-New-jpg/${this.props.symbol}.jpg`} alt="" />
                    <h2>{this.props.stockArray["01. symbol"]}  ( {`${parseFloat(this.props.stockArray["10. change percent"]).toFixed(2)}%`} ) </h2>
                </div>

                <div className="price">
                    <p>Real-Time Price</p>
                    <p>{`$${Number(this.props.stockArray["05. price"]).toFixed(2)}`}</p>
                </div>

                <div className="open">
                    <p>Open</p>
                    <p>{`$${Number(this.props.stockArray["02. open"]).toFixed(2)}`}</p>
                </div>

                <div className="high">
                    <p>High</p>
                    <p>{`$${Number(this.props.stockArray["03. high"]).toFixed(2)}`}</p>
                </div>

                <div className="low">
                    <p>Low</p>
                    <p>{`$${Number(this.props.stockArray["04. low"]).toFixed(2)}`}</p>
                </div>

                <div className="close">
                    <p>Previous Close</p>
                    <p>{`$${Number(this.props.stockArray["08. previous close"]).toFixed(2)}`}</p>
                </div>

                <div className="volume">
                    <p>Volume</p>
                    <p>{this.props.stockArray["06. volume"]}</p>
                </div>

                <div className="day">
                    <p>Date</p>
                    <p>{this.props.stockArray["07. latest trading day"]}</p>
                </div>

                <div className="change">
                    <p>Change</p>
                    <p>{`$${Number(this.props.stockArray["09. change"]).toFixed(2)}`}</p>
                </div>
                
            </div>
        )
    }
}

export default Main;