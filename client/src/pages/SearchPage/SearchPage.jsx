import React, { Component } from 'react';
import axios from 'axios';
import MarineData from '../../components/MarineData/MarineData';

export default class SearchPage extends Component {

    // state to hold the data when it arrives from the backend
    state = {
        location: null,
        marineData: null
    }

    handleSearch = (event) => {
        event.preventDefault();
        const userInput = event.target.search.value
        axios
            .post("http://localhost:8080/weather", {
                search: userInput
            })
            .then(response => {
                this.setState({
                    location: response.data
                });
            })
            .catch(error => console.log(error));
    };

    handleMarineSearch = (event) => {
        // latitude and longitude of searched for location
        const lat = this.state.location.location.lat;
        const long = this.state.location.location.lon;
        axios
            .post("http://localhost:8080/weather/marine", {
                lat: lat,
                long: long
            })
            // .then(response => console.log(response.data.weather[0].hourly))
            .then(response => this.setState({ marineData: response.data.weather[0].hourly }))
            .catch(error => console.log(error))
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
        };

        const { temp_c, vis_km, wind_kph, wind_dir } = this.state.location.current
        const { name, country } = this.state.location.location

        return (
            <>
                <form onSubmit={this.handleSearch} id='searchForm'>
                    <label htmlFor="">Search for a location</label>
                    <input type="search" name='search' id='search' />
                </form>
                <button form='searchForm'>Search</button>
                <div>
                    <h2>{name}, {country}</h2>
                    <p>Conditions: {this.state.location.current.condition.text}</p>
                    <p>Temperature: {temp_c}</p>
                    <p>Visibility: {vis_km}km</p>
                    <p>Wind: {wind_kph}km {wind_dir}</p>
                </div>
                <button onClick={this.handleMarineSearch}>Marine Info</button>
                {this.state.marineData && <MarineData hourlyData={this.state.marineData}/>}
            </>
        );
    }
}
