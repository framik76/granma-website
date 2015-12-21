import {is, map, filter} from "ramda";

import {API_URL} from "lib/config";
const transport = new Thrift.TXHRTransport(API_URL, {useCORS:true});
const protocol = new Thrift.Protocol(transport);
const anagraficaClient = new ConsoleAnagraficaApiClient(protocol);

export const UTENTI_FETCH_START = "UTENTI_FETCH_START";
export const UTENTI_FETCH_SUCCESS = "UTENTI_FETCH_SUCCESS";
export const UTENTI_FETCH_ERROR = "UTENTI_FETCH_ERROR";

export const UTENTI_ADD_START = "UTENTI_ADD_START";
export const UTENTI_ADD_SUCCESS = "UTENTI_ADD_SUCCESS";
export const UTENTI_ADD_ERROR = "UTENTI_ADD_ERROR";
export const UTENTI_ADD_RESET = "UTENTI_ADD_RESET";

export function fetchUtenti (auth, idAzienda) {
    return dispatch => {
        dispatch({
            type: UTENTI_FETCH_START
        });
        var request = new UtenzeList({"idAzienda": idAzienda});
        anagraficaClient.utenzeList(new Auth(auth), request, function (result) {
            if (is(Error, result)) {
                dispatch({
                    type: UTENTI_FETCH_ERROR,
                    error: new Error("Errore nella ricerca delle utenze - " + JSON.stringify(result.message))});
            } else {
                dispatch({
                    type: UTENTI_FETCH_SUCCESS,
                    payload: result.utenze == null ? [] : result.utenze
                });
            }
        });

    };
}

function estraiId (uff) {
    return uff.payload;
}

function selected (uff) {
    return uff.value == true;
}

export function addUtente (auth, utente, idAzienda) {
    return dispatch => {
        dispatch({
            type: UTENTI_ADD_START,
            payload: utente
        });

        var _utente = new Utenza(utente);
        var ufficiDaAssociare = filter(selected, utente.ufficiSelezionati);
        var idUffici = map(estraiId, ufficiDaAssociare);

        var dest = new UtenzaCreate({"idUffici": idUffici, "utenza": _utente});
        anagraficaClient.utenzaCreate(new Auth(auth), dest, function (result) {
            if (is(Error, result)) {
                dispatch({
                    type: UTENTI_ADD_ERROR,
                    error: new Error("Errore nell'aggiunta dell'utente")
                });
            } else {
                dispatch({
                    type: UTENTI_ADD_SUCCESS,
                    payload: result.idUtenza
                });
                dispatch(fetchUtenti(auth, idAzienda));
            }
        });
    };
}

export function addUtenteReset () {
    return {
        type: UTENTI_ADD_RESET
    };
}
