import {Route, Switch} from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

export default () => (
  < App >
  < Switch >
  < Route
path = {routes.COUNTER}
component = {CounterPage}
/>
< Route
path = {routes.HOME}
component = {HomePage}
/>
< /Switch>
< /App>
)
;
