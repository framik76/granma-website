import {autobind} from "core-decorators";
import ui from "material-ui";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {pushState} from "redux-router";

function mapDispatchToProps (dispatch) {
    return {
        pushState: bindActionCreators(pushState, dispatch)
    };
}

@connect(null, mapDispatchToProps)
export default class Home extends Component {

    static propTypes = {
        pushState: PropTypes.func.isRequired
    }

    @autobind
    navigateTo (destination) {
        return () => this.props.pushState(null, destination);
    }

    render () {
        return (
            <div>
                <ui.Paper style={{padding: "30px", textAlign: "center"}}>
                    <h1>
                        {"TI AIUTIAMO A RISOLVERE I TUOI PROBLEMI IMMOBILIARI"}
                    </h1>
                </ui.Paper>
            </div>
        );
    }

}
