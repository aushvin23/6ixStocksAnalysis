import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      //userInput to search stock
      userInput: '',
      //use userInput to pull best matches to stocks from API
      bestMatches: [],
      symbol: '',
    }
  }

  //Save userInput to state onChange 
  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  //Disable refresh of page
  handleSubmit = (event) => {
    event.preventDefault();
  }

  //Save best matches of searched stock to an array in state called bestMathces
  handlePress = (event) => {
    if (this.state.userInput !== '') {
      let bestMatchesLimit = [];
      axios({
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
          bestMatches: bestMatchesLimit
        })
      })
    }
  }

  handleEnter = (event) => {
    let index = event.target.value;
    let rawSymbol = this.state.bestMatches[index]["1. symbol"]
    this.setState({
      symbol: this.state.bestMatches[index]["1. symbol"]
    })
  }



  render () {
    return (
      <div className="App">
        <h1>6iXTrades</h1>

          <form>

            <input 
            type = "text"
            placeholder = "Search for Stock"
            name = "userInput"
            value = {this.state.userInput}
            onChange = {this.handleChange}
            onKeyUp = {this.handlePress}
            />

            <button
            onClick={this.handleSubmit}

            >Submit</button>

          </form>

          <ul>
            {
              this.state.bestMatches.map(((match, index) => {
                return (

              <li key={index} value={index} onClick={this.handleEnter}>{match["2. name"]} ({match["1. symbol"]})</li>

              )
              }))}
          </ul>
    </div>
    );

  }
}

export default App;
