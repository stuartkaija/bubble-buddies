import React, { Component } from 'react';
import TinderCard from 'react-tinder-card';
import DisplayPicture from '../../components/DisplayPicture/DisplayPicture';
import './FindBuddyPage.scss';

import demoPic from '../../assets/photos/sebastian-pena-lambarri-7i5HMCGupVw-unsplash.jpg';
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
    

    onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
    }

    onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
      }

    render() {

        // console.log(this.state.users);
        // console.log(this.state.userId);
        // console.log(this.state.filteredUsers);

        const filteredUsers = this.state.users.filter(user => user.id !== this.state.userId);
        console.log(filteredUsers);

        return (
            <div className='buddy-container'>
                {filteredUsers.map((user) => {
                    return (
                        <TinderCard 
                            key={user.id}
                            // name={user.firstName}
                            // years={user.yearsExperience} // these are going to all have to go in the display pic component
                            // certification={user.certification}
                            onSwipe={this.onSwipe}
                            onCardLeftScreen={() => this.onCardLeftScreen('fooBar')}
                            preventSwipe={['right', 'left']}>
                            <DisplayPicture />
                        </TinderCard>
                    )
                })}
            </div>
        );
    }
}
