import * as React from 'react';
import { observer } from 'mobx-react';
import {AppState} from "../../store";
import { remote } from 'electron';

interface PlayerPanelProps {
  s: AppState;
}

@observer
export class PlayerPanel extends React.Component<PlayerPanelProps> {
  render() {
    return <div className={"player-panel"}>
      <button onClick={this.loadFile.bind(this)}>Load file...</button>
      <button onClick={this.togglePause.bind(this)}>Play/pause</button>
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
