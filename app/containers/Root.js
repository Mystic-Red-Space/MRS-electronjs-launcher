// @flow
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {hot} from 'react-hot-loader/root';
import Routes from '../Routes';
import type {Store} from '../reducers/types';

type
Props = {
  store: Store,
  history: {}
};

const Root = ({store, history}: Props) => (
  < Provider
store = {store} >
  < ConnectedRouter
history = {history} >
  < Routes / >
  < /ConnectedRouter>
  < /Provider>
)
;

export default hot(Root);
