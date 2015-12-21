import {autobind} from "core-decorators";
import * as ui from "material-ui";
import React, {Component, PropTypes} from "react";

import Icon from "components/icon";
import Spacer from "components/spacer";
import * as AppPropTypes from "lib/app-prop-types";
import * as colors from "lib/colors";

const styles = {
    buttonsFooter: {
        textAlign: "right"
    },
    buttonRetry: {
        textAlign: "center"
    }
};

export default class LoginForm extends Component {

    static propTypes = {
        auth: AppPropTypes.auth.isRequired,
        login: PropTypes.func.isRequired,
        resetLogin: PropTypes.func.isRequired
    }

    @autobind
    login () {
        const username = this.refs.username.getValue();
        const password = this.refs.password.getValue();
        this.props.login(username, password);
    }

    @autobind
    retry () {
        this.props.resetLogin();
    }

    renderSpinner () {
        const {auth: {loggingIn}} = this.props;
        return loggingIn ? (
            <div style={{textAlign: "center", padding: "30px"}}>
                <ui.CircularProgress mode="indeterminate" />
            </div>
        ) : null;
    }

    renderError () {
        const {auth: {loginError}} = this.props;
        return loginError ? (
            <div style={{textAlign: "center", padding: "30px"}}>
                <Icon
                    color={colors.red500}
                    icon="error_outline"
                    style={{fontSize: "48px"}}
                />
                <p>{loginError.message}</p>
                <div style={styles.buttonRetry}>
                    <Spacer direction="v" size={48}/>
                    <ui.FlatButton label="Riprova" onClick={this.retry} secondary={true}/>
                </div>
            </div>
        ) : null;
    }

    renderForm () {
        const {auth: {loggingIn, loginError}} = this.props;
        return !loggingIn && !loginError ? (
            <div>
                <ui.TextField
                    floatingLabelText="Username"
                    fullWidth={true}
                    hintText="Username"
                    ref="username"
                    type="text"
                />
                <ui.TextField
                    floatingLabelText="Password"
                    fullWidth={true}
                    hintText="Password"
                    ref="password"
                    type="password"
                />
                <div style={styles.buttonsFooter}>
                    <Spacer direction="v" size={48}/>
                    <ui.FlatButton label="Prosegui" onClick={this.login} secondary={true}/>
                </div>
            </div>
        ) : null;
    }

    render () {
        const {auth: {loginAuth}} = this.props;
        return !loginAuth ? (
            <ui.Dialog
                modal={true}
                openImmediately={true}
                title="Login"
            >
                {this.renderSpinner()}
                {this.renderError()}
                {this.renderForm()}
            </ui.Dialog>
        ) : null;
    }

}
