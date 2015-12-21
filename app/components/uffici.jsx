import {autobind} from "core-decorators";
import {CircularProgress, Dialog, FlatButton, Paper} from "material-ui";
import {last} from "ramda";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {replaceState} from "redux-router";

import * as ufficiActions from "actions/uffici";
import CollectionTable from "components/collection-table";
import UfficiForm from "components/uffici-form";
import Icon from "components/icon";
import * as AppPropTypes from "lib/app-prop-types";
import * as colors from "lib/colors";

function mapStateToProps ({auth, uffici, router}) {
    return {
        auth,
        uffici,
        router
    };
}

function mapDispatchToProps (dispatch) {
    return {
        ...bindActionCreators(ufficiActions, dispatch),
        goToInsert: () => {
            dispatch(ufficiActions.addUfficioReset());
            dispatch(replaceState(null, "/servizi/uffici/new"));
        },
        goToList: () => dispatch(replaceState(null, "/servizi/uffici"))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Uffici extends Component {

    static propTypes = {
        addUfficio: PropTypes.func.isRequired,
        auth: AppPropTypes.auth.isRequired,
        fetchUffici: PropTypes.func.isRequired,
        goToInsert: PropTypes.func.isRequired,
        goToList: PropTypes.func.isRequired,
        router: PropTypes.object.isRequired,
        uffici: AppPropTypes.collection
    };

    componentDidMount () {
        this.props.fetchUffici(this.props.auth.loginAuth, this.props.auth.loggedUser.idAzienda);
    }

    @autobind
    handleSubmit (ufficio) {
        const {addUfficio} = this.props;
        addUfficio(this.props.auth.loginAuth, this.props.auth.loggedUser.idAzienda, ufficio);
    }

    renderInsertForm () {
        const {uffici, goToList} = this.props;
        const renderForm = (
            !uffici.isAdding &&
            !uffici.lastAdded &&
            !uffici.addError
        );
        return renderForm ? (
            <UfficiForm
                formKey="registration"
                onCancel={goToList}
                onSubmit={this.handleSubmit}
            />
        ) : null;
    }

    renderInsertWaiting () {
        const {uffici} = this.props;
        return uffici.isAdding ? (
            <div style={{textAlign: "center", padding: "30px"}}>
                <CircularProgress mode="indeterminate" />
            </div>
        ) : null;
    }

    renderInsertError () {
        const {uffici, goToList} = this.props;
        return uffici.addError ? (
            <div style={{textAlign: "center", padding: "30px"}}>
                <Icon
                    color={colors.red500}
                    icon="error_outline"
                    style={{fontSize: "48px"}}
                />
                <p>
                    {"Errore durante l'inserimento dell'ufficio"}
                </p>
                <FlatButton label="Chiudi" onClick={goToList} secondary={true} />
            </div>
        ) : null;
    }

    renderInsertSuccess () {
        const {uffici, goToList} = this.props;
        return uffici.lastAdded ? (
            <div style={{textAlign: "center", padding: "30px"}}>
                <Icon
                    color={colors.green500}
                    icon="done"
                    style={{fontSize: "48px"}}
                />
                <p>
                    {`
                        È stata aggiunto correttamente un nuovo ufficio
                    `}
                </p>
                <FlatButton label="Chiudi" onClick={goToList} secondary={true} />
            </div>
        ) : null;
    }

    renderInsertDialog () {
        const {router: {routes}} = this.props;
        return last(routes).name === "servizi-uffici-insert" ? (
            <Dialog
                modal={true}
                openImmediately={true}
                title="Aggiungi nuovo ufficio"
            >
                {this.renderInsertForm()}
                {this.renderInsertWaiting()}
                {this.renderInsertError()}
                {this.renderInsertSuccess()}
            </Dialog>
        ) : null;
    }

    render () {
        const {uffici, goToInsert} = this.props;
        return (
            <div style={{padding: "30px"}}>
                <p>
                    <b>{"Gestione uffici"}</b>
                </p>
                <Paper>
                    <CollectionTable
                        addButtonText="Aggiungi nuovo ufficio"
                        collection={uffici}
                        columns={["id", "descrizione", "luogo"]}
                        elementKeyProperty="id"
                        isDisplayableRowCheckbox={false}
                        onAdd={goToInsert}
                    />
                    {this.renderInsertDialog()}
                </Paper>
            </div>

        );
    }

}
