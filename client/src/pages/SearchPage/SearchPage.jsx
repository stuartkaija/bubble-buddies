import React, { Component } from 'react';
import axios from 'axios';

export default class SearchPage extends Component {

    // state to hold the data when it arrives from the backend


    handleSearch = (event) => {
        event.preventDefault();
        const userSearch = event.target.search.value
        axios
            .post("http://localhost:8080/weather", {
                search: userSearch
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));
    };

    render() {
        return (
            <>
                <form onSubmit={this.handleSearch} id='searchForm'>
                    <label htmlFor="">Search for a dive spot</label>
                    <input type="search" name='search' id='search' />
                </form>
                <button form='searchForm'>Search</button>
                <div>
                    {/* returned data just to get it on the page in the next hour hopefully */}
                    <p>condition</p>
                    <p>temp</p>
                    <p>wind</p>
                    <p>vis</p>
                    <p>swell</p>
                    <p>tide</p>
                </div>
            </>
        );
    }
}
