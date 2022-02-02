import './App.scss';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUp from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import FindBuddyPage from './pages/FindBuddyPage/FindBuddyPage';
import SearchPage from './pages/SearchPage/SearchPage';


function App() {

    return (
        <BrowserRouter>
            <div className='app'>
                <Switch>
                    <Route path='/' exact component={LoginPage} />
                    <Route path='/signup' component={SignUp} />
                    <Route path ='/search' component={SearchPage} />
                    <Route path='/:userId' exact component={ProfilePage} />
                    <Route path='/:userId/edit' component={EditProfilePage} />
                    <Route path='/:userId/find' component={FindBuddyPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
