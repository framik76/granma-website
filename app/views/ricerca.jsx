import {Paper} from "material-ui";
import React, {Component} from "react";

import Ricerca from "components/ricerca";

export default class Servizi extends Component {

    render () {
        return (
            <div style={{margin: "30px"}}>
                <Paper style={{margin: "30px"}}>
                    <Ricerca title="" />
                </Paper>
            </div>

        );
    }

}
