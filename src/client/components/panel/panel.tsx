import * as React from 'react';
import { observer } from 'mobx-react';
import {AppState} from "../../store";
import { remote } from 'electron';
import {OpenButton, PanelButton, PlayButton} from "../panel-button/panel-button";
import {PlayerProgress} from "../progress/progress";
import {VolumeControl} from "../volume/volume";
import {FullScreenIcon} from "../icons/icon";
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
      <div className="player-panel__progress">
        <PlayerProgress s={this.props.s.player} />
      </div>
      <div className={"player-panel__volume"}>
        <VolumeControl s={this.props.s.player} />
      </div>
      <PanelButton onClick={this.toggleFullScreen.bind(this)}>
        <FullScreenIcon />
      </PanelButton>
    </div>
  }

  loadFile() {
    remote.dialog.showOpenDialog({

    }, (files: string[]) => {
      if (files && files.length) {
        this.props.s.player.loadFile(files[0]);
      }
    });
  }

  togglePause() {
    this.props.s.player.setPause(!this.props.s.player.pause);
  }

  toggleFullScreen() {
    this.props.s.player.setFullScreen(!this.props.s.player.fullscreen);
  }
}
