import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './redux/reducers/rootReducer';
import thunk from 'redux-thunk';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/loader.scss"
import "./style/main.scss"
const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
