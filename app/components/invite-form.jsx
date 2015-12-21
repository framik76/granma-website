import {FlatButton, TextField} from "material-ui";
import React, {Component, PropTypes} from "react";
import {reduxForm} from "redux-form";
import {isEmail, isNull} from "validator";

import Spacer from "components/spacer";

const styles = {
    buttonsFooter: {
        textAlign: "right"
    }
};

function validate (values) {
    const errors = {};
    if (isNull(values.email)) {
        errors.email = "Obbligatorio";
    } else if (!isEmail(values.email)) {
        errors.email = "Indirizzo email non valido";
    }
    return errors;
}

@reduxForm({
    form: "invito",
    fields: [
        "email"
    ],
    validate
})
export default class InviteForm extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    }

    render () {
        const {fields: {
            email
        }, handleSubmit, onCancel} = this.props;
        return (
            <div>
                <TextField
                    errorText={email.touched ? email.error : ""}
                    floatingLabelText="Email"
                    fullWidth={true}
                    hintText="Email"
                    type="email"
                    {...email}
                />
                <div style={styles.buttonsFooter}>
                    <Spacer direction="v" size={16} />
                    <FlatButton label="Annulla" onClick={onCancel} primary={true} />
                    <FlatButton label="Invia" onClick={handleSubmit} secondary={true} />
                </div>
            </div>
        );
    }

}
