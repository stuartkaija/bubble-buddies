import React, { Component } from 'react';
import TinderCard from 'react-tinder-card';
import DisplayPicture from '../../components/DisplayPicture/DisplayPicture';
import './FindBuddyPage.scss';

export default class FindBuddyPage extends Component {

    onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
    }

    onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
      }

    render() {
        return (
            <div className='buddy-container'>
                <TinderCard onSwipe={this.onSwipe} onCardLeftScreen={() => this.onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
                    <DisplayPicture />
                </TinderCard>

            </div>
        );
    }
}
