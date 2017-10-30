import * as React from 'react';
import {PlayerState} from "../../player-store";
import {observer} from "mobx-react";
require('./panel-button.css');

interface PanelButtonProps {
  type?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

export class PanelButton extends React.Component<PanelButtonProps> {
  render() {
    let cn = "panel-btn " + (this.props.className ? this.props.className : '');
    return <button className={cn} type={this.props.type} onClick={this.props.onClick} tabIndex={-1}>
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
    return <PanelButton className={"panel-btn--play"} type={this.props.type} onClick={this.props.onClick}>
      <svg className={"panel-btn__svg"} viewBox={"0 0 36 36"}>
        <defs>
          <path id={"id-play-btn-pause"} className={"panel-btn__path"} d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" />
          <path id={"id-play-btn-play"} className={"panel-btn__path"} d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" />
        </defs>
        <use xlinkHref={this.props.s.pause ? "#id-play-btn-play" : "#id-play-btn-pause"} />
      </svg>
    </PanelButton>;
  }
}

export class OpenButton extends React.Component<PanelButtonProps> {
  render() {
    return <PanelButton className={"panel-btn--open"} type={this.props.type} onClick={this.props.onClick}>
      <svg className={"panel-btn__svg"} viewBox={"0 0 36 36"}>
        <path className={"panel-btn__path"} d="M31,14.74H29.54V11.88a1.06,1.06,0,0,0-1.06-1.06H18.15L16.78,8.6a1,1,0,0,0-.85-.53H8.26a1,1,0,0,0-1,1.06v5.61H6.08A1.06,1.06,0,0,0,5,16L7.25,26.17a1.07,1.07,0,0,0,1,.85H28.48a1.08,1.08,0,0,0,1.06-.79L32,16A1,1,0,0,0,31,14.74ZM9.31,10.13h6l1.38,2.28a1,1,0,0,0,.9.48h9.9v1.85H9.31ZM27.68,24.9H9.1L7.36,16.8H29.64Z"/>
      </svg>
    </PanelButton>;
  }
}
