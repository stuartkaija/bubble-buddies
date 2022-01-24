import './App.scss';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUp from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FindBuddyPage from './pages/FindBuddyPage/FindBuddyPage';


function App() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/' exact component={LoginPage} />
                <Route path='/signup' component={SignUp} />
                <Route path='/find' component={FindBuddyPage} />
                <Route path='/:userId' component={ProfilePage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
