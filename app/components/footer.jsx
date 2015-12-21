import ui from "material-ui";
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
export default class Footer extends Component {

    static propTypes = {
    };

   render () {
       return (
            <div style={styles.container}>
                <div>
                    <ui.Paper style={{padding: "30px", textAlign: "center"}}>
                        <Spacer direction="v" size={10} />
                        {"Immobiliare GranMa s.r.l. - via dei tigli 16 - 24010 Piazzatorre (BG)"}
                        <Spacer direction="v" size={10} />
                        {"Codice fiscale/Partita IVA: 03303410165 - capitale sociale 40000 euro interamente versato"}
                    </ui.Paper>

                </div>
            </div>
       );
   }

}
