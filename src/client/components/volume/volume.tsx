import * as React from 'react';
import {observer} from "mobx-react";
import {PlayerState} from "../../player-store";
import {autobind} from "core-decorators";
import {MuteButton} from "../panel-button/panel-button";
import {Slider} from "../slider/slider";
require('./volume.css');

export interface VolumeControlProps {
  s: PlayerState;
}

@observer
export class VolumeControl extends React.Component<VolumeControlProps> {
  render() {
    return <div className={"volume-control"}>
      <MuteButton extraClasses={"volume-control__mute"} s={this.props.s} onClick={this.onMuteButtonClick}/>
      <div className={"volume-control__slider"}>
        <Slider percent={this.props.s.volume} onChange={this.onChange} disabled={this.props.s.mute}/>
      </div>
    </div>;
  }

  @autobind
  onMuteButtonClick(): void {
    this.props.s.setMute(!this.props.s.mute);
  }

  @autobind
  onChange(new_volume: number): void {
    this.props.s.setVolume(new_volume);
  }
}
