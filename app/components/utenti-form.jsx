import {FlatButton, Paper, TextField} from "material-ui";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {isEmail, isNull} from "validator";

import BaseCheckboxForm from "components/base-checkbox-form";
import * as AppPropTypes from "lib/app-prop-types";
import Spacer from "components/spacer";

const styles = {
    buttonsFooter: {
        textAlign: "right"
    }
};

function mapStateToProps ({auth, uffici, router}) {
    return {
        auth,
        uffici,
        router
    };
}

function validate (values) {
    const errors = {};
    if (isNull(values.email)) {
        errors.email = "Obbligatorio";
    } else if (!isEmail(values.email)) {
        errors.email = "Indirizzo email non valido";
    }
    return errors;
}


@connect(mapStateToProps, null)
@reduxForm({
    form: "utente",
    fields: [
        "id",
        "linguaPrincipale",
        "email",
        "nome",
        "cognome",
        "ufficiSelezionati"
    ],
    validate
})
export default class UtenteForm extends Component {

    constructor (props, context) {
        super(props, context);
        this.store = context.store;
        this.state = {
            ufficiSelezionati: []
        };
    }

    static propTypes = {
        auth: AppPropTypes.auth.isRequired,
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        uffici: AppPropTypes.collection
    }

    render () {
        let uffici = [];
        for (var i = 0; i<this.props.uffici.elements.length; i++) {
            var uff = this.props.uffici.elements[i];
            uffici.push({payload: uff.id, text: uff.descrizione, value: false});
        }

        const {fields: {
            linguaPrincipale,
            email,
            nome,
            cognome,
            ufficiSelezionati
        }, handleSubmit, onCancel} = this.props;

        return (
            <div>
                <TextField
                    errorText={nome.touched ? nome.error : ""}
                    floatingLabelText="Nome"
                    fullWidth={true}
                    hintText="Nome"
                    {...nome}
                />
                <TextField
                    errorText={cognome.touched ? cognome.error : ""}
                    floatingLabelText="Cognome"
                    fullWidth={true}
                    hintText="Cognome"
                    {...cognome}
                />
                <TextField
                    errorText={email.touched ? email.error : ""}
                    floatingLabelText="Email"
                    fullWidth={true}
                    hintText="Email"
                    type="email"
                    {...email}
                />
                <TextField
                    errorText={linguaPrincipale.touched ? linguaPrincipale.error : ""}
                    floatingLabelText="Lingua principale"
                    fullWidth={true}
                    hintText="Lingua principale"
                    {...linguaPrincipale}
                />
                <Paper>
                    <p style={{padding: "10px"}}>{"Seleziona gli uffici da assegnare all'utente:"}</p>
                    <div style={{padding: "10px"}}>
                        <BaseCheckboxForm
                            fields={uffici}
                            value={uffici}
                            {...ufficiSelezionati}
                        />
                    </div>
                </Paper>

                <div style={styles.buttonsFooter}>
                    <Spacer direction="v" size={16} />
                    <FlatButton label="Annulla" onClick={onCancel} primary={true} />
                    <FlatButton label="Aggiungi" onClick={handleSubmit} secondary={true} />
                </div>
            </div>
        );
    }

}
