import React, { Component } from 'react';
import TinderCard from 'react-tinder-card';
import DisplayPicture from '../../components/DisplayPicture/DisplayPicture';
import Header from '../../components/Header/Header';
import './FindBuddyPage.scss';
import check from '../../assets/icons/check.png'
import close from '../../assets/icons/close.png'

import axios from 'axios';

export default class FindBuddyPage extends Component {

    state = {
        users: [],
        userId: null,
    }

    componentDidMount () {
        axios
            .get("http://localhost:8080/users")
            .then((res) => {this.setState({users: res.data})})
            .catch(error => console.log(error));

        // find currently logged in user
        const userId = this.props.match.params.userId
        this.setState({ userId: userId });
    }
    
    swiped = (direction, buddy) => {
        console.log(direction, buddy);
        axios
            .put('http://localhost:8080/users/swipe', {
                    userId: this.state.userId,
                    buddy: buddy,
                    direction: direction
                })
                .then(res => console.log(res))
                .catch(error => console.log(error));
    }

    // Callback that will be executed when a TinderCard has left the screen. It will be called with a single string denoting which direction the swipe was in: 'left', 'right', 'up' or 'down'.
    onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    render() {

        const filteredUsers = this.state.users.filter(user => user.id !== this.state.userId);

        return (
            <div className='buddy-container'>
                <Header 
                    id={this.state.userId}
                    />                
                    {filteredUsers.map((user) => {
                        return (
                            <TinderCard
                                key={user.id}
                                className='buddy-container__tindercard'
                                onSwipe={(dir) => {this.swiped(dir, user.id)}}
                                onCardLeftScreen={() => this.onCardLeftScreen(user.firstName)}
                                preventSwipe={['up', 'down']}>
                                <DisplayPicture 
                                    className='buddy-container__picture'
                                    displayPicture={user.displayPicture}
                                    name={user.firstName}
                                    certification={user.certification}
                                    experience={user.yearsExperience}
                                    />
                            </TinderCard>
                        )
                    })}
                    <div className='buddy-buttons' >
                        <button className='buddy-button-left'></button>
                        <button className='buddy-button-right'></button>
                    </div>
            </div>
        );
    }
}
