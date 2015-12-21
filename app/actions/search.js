import {is} from "ramda";

import {API_URL} from "lib/config";

const transport = new Thrift.TXHRTransport(API_URL, {useCORS:true});
const protocol = new Thrift.Protocol(transport);
const anagraficaClient = new ConsoleAnagraficaApiClient(protocol);

export const RICERCA_FETCH_START = "RICERCA_FETCH_START";
export const RICERCA_FETCH_SUCCESS = "RICERCA_FETCH_SUCCESS";
export const RICERCA_FETCH_ERROR = "RICERCA_FETCH_ERROR";

export const RICERCA_ADD_INVITE_START = "RICERCA_ADD_INVITE_START";
export const RICERCA_ADD_INVITE_SUCCESS = "RICERCA_ADD_INVITE_SUCCESS";
export const RICERCA_ADD_INVITE_ERROR = "RICERCA_ADD_INVITE_ERROR";
export const RICERCA_ADD_INVITE_RESET = "RICERCA_ADD_INVITE_RESET";

export function fetchRicerca (auth, idFiscale) {
    return dispatch => {
        dispatch({
            type: RICERCA_FETCH_START
        });
        var request = new AziendaPerIdFiscaleList({idFiscale});
        anagraficaClient.aziendaPerIdFiscaleList(new Auth(auth), request, function (result) {
            if (is(Error, result)) {
                dispatch({
                    type: RICERCA_FETCH_ERROR,
                    error: new Error("Errore nella ricerca per identificativo fiscale - " + JSON.stringify(result.message))});
            } else {
                dispatch({
                    type: RICERCA_FETCH_SUCCESS,
                    payload: result
                });
            }
        });

    };
}

export function addInvite (securityToken, idUtente, invite) {
    return dispatch => {
        dispatch({
            type: RICERCA_ADD_INVITE_START,
            payload: invite
        });
        /*
        var auth = new Auth({"securityToken" : securityToken});
        var newDest = new DestinazioneRequest({"email" : destinazione.email, "descrizione" : destinazione.descrizione});
        var dest = new DestinazioniCreate({"idUtente" : idUtente, "destinazioni" : [newDest]});
        clientB2B.destinazioniCreate(auth, dest, function (result) {
            if (is(Error, result)) {
                dispatch({
                    type: DESTINAZIONI_ADD_ERROR,
                    error: new Error("Errore nell'aggiunta della destinazione")
                });
            } else {
                dispatch({
                    type: DESTINAZIONI_ADD_SUCCESS,
                    payload: destinazione
                });
                dispatch(fetchDestinazioni(securityToken, idUtente));
            }
        });
        */
        dispatch({
            type: RICERCA_ADD_INVITE_SUCCESS,
            payload: invite
        });
    };
}

export function addInviteReset () {
    return {
        type: RICERCA_ADD_INVITE_RESET
    };
}
