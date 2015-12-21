import {autobind} from "core-decorators";
import {CircularProgress, Dialog, FlatButton, Paper} from "material-ui";
import {last} from "ramda";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {replaceState} from "redux-router";

import * as utentiActions from "actions/utenti";
import CollectionTable from "components/collection-table";
import UtentiForm from "components/utenti-form";
import Icon from "components/icon";
import * as AppPropTypes from "lib/app-prop-types";
import * as colors from "lib/colors";

function mapStateToProps ({auth, utenti, router}) {
    return {
        auth,
        utenti,
        router
    };
}

function mapDispatchToProps (dispatch) {
    return {
        ...bindActionCreators(utentiActions, dispatch),
        goToInsert: () => {
            dispatch(utentiActions.addUtenteReset());
            dispatch(replaceState(null, "/servizi/utenti/new"));
        },
        goToList: () => dispatch(replaceState(null, "/servizi/utenti"))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Utenti extends Component {

    static propTypes = {
        addUtente: PropTypes.func.isRequired,
        auth: AppPropTypes.auth.isRequired,
        fetchUtenti: PropTypes.func.isRequired,
        goToInsert: PropTypes.func.isRequired,
        goToList: PropTypes.func.isRequired,
        router: PropTypes.object.isRequired,
        utenti: AppPropTypes.collection
    }

    componentDidMount () {
        this.props.fetchUtenti(this.props.auth.loginAuth, this.props.auth.loggedUser.idAzienda);
    }

    @autobind
    handleSubmit (utente) {
        const {addUtente} = this.props;
        addUtente(this.props.auth.loginAuth, utente, this.props.auth.loggedUser.idAzienda);
    }

    renderInsertForm () {
        const {utenti, goToList} = this.props;
        const renderForm = (
            !utenti.isAdding &&
            !utenti.lastAdded &&
            !utenti.addError
        );
        return renderForm ? (
            <UtentiForm
                formKey="creazioneUtente"
                onCancel={goToList}
                onSubmit={this.handleSubmit}
            />
        ) : null;
    }

    renderInsertWaiting () {
        const {utenti} = this.props;
        return utenti.isAdding ? (
            <div style={{textAlign: "center", padding: "30px"}}>
                <CircularProgress mode="indeterminate" />
            </div>
        ) : null;
    }

    renderInsertError () {
        const {utenti, goToList} = this.props;
        return utenti.addError ? (
            <div style={{textAlign: "center", padding: "30px"}}>
                <Icon
                    color={colors.red500}
                    icon="error_outline"
                    style={{fontSize: "48px"}}
                />
                <p>
                    {"Errore durante la creazione dell'utente"}
                </p>
                <FlatButton label="Chiudi" onClick={goToList} secondary={true} />
            </div>
        ) : null;
    }

    renderInsertSuccess () {
        const {utenti, goToList} = this.props;
        return utenti.lastAdded ? (
            <div style={{textAlign: "center", padding: "30px"}}>
                <Icon
                    color={colors.green500}
                    icon="done"
                    style={{fontSize: "48px"}}
                />
                <p>
                    {`
                        È stata inviata una mail di registrazione a
                        ${utenti.lastAdded}
                    `}
                </p>
                <FlatButton label="Chiudi" onClick={goToList} secondary={true} />
            </div>
        ) : null;
    }

    renderInsertDialog () {
        const {router: {routes}} = this.props;
        return last(routes).name === "servizi-utenti-insert" ? (
            <Dialog
                modal={true}
                openImmediately={true}
                title="Aggiungi nuovo utente"
            >
                {this.renderInsertForm()}
                {this.renderInsertWaiting()}
                {this.renderInsertError()}
                {this.renderInsertSuccess()}
            </Dialog>
        ) : null;
    }

    render () {
        const {utenti, goToInsert} = this.props;
        return (
            <div style={{padding: "30px"}}>
                <p>
                    <b>{"Gestione utenti"}</b>
                </p>
                <Paper>
                    <CollectionTable
                        addButtonText="Aggiungi nuovo utente"
                        collection={utenti}
                        columns={["nome", "cognome", "email"]}
                        elementKeyProperty="email"
                        isDisplayableRowCheckbox={false}
                        onAdd={goToInsert}
                    />
                    {this.renderInsertDialog()}
                </Paper>
            </div>

        );
    }

}
