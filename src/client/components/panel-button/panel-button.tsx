import * as React from 'react';
import {PlayerState} from "../../player-store";
import {observer} from "mobx-react";
import {MuteIcon, OpenIcon, PlayPauseIcon} from "../icons/icon";
import {cn} from "../utils";
require('./panel-button.css');

interface PanelButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
  extraClasses?: string;
  enabled?: boolean;
}

export class PanelButton extends React.Component<PanelButtonProps> {
  render() {
    return <button className={cn('panel-btn', this.props.extraClasses)} onClick={this.props.onClick} tabIndex={-1} disabled={this.props.enabled === false}>
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
    return <PanelButton extraClasses={"panel-btn--play"} onClick={this.props.onClick}
                        enabled={this.props.s.fileLoaded}>
      <PlayPauseIcon s={this.props.s}/>
    </PanelButton>;
  }
}

export class OpenButton extends React.Component<PanelButtonProps> {
  render() {
    return <PanelButton extraClasses={"panel-btn--open"} onClick={this.props.onClick}
                        enabled={this.props.enabled}>
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
    return <PanelButton extraClasses={"panel-btn--mute"} onClick={this.props.onClick}
                        enabled={this.props.enabled}>
      <MuteIcon s={this.props.s} />
    </PanelButton>;
  }
}
