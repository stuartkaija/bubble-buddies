import './App.scss';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact component={LandingPage}/>
        <Route path='/login' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
