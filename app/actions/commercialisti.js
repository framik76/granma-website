import {is} from "ramda";

import {API_URL} from "lib/config";

const transport = new Thrift.TXHRTransport(API_URL, {useCORS:true});
const protocol = new Thrift.Protocol(transport);
const anagraficaClient = new ConsoleAnagraficaApiClient(protocol);

export const SET_COMMERCIALISTA_START = "SET_COMMERCIALISTA_START";
export const SET_COMMERCIALISTA_SUCCESS = "SET_COMMERCIALISTA_SUCCESS";
export const SET_COMMERCIALISTA_ERROR = "SET_COMMERCIALISTA_ERROR";
export const SET_COMMERCIALISTA_RESET = "SET_COMMERCIALISTA_RESET";

export const FETCH_COMMERCIALISTI_START = "FETCH_COMMERCIALISTI_START";
export const FETCH_COMMERCIALISTI_SUCCESS = "FETCH_COMMERCIALISTI_SUCCESS";
export const FETCH_COMMERCIALISTI_ERROR = "FETCH_COMMERCIALISTI_ERROR";

export function fetchCommercialisti (auth, idAzienda) {
    return dispatch => {
        dispatch({
            type: FETCH_COMMERCIALISTI_START
        });
        var request = new CommercialistiList({idAzienda});
        anagraficaClient.commercialistiList(new Auth(auth), request, function (result) {
            if (is(Error, result)) {
                dispatch({
                    type: FETCH_COMMERCIALISTI_ERROR,
                    error: new Error("Errore nella ricerca dei commercialisti per l'azienda - " + JSON.stringify(result.message))
                });
            } else {
                JSON.stringify(result);
                dispatch({
                    type: FETCH_COMMERCIALISTI_SUCCESS,
                    payload: result.commercialisti
                });
            }
        });

    };
}

export function setCommercialista (auth, idAzienda, commercialista) {
    return dispatch => {
        dispatch({
            type: SET_COMMERCIALISTA_START,
            payload: commercialista
        });

        var commercialisti = [commercialista];
        var req = new AddCommercialistiUpdate({idAzienda, idCommercialisti: commercialisti});
        anagraficaClient.addCommercialistiUpdate(new Auth(auth), req, function (result) {
            if (is(Error, result)) {
                dispatch({
                    type: SET_COMMERCIALISTA_ERROR,
                    error: new Error("Errore nell'aggiunta del commercialista")
                });
            } else {
                dispatch({
                    type: SET_COMMERCIALISTA_SUCCESS,
                    payload: commercialista
                });
                dispatch(fetchCommercialisti(auth, idAzienda));
            }
        });
    };
}

export function setCommercialistaReset (codiceFiscale, ragioneSociale) {

    return {
        type: SET_COMMERCIALISTA_RESET,
        payload: {codiceFiscale: codiceFiscale, ragioneSociale: ragioneSociale}
    };
}
