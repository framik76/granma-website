import {autobind} from "core-decorators";
import * as ui from "material-ui";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {pushState} from "redux-router";

import Icon from "components/icon";
import * as colors from "lib/colors";
import * as config from "lib/config";

const styles = {
    list: {
        height: "100%",
        width: "100%",
        border: "0px",
        borderRightWidth: "1px",
        borderColor: colors.grey300,
        borderStyle: "solid",
        borderRadius: "0px"
    },
    active: {
        color: colors.red400
    }
};

function mapStateToProps ({router}) {
    return {
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
        pushState: PropTypes.func.isRequired,
        router: PropTypes.object.isRequired
    };

    @autobind
    navigateTo (destination) {
        return () => this.props.pushState(null, destination);
    }

    goToURL (url) {
        return () => window.open(url, "_blank");
    }

    render () {
        const path = this.props.router.location.pathname;
        return (
            <div>
                <ui.List style={styles.list}>
                    <ui.ListItem
                        leftIcon={<Icon icon="home" style={path.indexOf("/home") >= 0 ? styles.active : ""} />}
                        onTouchTap={this.navigateTo("home")}
                        primaryText="Home"
                        style={path.indexOf("/home") >= 0 ? styles.active : null}
                    />
                    <ui.ListItem
                        leftIcon={<Icon icon="location_city" style={path.indexOf("/affitti") >= 0 ? styles.active : ""} />}
                        onTouchTap={this.navigateTo("affitti")}
                        primaryText="Affitti"
                        style={path.indexOf("/affitti") >= 0 ? styles.active : null}
                    />
                    <ui.ListItem
                        leftIcon={<Icon icon="business" style={path.indexOf("/commerciali") >= 0 ? styles.active : ""} />}
                        onTouchTap={this.navigateTo("commerciali")}
                        primaryText="Commerciali"
                        style={path.indexOf("/commerciali") >= 0 ? styles.active : null}
                    />
                    <ui.ListItem
                        leftIcon={<Icon icon="description" style={path.indexOf("/servizi") >= 0 ? styles.active : ""} />}
                        onTouchTap={this.navigateTo("servizi")}
                        primaryText="Servizi"
                        style={path.indexOf("/servizi") >= 0 ? styles.active : null}
                    />
                    <ui.ListItem
                        leftIcon={<Icon icon="public" style={path.indexOf("/dovesiamo") >= 0 ? styles.active : ""} />}
                        onTouchTap={this.navigateTo("dovesiamo")}
                        primaryText="Dove siamo"
                        style={path.indexOf("/dovesiamo") >= 0 ? styles.active : null}
                    />
                    <ui.ListItem
                        leftIcon={<Icon icon="contacts" style={path.indexOf("/contatti") >= 0 ? styles.active : ""} />}
                        onTouchTap={this.navigateTo("contatti")}
                        primaryText="Contatti"
                        style={path.indexOf("/contatti") >= 0 ? styles.active : null}
                    />
                </ui.List>
            </div>

        );
    }

}
