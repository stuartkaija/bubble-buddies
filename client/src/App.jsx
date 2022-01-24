import './App.scss';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUp from './pages/SignUpPage/SignUpPage';


function App() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/' exact component={LoginPage} />
                <Route path='/signup' component={SignUp}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
