import {FlatButton, TextField} from "material-ui";
import React, {Component, PropTypes} from "react";
import {reduxForm} from "redux-form";
import {isNull} from "validator";

import Spacer from "components/spacer";

const styles = {
    buttonsFooter: {
        textAlign: "right"
    }
};

function validate (values) {
    const errors = {};
    const required = ["descrizione", "indirizzo", "cap", "citta", "provincia", "nazione"];
    required.forEach(function (value) {
        if (isNull(values[value])) {
            errors[value] = "Obbligatorio";
        }
    });
    return errors;
}

@reduxForm({
    form: "ufficio",
    fields: [
        "descrizione",
        "indirizzo",
        "cap",
        "citta",
        "provincia",
        "nazione"
    ],
    validate
})
export default class UfficioForm extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    };

    render () {
        const {fields: {
            descrizione,
            indirizzo,
            cap,
            citta,
            provincia,
            nazione
        }, handleSubmit, onCancel} = this.props;
        return (
            <div>
                <TextField
                    errorText={descrizione.touched ? descrizione.error : ""}
                    floatingLabelText="Descrizione"
                    fullWidth={true}
                    hintText="Descrizione"
                    {...descrizione}
                />
                <TextField
                    errorText={indirizzo.touched ? indirizzo.error : ""}
                    floatingLabelText="Indirizzo"
                    fullWidth={true}
                    hintText="Indirizzo"
                    {...indirizzo}
                />
                <TextField
                    errorText={cap.touched ? cap.error : ""}
                    floatingLabelText="CAP"
                    fullWidth={true}
                    hintText="CAP"
                    {...cap}
                />
                <TextField
                    errorText={citta.touched ? citta.error : ""}
                    floatingLabelText="Città"
                    fullWidth={true}
                    hintText="Città"
                    {...citta}
                />
                <TextField
                    errorText={provincia.touched ? provincia.error : ""}
                    floatingLabelText="Provincia"
                    fullWidth={true}
                    hintText="Provincia"
                    {...provincia}
                />
                <TextField
                    errorText={nazione.touched ? nazione.error : ""}
                    floatingLabelText="Nazione"
                    fullWidth={true}
                    hintText="Nazione"
                    {...nazione}
                />
                <div style={styles.buttonsFooter}>
                    <Spacer direction="v" size={16} />
                    <FlatButton label="Annulla" onClick={onCancel} primary={true} />
                    <FlatButton label="Aggiungi" onClick={handleSubmit} secondary={true} />
                </div>
            </div>
        );
    }

}
