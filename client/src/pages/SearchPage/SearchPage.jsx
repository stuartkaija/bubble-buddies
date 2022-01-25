import React, { Component } from 'react';
import axios from 'axios';

export default class SearchPage extends Component {

    handleSearch = (event) => {
        event.preventDefault();
        console.log("i am searching");
    };

    render() {
        return (
            <>
                <form onSubmit={this.handleSearch} id='searchForm'>
                    <label htmlFor="">Search for a dive spot</label>
                    <input type="search" name='search' id='search' />
                </form>
                <button form='searchForm'>Search</button>
            </>
        );
    }
}
