import {combineReducers} from "redux";
import {map} from "ramda";

import {
    RICERCA_ADD_INVITE_ERROR,
    RICERCA_ADD_INVITE_RESET,
    RICERCA_ADD_INVITE_START,
    RICERCA_ADD_INVITE_SUCCESS,
    RICERCA_FETCH_START,
    RICERCA_FETCH_SUCCESS,
    RICERCA_FETCH_ERROR
} from "actions/search";

function remapAziende (azienda) {
    return {
        codiceFiscale: azienda.codiceFiscale,
        partitaIva: azienda.partitaIva,
        ragioneSociale: azienda.ragioneSociale
        // sede: {
        //    indirizzo: azienda.sedeLegale.indirizzo,
        //    cap: azienda.sedeLegale.cap,
        //    provincia: azienda.sedeLegale.provincia,
        //    citta: azienda.sedeLegale.citta,
        //    nazione: azienda.sedeLegale.nazione
        // }
    };
}

function elements (state = [], {type, payload}) {
    switch (type) {
    case RICERCA_FETCH_SUCCESS:
        return map(remapAziende, payload.aziende);
    default:
        return state;
    }
}

function fetchError (state = null, {type, error}) {
    switch (type) {
    case RICERCA_FETCH_START:
    case RICERCA_FETCH_SUCCESS:
        return null;
    case RICERCA_FETCH_ERROR:
        return error;
    default:
        return state;
    }
}

function isFetching (state = false, {type}) {
    switch (type) {
    case RICERCA_FETCH_START:
        return true;
    case RICERCA_FETCH_SUCCESS:
    case RICERCA_FETCH_ERROR:
        return false;
    default:
        return state;
    }
}

function inviteError (state = null, {type, error}) {
    switch (type) {
    case RICERCA_ADD_INVITE_START:
    case RICERCA_ADD_INVITE_SUCCESS:
    case RICERCA_ADD_INVITE_RESET:
        return null;
    case RICERCA_ADD_INVITE_ERROR:
        return error;
    default:
        return state;
    }
}

function isInviting (state = false, {type}) {
    switch (type) {
    case RICERCA_ADD_INVITE_START:
        return true;
    case RICERCA_ADD_INVITE_SUCCESS:
    case RICERCA_ADD_INVITE_ERROR:
    case RICERCA_ADD_INVITE_RESET:
        return false;
    default:
        return state;
    }
}

function lastInvited (state = null, {type, payload}) {
    switch (type) {
    case RICERCA_ADD_INVITE_RESET:
        return null;
    case RICERCA_ADD_INVITE_SUCCESS:
        return payload;
    default:
        return state;
    }
}



export const searchResults = combineReducers({
    isInviting,
    lastInvited,
    inviteError,
    elements,
    isFetching,
    fetchError
});
