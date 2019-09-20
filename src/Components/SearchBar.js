import React, { Component } from 'react';

//SearchBar Component
class SearchBar extends Component {

    render() {
        return (
            <div>

                <form>
                    <input
                        type="text"
                        placeholder="Search for Stock"
                        name="userInput"
                        value={this.props.userInput}
                        onChange={this.props.handleChange}
                        onKeyUp={this.props.handlePress}
                    />

                    <button
                        onClick={this.props.handleSubmit}>Submit
                    </button>
                </form>

            </div>
            
            
        )
    }
}

export default SearchBar;