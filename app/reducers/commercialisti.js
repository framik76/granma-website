import {combineReducers} from "redux";

import {
    FETCH_COMMERCIALISTI_ERROR,
    FETCH_COMMERCIALISTI_START,
    FETCH_COMMERCIALISTI_SUCCESS,
    SET_COMMERCIALISTA_ERROR,
    SET_COMMERCIALISTA_RESET,
    SET_COMMERCIALISTA_START,
    SET_COMMERCIALISTA_SUCCESS
} from "actions/commercialisti";

function fetchError (state = null, {type, error}) {
    switch (type) {
    case FETCH_COMMERCIALISTI_START:
    case FETCH_COMMERCIALISTI_SUCCESS:
        return null;
    case FETCH_COMMERCIALISTI_ERROR:
        return error;
    default:
        return state;
    }
}

function elements (state = [], {type, payload}) {
    switch (type) {
    case FETCH_COMMERCIALISTI_SUCCESS:
        return typeof payload !== "undefined" ? payload : [];
    default:
        return state;
    }
}

function isFetching (state = false, {type}) {
    switch (type) {
    case FETCH_COMMERCIALISTI_START:
        return true;
    case FETCH_COMMERCIALISTI_SUCCESS:
    case FETCH_COMMERCIALISTI_ERROR:
        return false;
    default:
        return state;
    }
}

function setCommercialistaError (state = null, {type, error}) {
    switch (type) {
    case SET_COMMERCIALISTA_START:
    case SET_COMMERCIALISTA_SUCCESS:
    case SET_COMMERCIALISTA_RESET:
        return null;
    case SET_COMMERCIALISTA_ERROR:
        return error;
    default:
        return state;
    }
}

function isSettingCommercialista (state = false, {type}) {
    switch (type) {
    case SET_COMMERCIALISTA_START:
        return true;
    case SET_COMMERCIALISTA_SUCCESS:
    case SET_COMMERCIALISTA_ERROR:
    case SET_COMMERCIALISTA_RESET:
        return false;
    default:
        return state;
    }
}

function lastSettedCommercialista (state = null, {type, payload}) {
    switch (type) {
    case SET_COMMERCIALISTA_RESET:
        return null;
    case SET_COMMERCIALISTA_SUCCESS:
        return payload;
    default:
        return state;
    }
}

function settingCommercialista (state = null, {type, payload}) {
    switch (type) {
    case SET_COMMERCIALISTA_RESET:
        return payload;
    case SET_COMMERCIALISTA_SUCCESS:
        return null;
    default:
        return state;
    }
}

export const commercialisti = combineReducers({
    elements,
    isFetching,
    fetchError,
    isSettingCommercialista,
    lastSettedCommercialista,
    setCommercialistaError,
    settingCommercialista
});
