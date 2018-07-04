import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import loggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const root = document.querySelector('#root');
// const middleware = applyMiddleware(promiseMiddleware(), loggerMiddleware);
const middleware = applyMiddleware(promiseMiddleware(), thunk);
const store = createStore(
    reducers,
    composeWithDevTools(middleware),
);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root,
);

registerServiceWorker();
