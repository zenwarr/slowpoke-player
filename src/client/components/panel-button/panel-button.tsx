import * as React from 'react';
import {PlayerState} from "../../player-store";
import {observer} from "mobx-react";
import {MuteIcon, OpenIcon, PlayPauseIcon} from "../icons/icon";
import {cn} from "../utils";
require('./panel-button.css');

interface PanelButtonProps {
  type?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  extraClasses?: string;
}

export class PanelButton extends React.Component<PanelButtonProps> {
  render() {
    return <button className={cn('panel-btn', this.props.extraClasses)} type={this.props.type} onClick={this.props.onClick} tabIndex={-1}>
      {this.props.children}
    </button>
  }
}

interface PlayButtonProps extends PanelButtonProps {
  s: PlayerState;
}

@observer
export class PlayButton extends React.Component<PlayButtonProps> {
  render() {
    return <PanelButton extraClasses={"panel-btn--play"} type={this.props.type} onClick={this.props.onClick}>
      <PlayPauseIcon s={this.props.s}/>
    </PanelButton>;
  }
}

export class OpenButton extends React.Component<PanelButtonProps> {
  render() {
    return <PanelButton extraClasses={"panel-btn--open"} type={this.props.type} onClick={this.props.onClick}>
      <OpenIcon />
    </PanelButton>;
  }
}

export interface MuteButtonProps extends PanelButtonProps {
  s: PlayerState;
}

@observer
export class MuteButton extends React.Component<MuteButtonProps> {
  render() {
    return <PanelButton extraClasses={"panel-btn--mute"} type={this.props.type} onClick={this.props.onClick}>
      <MuteIcon s={this.props.s} />
    </PanelButton>;
  }
}
