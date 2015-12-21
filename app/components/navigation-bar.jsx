import * as ui from "material-ui";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {pushState} from "redux-router";

import Icon from "components/icon";

const styles = {
    grigioTopoBar: {
        backgroundColor: "#E0E0E0",
        color: "#333"
    }
};

function mapStateToProps ({auth, router}) {
    return {
        auth,
        router
    };
}

function mapDispatchToProps (dispatch) {
    return {
        pushState: bindActionCreators(pushState, dispatch)
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SideMenu extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        pushState: PropTypes.func.isRequired,
        router: PropTypes.object.isRequired
    }

    render () {
        const path = this.props.router.location.pathname;
        var title = "";
        if (path.indexOf("/home") >= 0) {
            title = "DASHBOARD";
        } else if (path.indexOf("/servizi") >= 0) {
            title = "SERVIZI";
        } else if (path.indexOf("/ricerca") >= 0) {
            title = "RICERCA";
        }
        return (
            <ui.AppBar
                showMenuIconButton={false}
                style={styles.grigioTopoBar}
                title={<h3 style={{color: "#333", fontWeight: "normal"}}>{title}</h3>}
            />
            );
    }

}
