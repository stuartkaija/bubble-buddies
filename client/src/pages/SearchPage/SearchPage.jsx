import React, { Component } from 'react';
import axios from 'axios';

export default class SearchPage extends Component {

    // state to hold the data when it arrives from the backend
    state = {
        location: null,
    }

    handleSearch = (event) => {
        event.preventDefault();
        const userInput = event.target.search.value
        axios
            .post("http://localhost:8080/weather", {
                search: userInput
            })
            .then(response => {
                console.log(response.data);
                this.setState({
                    location: response.data
                });
            })
            .catch(error => console.log(error));
    };

    render() {
        if (this.state.location === null) {
            return (
                <>
                    <form onSubmit={this.handleSearch} id='searchForm'>
                    <label htmlFor="">Search for a location</label>
                    <input type="search" name='search' id='search' />
                    </form>
                    <button form='searchForm'>Search</button>
                </>
            )
        }

        // const { conditions, temperature, visibility, wind } = this.state.location.current

        return (
            <>
                <form onSubmit={this.handleSearch} id='searchForm'>
                    <label htmlFor="">Search for a location</label>
                    <input type="search" name='search' id='search' />
                </form>
                <button form='searchForm'>Search</button>
                <div>
                    {/* returned data just to get it on the page in the next hour hopefully */}
                    <p>Conditions: {this.state.location.current.condition.text}</p>
                    <p>Temperature: {this.state.location.current.temp_c}</p>
                    <p>Visibility: {this.state.location.current.vis_km}km</p>
                    <p>Wind: {this.state.location.current.wind_kph}km {this.state.location.current.wind_dir}</p>
                </div>
                <button>Marine Info</button>
            </>
        );
    }
}
