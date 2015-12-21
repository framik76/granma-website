import chai from "chai";
import jsdom from "jsdom";
import React from "react";
import TestUtils from "react-addons-test-utils";
import sinon from "sinon";
import sinonChai from "sinon-chai";

// Setup fake DOM
global.document = jsdom.jsdom();
global.window = document.defaultView;
global.navigator = {
    userAgent: "node.js"
};

// Setup sinon and chai
global.sinon = sinon;
chai.use(sinonChai);
global.expect = chai.expect;

// Setup React
global.React = React;
global.TestUtils = TestUtils;
