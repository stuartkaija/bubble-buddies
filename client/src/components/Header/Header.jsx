import React, { Component, BrowserHistory } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import WaterIcon from '@mui/icons-material/Water';
import arrow from '../../assets/icons/arrow_back-24px.svg';

class Header extends Component {

    state = {
        menu: null
    }
    
    openMenu = () => {
        if (this.state.menu) {            
            this.setState({menu: null});
            return
        }
        this.setState({menu: true})
    };

    render() {

        const { id, logout } = this.props

        return (
            <nav className='header-nav'>

                <Link className='header-nav__link' to ={'/' + id + '/'}>
                    <img src={arrow} alt="back arrow icon" />
                </Link>
                <h1 className='header-nav__title'>Bubble Buddies</h1>
                <button className='header-nav__menu-button' onClick={this.openMenu}><WaterIcon className='header-nav__burger'/></button>
                <div id='hidden-menu' className={this.state.menu ? 'header-nav__visible-menu' : 'header-nav__hidden-menu'}>
                    <Link className='header-nav__menu-links' to={{
                                pathname: '/' + id + '/edit',
                                user: id    // this passes in user id to edit profile page, so as to identify logged in user
                            }}>edit profile</Link>
                    <Link className='header-nav__menu-links' to=''>settings</Link>
                    <button onClick={logout} className='header-nav__menu-links--button'>logout</button>
                </div>
            </nav>
        );
    }
}

export default Header;