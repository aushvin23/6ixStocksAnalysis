import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';
import Main from './Components/Main';
import SearchBar from './Components/SearchBar';
import AutoFillDropDown from './Components/AutoFillDropDown';
import Graph from './Components/Graph';
import { VictoryChart } from 'victory';
import { VictoryGroup } from 'victory';
import { VictoryArea } from 'victory';
import { VictoryAxis } from 'victory';
import { VictoryLabel } from 'victory';

class App extends Component {
  constructor() {
    super();
    this.state = {
      //userInput to search stock
      userInput: '',
      //use userInput to pull best matches to stocks from API
      bestMatches: [],
      //stock symbol to search new articles and pull graph
      symbol: '',
      //basic information on the stock
      stockArray: [],
      //news articles sorted by most impacting based from symbol state
      newsArticles: [],
      //Number of positive news
      positive: 0,
      //Number of negative news
      negative: 0,
      //Number of neutral news
      neutral: 0,
      //Total weighted outcome where >0 is positive, <0 negative and =0 is neutral
      total: 0,
      //Prediction if stock impact will be positive, negative or neutral
      stockPrediction: '',
      //Graph data required to splot the stock
      stockGraphArray: [],
      //Stock Profile Addition Info such as CEO, Industry, etc..
      stockProfile: [],
      //Main Stock Basic Info Visible/Non-Visible
      mainVisible: false,
      //Hide Search Bar auto-fill dropdown when stock has been selected
      //True === show, false === hidden
      hideAutoFill: false,
      //Show graph on select
      graphVisible: false,

    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Save userInput to state onChange 
  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Disable refresh of page
  handleSubmit = (event) => {
    event.preventDefault();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Save best matches of searched stock to an array in state called bestMathces
  handlePress = (event) => {
    if (this.state.userInput !== '') {
      let bestMatchesLimit = [];
      Axios({
        method: 'get',
        url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.userInput}&apikey=WPZV8PD9NGMXNUEF`,
        responseType: 'json',
        params: {
          format: 'json',
        }
      }).then((res) => {
        bestMatchesLimit = res.data.bestMatches;
        bestMatchesLimit.length = 7;
        this.setState({
          bestMatches: bestMatchesLimit,
          hideAutoFill: true,
        })
      })
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Grab Stock Symbol with onClick
  handleSelect = (event) => {
    let index = event.target.value;
    let rawSymbol = this.state.bestMatches[index]["1. symbol"];
    this.setState({
      symbol: rawSymbol,
    })

    Axios({
      method: 'get',
      url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${rawSymbol}&apikey=WPZV8PD9NGMXNUEF`,
      responseType: 'json',
      params: {
        format: 'json',
      }
    }).then((res) => {
      this.setState({
        stockArray: res.data["Global Quote"],
        mainVisible: true,
        hideAutoFill: false
      })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Grabbing data and manipulating data in order to grab new articles API

    }).then( () => {
      let today = new Date();
      let month = '';
      let date = '';
      let dayBefore = '';

      if ((today.getMonth() + 1) < 10) {
        month = "0" + (today.getMonth() + 1).toString();
      }

      else {
        month = (today.getMonth() + 1).toString();
      }

      if (today.getDate() < 10) {
        date = "0" + (today.getDate()).toString();
        dayBefore = "0" + (today.getDate() - 1).toString();
      }

      else if ((today.getDate()) === 10) {
        date = "10";
        dayBefore = "09";
      }

      else  {
        date = (today.getDate()).toString();
        dayBefore = (today.getDate() - 1).toString();
      }

      let todaysDate = month + date + (today.getFullYear()).toString();
      let previousDate = month + dayBefore + (today.getFullYear()).toString();

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////News Article API

      Axios({
        method: 'get',
        url: `https://stocknewsapi.com/api/v1?tickers=${this.state.symbol}&date=${previousDate}-${todaysDate}&items=50&sortby=trending&token=mvxx5scavxdldegdu6dmwkji1nxpbigscjc9ryiy`,
        responseType: 'json',
        params: {
          format: 'json',
        }
      }).then( (res) => {
        this.setState({
          newsArticles: res.data["data"]
        })
      })

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //Calculating Impact on Stock based from News

      .then( () => {

        if (this.state.newsArticles.length > 0) {

          for (let i = 0; i < this.state.newsArticles.length; i++) {
            if (this.state.newsArticles[i].sentiment === "Neutral") {
              this.setState({
                neutral: this.state.neutral + 1
              })
  
            }
            else if (this.state.newsArticles[i].sentiment === "Positive") {
              this.setState({
                positive: this.state.positive + 1
              })
            }
            else if (this.state.newsArticles[i].sentiment === "Negative") {
              this.setState({
                negative: this.state.negative - 1
              })
            }
          }
          this.setState({
            total: (this.state.positive + this.state.negative) / (this.state.newsArticles.length)
          })
        }

        else {
          //Output that there should be no change in price of stock
          this.setState({
            total: 0
          })
        }
  
        if (this.state.total > 0) {
          this.setState({
            stockPrediction: 'Positive'
          })
        }
  
        else if (this.state.total < 0) {
          this.setState({
            stockPrediction: 'Negative'
          })
        }
  
        else if (this.state.total === 0) {
          this.setState({
            stockPrediction: 'Neutral'
          })
        }

      }).then( () => {
        Axios({
          method: 'get',
          url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${rawSymbol}&apikey=WPZV8PD9NGMXNUEF`,
          responseType: 'json',
          params: {
            format: 'json',
          }
        }).then( (info) => {
          let stockGraph = [];
          stockGraph = (Object.values(info.data["Time Series (Daily)"])).reverse();
          let stockGraphSorted = [];

          for (let i = 0; i < stockGraph.length; i++) {
            stockGraphSorted[i] = { x: i, y: Number(stockGraph[i]['1. open']) };
          }

          this.setState({
            stockGraphArray: stockGraphSorted
          })

        }).then( () => {
          Axios({
            method: 'get',
            url: `https://financialmodelingprep.com/api/v3/company/profile/${this.state.symbol}`,
            responseType: 'json',
            params: {
              format: 'json',
            }
          }).then((stock) => {
            this.setState({
              stockProfile: stock.data.profile
              graphVisible: true,
            })
          })
        })
        })
      })
    }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render () {
    return (
      <div className="App">
        <h1>6iXTrades</h1>

          <SearchBar 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handlePress={this.handlePress}
          userInput={this.state.userInput}
          />

        {this.state.hideAutoFill && <AutoFillDropDown
          handleSelect={this.handleSelect}
          bestMatches={this.state.bestMatches}
          />}

          {/* General Stock Information such as opening price and etc. */}
          {this.state.mainVisible && <Main 
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
          handlePress = {this.handlePress}
          handleSelect = {this.handleSelect}
          userInput = {this.state.userInput}
          bestMatches = {this.state.bestMatches}
          symbol = {this.state.symbol}
          stockArray = {this.state.stockArray}
          newsArticles = {this.state.newsArticles}
          positive = {this.state.positive}
          negative = {this.state.negative}
          neutral = {this.state.neutral}
          total = {this.state.total}
          stockPrediction = {this.state.stockPrediction}
          stockGraphArray = {this.state.stockGraphArray}
          stockProfile = {this.state.stockProfile}
          />}

          {this.state.graphVisible && <Graph 
          stockProfile = {this.state.stockProfile}
          stockGraphArray={this.state.stockGraphArray}
          symbol = {this.state.symbol}
          />}
          

    </div>
    );

  }
}

export default App;
