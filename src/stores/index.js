import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

export default createStore(reducers, applyMiddleware(thunk, promise));
