import {combineReducers} from "redux";

import {
    UTENTI_ADD_START,
    UTENTI_ADD_SUCCESS,
    UTENTI_ADD_ERROR,
    UTENTI_ADD_RESET,
    UTENTI_FETCH_START,
    UTENTI_FETCH_SUCCESS,
    UTENTI_FETCH_ERROR
} from "actions/utenti";

function elements (state = [], {type, payload}) {
    switch (type) {
    case UTENTI_FETCH_SUCCESS:
        return payload;
    default:
        return state;
    }
}

function fetchError (state = null, {type, error}) {
    switch (type) {
    case UTENTI_FETCH_START:
    case UTENTI_FETCH_SUCCESS:
        return null;
    case UTENTI_FETCH_ERROR:
        return error;
    default:
        return state;
    }
}

function isFetching (state = false, {type}) {
    switch (type) {
    case UTENTI_FETCH_START:
        return true;
    case UTENTI_FETCH_SUCCESS:
    case UTENTI_FETCH_ERROR:
        return false;
    default:
        return state;
    }
}

function addError (state = null, {type, error}) {
    switch (type) {
    case UTENTI_ADD_START:
    case UTENTI_ADD_SUCCESS:
    case UTENTI_ADD_RESET:
        return null;
    case UTENTI_ADD_ERROR:
        return error;
    default:
        return state;
    }
}

function isAdding (state = false, {type}) {
    switch (type) {
    case UTENTI_ADD_START:
        return true;
    case UTENTI_ADD_SUCCESS:
    case UTENTI_ADD_ERROR:
    case UTENTI_ADD_RESET:
        return false;
    default:
        return state;
    }
}

function lastAdded (state = null, {type, payload}) {
    switch (type) {
    case UTENTI_ADD_RESET:
        return null;
    case UTENTI_ADD_SUCCESS:
        return payload;
    default:
        return state;
    }
}

export const utenti = combineReducers({
    isAdding,
    addError,
    lastAdded,
    elements,
    isFetching,
    fetchError
});
