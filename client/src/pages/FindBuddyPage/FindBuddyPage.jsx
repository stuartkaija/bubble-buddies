import React, { Component } from 'react';
import TinderCard from 'react-tinder-card';
import DisplayPicture from '../../components/DisplayPicture/DisplayPicture';
import Header from '../../components/Header/Header';
import './FindBuddyPage.scss';

import axios from 'axios';

export default class FindBuddyPage extends Component {

    state = {
        users: [],   // populate this on componentDidMount from JSON data
        userId: null,   // id of currently logged in user
        // filteredUsers: []   // maybe I dont need this here...
    }

    // when page loads, user array (first user) will appear on screen in card
    // need to filter out presently logged in user

    componentDidMount () {
        axios
            .get("http://localhost:8080/users")
            .then((res) => {this.setState({users: res.data})})
            .catch(error => console.log(error));

        // find currently logged in user
        const userId = this.props.match.params.userId
        this.setState({userId: userId});
    }
    
    // Callback that will be executed when a swipe has been completed. It will be called with a single string denoting which direction the swipe was in: 'left', 'right', 'up' or 'down'.
    // conditional statement whether direction is left or right i.e. if left add user to rightarray and vice versa
    // onSwipe = (direction) => {
    //     console.log(direction);
    //     axios
    //         .put('http://localhost:8080/users/swipe', {
    //             user: this.state.userId,
    //             direction: direction
    //         })
    //         .then(res => console.log(res))
    //         .catch(error => console.log(error));

    // }

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
                    // logout={this.handleLogout}
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
            </div>
        );
    }
}
