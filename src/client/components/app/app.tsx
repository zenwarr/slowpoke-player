import * as React from 'react';
import {observer} from "mobx-react";
import {remote} from 'electron';
import {AppState} from "../../store";
import {Player} from "../player/player";
import {PlayerPanel} from "../panel/panel";
import DevTools from "mobx-react-devtools";
import {cn} from "../utils";
require('./app.css');
require('./vars.css');

interface AppProps {
  s: AppState;
}

@observer
export class App extends React.Component<AppProps> {
  render() {
    let classname = cn("app", this.props.s.player.fullscreen ? "app--fullscreen" : null);

    return <div className={classname}>
      <div className="app__player">
        <Player s={this.props.s.player} />
      </div>

      <div className={"app__panel"}>
        <PlayerPanel s={this.props.s}/>
      </div>

      <DevTools />
    </div>
  }
}
