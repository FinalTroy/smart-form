// styles
import "./Root.css";

import React, { FC } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Store from "./components/Store";
import Form from "./components/Form";

const Root: FC = () => (
    <Router>
        <Route exact path="/">
            <Store>
                <Form />
            </Store>
        </Route>
    </Router>
);

export default Root;
