import {combineReducers} from "redux";
import {routerStateReducer as router} from "redux-router";
import {reducer as form} from "redux-form";


const rootReducer = combineReducers({
    router,
    form
});

export default rootReducer;
