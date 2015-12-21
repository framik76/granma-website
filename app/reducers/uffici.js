import {combineReducers} from "redux";
import {map} from "ramda";

import {
    UFFICIO_ADD_START,
    UFFICIO_ADD_SUCCESS,
    UFFICIO_ADD_ERROR,
    UFFICIO_ADD_RESET,
    UFFICI_FETCH_START,
    UFFICI_FETCH_SUCCESS,
    UFFICI_FETCH_ERROR
} from "actions/uffici";

function remapUffici (ufficio) {
    return {
        id: ufficio.id,
        descrizione: ufficio.descrizione,
        idAzienda: ufficio.idAzienda,
        sede: {
            indirizzo: ufficio.sede.indirizzo,
            cap: ufficio.sede.cap,
            provincia: ufficio.sede.provincia,
            citta: ufficio.sede.citta,
            nazione: ufficio.sede.nazione
        },
        luogo: ufficio.sede.indirizzo + ", " + ufficio.sede.cap + ", " + ufficio.sede.citta + ", " + ufficio.sede.provincia
    };
}

function elements (state = [], {type, payload}) {
    switch (type) {
    case UFFICI_FETCH_SUCCESS:
        return map(remapUffici, payload);
    default:
        return state;
    }
}

function fetchError (state = null, {type, error}) {
    switch (type) {
    case UFFICI_FETCH_START:
    case UFFICI_FETCH_SUCCESS:
        return null;
    case UFFICI_FETCH_ERROR:
        return error;
    default:
        return state;
    }
}

function isFetching (state = false, {type}) {
    switch (type) {
    case UFFICI_FETCH_START:
        return true;
    case UFFICI_FETCH_SUCCESS:
    case UFFICI_FETCH_ERROR:
        return false;
    default:
        return state;
    }
}

function addError (state = null, {type, error}) {
    switch (type) {
    case UFFICIO_ADD_START:
    case UFFICIO_ADD_SUCCESS:
    case UFFICIO_ADD_RESET:
        return null;
    case UFFICIO_ADD_ERROR:
        return error;
    default:
        return state;
    }
}

function isAdding (state = false, {type}) {
    switch (type) {
    case UFFICIO_ADD_START:
        return true;
    case UFFICIO_ADD_SUCCESS:
    case UFFICIO_ADD_ERROR:
    case UFFICIO_ADD_RESET:
        return false;
    default:
        return state;
    }
}

function lastAdded (state = null, {type, payload}) {
    switch (type) {
    case UFFICIO_ADD_RESET:
        return null;
    case UFFICIO_ADD_SUCCESS:
        return payload;
    default:
        return state;
    }
}

export const uffici = combineReducers({
    isAdding,
    addError,
    lastAdded,
    elements,
    isFetching,
    fetchError
});
