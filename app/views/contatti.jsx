import {Paper} from "material-ui";
import React, {Component} from "react";


export default class Contatti extends Component {

    render () {
        return (
            <div style={{margin: "30px"}}>
                <Paper style={{margin: "30px", padding: "30px"}}>
                    <h2>{"Contatti"}</h2>
                    <p>
                        {"informazioni e contatti commerciali: "}
                        <a href="mailto:info@immobiliaregranma.it">{"info@immobiliaregranma.it"}</a>
                        <br />
                        {"amministrazione:"}
                        <a href="mailto:amministrazione@immobiliaregranma.it">{"amministrazione@immobiliaregranma.it"}</a>
                        <br />
                        {"telefono:"}
                        <a href="tel:3381353238">{"3381353238"}</a>
                    </p>
                </Paper>
            </div>

        );
    }

}
