import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Header from "components/header";
import Footer from "components/footer";
import LoginForm from "components/login-form";
import SideMenu from "components/side-menu";
import NavigationBar from "components/navigation-bar";
import * as AppPropTypes from "lib/app-prop-types";
import * as measures from "lib/measures";

const styles = {
    header: {
        position: "absolute",
        width: "100%",
        height: measures.headerHeight,
        top: "0px"
    },
    sideMenu: {
        position: "absolute",
        top: measures.headerHeight,
        width: measures.sideMenuWidth,
        height: `calc(100vw - ${measures.headerHeight})`,
        WebkitBoxShadow: "2px 0px 5px -2px #888",
        boxShadow: "2px 0px 5px -2px #888"
    },
    content: {
        position: "absolute",
        top: measures.headerHeight,
        left: measures.sideMenuWidth,
        width: `calc(100% - ${measures.sideMenuWidth})`,
        height: `calc(100% - ${measures.headerHeight})`
    }
};

function mapStateToProps ({auth}) {
    return {auth};
}


@connect(mapStateToProps, null)
export default class Root extends Component {


    static propTypes = {
        children: PropTypes.node,
        login: PropTypes.func.isRequired,
        resetLogin: PropTypes.func.isRequired,
        routerState: PropTypes.object
    };

    renderApp () {
        return (
            <div>
                <div style={styles.header}>
                    <Header />
                </div>
                <div style={styles.sideMenu}>
                    <SideMenu />
                </div>
                <div style={styles.content}>
                    {this.props.children}
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }

    render () {
        return this.renderApp();
    }

}
