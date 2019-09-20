import React, { Component } from 'react';

//SearchBar AutoFill Dropdown Component
class AutoFillDropDown extends Component {

    render() {
        return (
            <div>

                <ul>
                    {
                        this.props.bestMatches.map(((match, index) => {
                            return (

                                <li key={index} value={index} onClick={this.props.handleSelect}>{match["2. name"]} ({match["1. symbol"]})</li>

                            )
                        }))}
                </ul>

            </div>


        )
    }
}

export default AutoFillDropDown;