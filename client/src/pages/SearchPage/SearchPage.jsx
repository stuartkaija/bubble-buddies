import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import MarineData from '../../components/MarineData/MarineData';
import './SearchPage.scss';

export default class SearchPage extends Component {

    state = {
        location: null,
        marineData: null
    }

    handleSearch = (event) => {
        event.preventDefault();

        if (this.state.marineData) {this.setState({marineData: null})};

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

    handleMarineSearch = () => {
        // latitude and longitude of searched for location
        const lat = this.state.location.location.lat;
        const long = this.state.location.location.lon;
        axios
            .post("http://localhost:8080/weather/marine", {
                lat: lat,
                long: long
            })
            .then(response => this.setState({ marineData: response.data.weather[0].hourly }))
            .catch(error => console.log(error))
    };

    render() {
        if (this.state.location === null) {
            return (
                <>
                    <Header />
                    <form className='place-search' onSubmit={this.handleSearch} id='searchForm'>
                        <label className='place-search__label' htmlFor="">Search for a location</label>
                        <div>
                            <input className='place-search__input' type="search" name='search' id='search' />
                            <button className='place-search__button' form='searchForm'>Search</button>
                        </div>
                    </form>
                </>
            )
        };

        const { temp_c, temp_f, vis_km, wind_kph, wind_dir } = this.state.location.current
        const { name, country } = this.state.location.location

        return (
            <>
                <Header />
                <form className='place-search' onSubmit={this.handleSearch} id='searchForm'>
                    <label className='place-search__label' htmlFor="">Search for a location</label>
                    <div>
                        <input className='place-search__input' type="search" name='search' id='search' />
                        <button className='place-search__button' form='searchForm'>Search</button>
                    </div>
                </form>
                <h2 className='place'>{name}, {country}</h2>
                <div className='weather'>
                    <div className='weather__container'>
                        <p className='weather__subtitle'>conditions: <span className='weather__details'>{this.state.location.current.condition.text}</span></p>
                        <p className='weather__subtitle'>temperature: <span className='weather__details'>{temp_c}°C / {temp_f}°F</span></p>
                        <p className='weather__subtitle'>visibility: <span className='weather__details'>{vis_km}km</span> </p>
                        <p className='weather__subtitle'>wind: <span className='weather__details'>{wind_kph}km {wind_dir}</span></p>
                    </div>
                    <button className='weather__button' onClick={this.handleMarineSearch}>Marine Info</button>
                </div>
                {this.state.marineData && <MarineData hourlyData={this.state.marineData}/>}
            </>
        );
    }
}
