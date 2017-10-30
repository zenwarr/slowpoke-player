import * as React from 'react';
import {PlayerState} from "../../player-store";
import {observer} from "mobx-react";
import {autobind} from "core-decorators";
import {Slider} from "../slider/slider";

export interface PlayerProgressProps {
  extraClasses?: string;
  s: PlayerState;
}

@observer
export class PlayerProgress extends React.Component<PlayerProgressProps> {
  render() {
    return <Slider extraClasses={"slider--progress"} percent={this.props.s.percent_pos} onChange={this.onChange} enabled={this.props.s.fileLoaded} />
  }

  @autobind
  onChange(new_value: number): void {
    this.props.s.seek(new_value);
  }
}
