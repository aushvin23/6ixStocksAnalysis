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
                        className = "user_input"
                        value={this.props.userInput}
                        onChange={this.props.handleChange}
                        onKeyUp={this.props.handlePress}
                    />

                    <button
                        className = "search_submit_button"
                        onClick={this.props.handleSubmit}>Submit
                    </button>
                </form>

            </div>
            
            
        )
    }
}

export default SearchBar;