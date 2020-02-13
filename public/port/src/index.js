import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import './index.css';
// import { projects, tasks, page } from './reducers';
import { page } from './reducers';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from './Middleware/logger';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

// import createSagaMiddleware from 'redux-saga';

const rootReducer = (state = {}, action) => {
  return {
    // projects: projects(state.projects, action),
    // tasks: tasks(state.tasks, action),
    page: page(state.page, action),
  };
};

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
);   //pass in the reducer to the store

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
