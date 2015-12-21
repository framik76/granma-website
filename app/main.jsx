import "babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import injectTapEventPlugin from "react-tap-event-plugin";

import routes from "lib/routes";
import store from "lib/redux-store";

import "init-scripts/touch-events";

injectTapEventPlugin();

const App = (
    <Provider store={store}>
        {routes}
    </Provider>
);

ReactDOM.render(App, document.getElementById("root"));
