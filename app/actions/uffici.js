import {is} from "ramda";

import {API_URL} from "lib/config";

const transport = new Thrift.TXHRTransport(API_URL, {useCORS:true});
const protocol = new Thrift.Protocol(transport);
const anagraficaClient = new ConsoleAnagraficaApiClient(protocol);

export const UFFICI_FETCH_START = "UFFICI_FETCH_START";
export const UFFICI_FETCH_SUCCESS = "UFFICI_FETCH_SUCCESS";
export const UFFICI_FETCH_ERROR = "UFFICI_FETCH_ERROR";

export const UFFICIO_ADD_START = "UFFICIO_ADD_START";
export const UFFICIO_ADD_SUCCESS = "UFFICIO_ADD_SUCCESS";
export const UFFICIO_ADD_ERROR = "UFFICIO_ADD_ERROR";
export const UFFICIO_ADD_RESET = "UFFICIO_ADD_RESET";

export function fetchUffici (auth, idAzienda) {
    return dispatch => {
        dispatch({
            type: UFFICI_FETCH_START
        });
        var request = new UfficiList({"idAzienda": idAzienda});
        anagraficaClient.ufficiList(new Auth(auth), request, function (result) {
            if (is(Error, result)) {
                dispatch({
                    type: UFFICI_FETCH_ERROR,
                    error: new Error("Errore durante la ricerca degli uffici - " + JSON.stringify(result.message))
                });
            } else {
                dispatch({
                    type: UFFICI_FETCH_SUCCESS,
                    payload: result.uffici == null ? [] : result.uffici
                });
            }
        });
    };
}

export function addUfficio (auth, idAzienda, ufficio) {
    return dispatch => {
        dispatch({
            type: UFFICIO_ADD_START,
            payload: ufficio
        });

        var _sede = new Sede({descrizione: ufficio.descrizione, indirizzo: ufficio.indirizzo, cap: ufficio.cap, citta: ufficio.citta, provincia: ufficio.provincia, nazione: ufficio.nazione});
        var _ufficio = new Ufficio({id: "XXX", descrizione: ufficio.descrizione, sede: _sede});
        var request = new UfficiCreate({idAzienda, uffici: [_ufficio]});
        anagraficaClient.ufficiCreate(new Auth(auth), request, function (result) {
            if (is(Error, result)) {
                dispatch({
                    type: UFFICIO_ADD_ERROR,
                    error: new Error("Errore durante la creazione di un ufficio - " + JSON.stringify(result.message))
                });
            } else {
                dispatch({
                    type: UFFICIO_ADD_SUCCESS,
                    payload: result
                });
                dispatch(fetchUffici(new Auth(auth), idAzienda));
            }
        });
    };
}

export function addUfficioReset () {
    return {
        type: UFFICIO_ADD_RESET
    };
}
