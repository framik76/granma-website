import React from "react";
import {Redirect, Route} from "react-router";
import {ReduxRouter} from "redux-router";

import Home from "views/home";
import Root from "views/root";
import Affitti from "views/affitti";
import Commerciali from "views/commerciali";
import Servizi from "views/servizi";
import Dovesiamo from "views/dovesiamo";
import Contatti from "views/contatti";

export default (
    <ReduxRouter>
        <Route component={Root} name="root">
            <Redirect from="/" to="/home" />
            <Route component={Home} name="home" path="/home" />
            <Route component={Affitti} name="affitti" path="/affitti" />
            <Route component={Commerciali} name="commerciali" path="/commerciali" />
            <Route component={Servizi} name="servizi" path="/servizi" />
            <Route component={Dovesiamo} name="dovesiamo" path="/dovesiamo" />
            <Route component={Contatti} name="contatti" path="/contatti" />
        </Route>
    </ReduxRouter>
);
