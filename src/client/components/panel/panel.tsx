import * as React from 'react';
import { observer } from 'mobx-react';
import {AppState} from "../../store";
import { remote } from 'electron';
import {OpenButton, PanelButton, PlayButton} from "../panel-button/panel-button";
require('./panel.css');

interface PlayerPanelProps {
  s: AppState;
}

@observer
export class PlayerPanel extends React.Component<PlayerPanelProps> {
  render() {
    return <div className={"player-panel"}>
      <PlayButton onClick={this.togglePause.bind(this)} s={this.props.s.player} />
      <OpenButton onClick={this.loadFile.bind(this)} />
    </div>
  }

  loadFile() {
    let files = remote.dialog.showOpenDialog({

    });
    if (files && files.length) {
      this.props.s.player.loadFile(files[0]);
    }
  }

  togglePause() {
    this.props.s.player.setPause(!this.props.s.player.pause);
  }
}
