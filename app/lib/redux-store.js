import createHistory from "history/lib/createHashHistory";
import {applyMiddleware, compose, createStore} from "redux";
import logger from "redux-logger";
import {reduxReactRouter} from "redux-router";
import storage from "redux-storage";
import thunk from "redux-thunk";

import rootReducer from "reducers";

const reducer = storage.reducer(rootReducer);

const store = compose(
    applyMiddleware(
        thunk,
        logger({collapsed: true})
    ),
    reduxReactRouter({createHistory})
)(createStore)(reducer);

export default store;
