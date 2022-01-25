import './App.scss';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUp from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FindBuddyPage from './pages/FindBuddyPage/FindBuddyPage';
import SearchPage from './pages/SearchPage/SearchPage';


function App() {
    return (
        <BrowserRouter>
            <Header />
            <div className='app'>
                <Switch>
                    <Route path='/' exact component={LoginPage} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/find' component={FindBuddyPage} />
                    <Route path ='/search' component={SearchPage} />
                    <Route path='/:userId' component={ProfilePage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
