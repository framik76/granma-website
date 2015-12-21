import React, {Component, PropTypes} from "react";
import {FlatButton} from "material-ui";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Spacer from "components/spacer";
import * as assets from "lib/assets";
import * as colors from "lib/colors";

const styles = {
    container: {
        position: "relative",
        height: "100%",
        width: "100%",
        background: colors.red100,
        color: colors.black
    },
    leftSide: {
        height: "180px",
        textAlign: "center"
    },
    rightSide: {
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: "0px",
        right: "0px",
        height: "100%"
    },
    headerButton: {
        color: colors.white
    },
    logo: {
        height: "80%"
    }
};


@connect(null, null)
export default class Header extends Component {

    static propTypes = {
    };

   render () {
       return (
            <div style={styles.container}>
                <div style={styles.leftSide}>
                    <Spacer direction="h" size={10} />
                    <img src={assets.images.logo} style={styles.logo} />
                    <Spacer direction="v" size={10} />
                    <h2>{"Immobiliare GranMa S.r.l."}</h2>
                    <Spacer direction="v" size={10} />
                    {"Gestione, locazione, compravendite immobiliari"}
                </div>
            </div>
       );
   }

}
