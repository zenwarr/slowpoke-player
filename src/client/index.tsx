import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {getStore} from "./store";
import {App} from "./components/app/app";

let appRoot = document.createElement('div');
document.body.appendChild(appRoot);

let store = getStore();

ReactDOM.render(
    <App s={store} />,
    appRoot
);
