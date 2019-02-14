import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {getStore} from "./store";
import {App} from "./components/app/app";
import {remote} from 'electron';

let appRoot = document.createElement('div');
document.body.appendChild(appRoot);

let store = getStore();

let curWindow = remote.getCurrentWindow();
curWindow.addListener('enter-full-screen', () => {
  store.player.fullscreen = true;
});
curWindow.addListener('leave-full-screen', () => {
  store.player.fullscreen = false;
});

const render = (Component: typeof App) => {
  ReactDOM.render(
      <AppContainer>
        <Component s={store} />
      </AppContainer>,
      appRoot
  );
};

render(App);

if ((module as any).hot) {
  (module as any).hot.accept('./components/app/app', () => render(App));
}
