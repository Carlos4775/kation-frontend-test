import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Switch>
      <Route exact path={["/", "/addresses/", "/addresses/:page"]} component={Home} />
      </Switch>
    </Router>
  );
}
