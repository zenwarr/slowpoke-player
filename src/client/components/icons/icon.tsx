import * as React from 'react';
import {PlayerState} from "../../player-store";
import {observer} from "mobx-react";

export const PlayIcon = () => {
  return <svg className="i i--play" viewBox={"0 0 36 36"}>
    <path className={"i__path"} d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" />
  </svg>;
};

export const PauseIcon = () => {
  return <svg className={"i i--pause"} viewBox={"0 0 36 36"}>
    <path className={"i__path"} d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26"/>
  </svg>
};

export interface PlayPauseProps {
  s: PlayerState;
}

export const PlayPauseIcon = observer((props: PlayPauseProps) => {
  return props.s.pause ? <PlayIcon /> : <PauseIcon />;
});

export const OpenIcon = () => {
  return <svg className={"i i--open"} viewBox={"0 0 36 36"}>
    <path className={"i__path"} d="M31,14.74H29.54V11.88a1.06,1.06,0,0,0-1.06-1.06H18.15L16.78,8.6a1,1,0,0,0-.85-.53H8.26a1,1,0,0,0-1,1.06v5.61H6.08A1.06,1.06,0,0,0,5,16L7.25,26.17a1.07,1.07,0,0,0,1,.85H28.48a1.08,1.08,0,0,0,1.06-.79L32,16A1,1,0,0,0,31,14.74ZM9.31,10.13h6l1.38,2.28a1,1,0,0,0,.9.48h9.9v1.85H9.31ZM27.68,24.9H9.1L7.36,16.8H29.64Z"/>
  </svg>
};

export interface MuteProps {
  s: PlayerState;
}

export const MuteIcon = observer((props: MuteProps) => {
  return <svg className={"i i--mute"} viewBox={"0 0 36.8 36"}>
    <path className={"i__path"} d="M23,0.1c-0.4-0.2-1-0.2-1.4,0.1L7.1,10.9c-0.2-0.2-0.5-0.3-0.9-0.3h-5c-0.7,0-1.3,0.6-1.3,1.3v12.2c0,0.7,0.6,1.3,1.3,1.3 h5c0.3,0,0.6-0.1,0.9-0.3l14.5,10.6c0.2,0.2,0.5,0.3,0.8,0.3c0.2,0,0.4,0,0.6-0.1c0.4-0.2,0.7-0.7,0.7-1.2l0-33.3 C23.7,0.8,23.5,0.4,23,0.1z M2.7,13.2H5v9.6H2.7V13.2z M7.6,22.2v-8.3l13.5-9.9l0,28.1L7.6,22.2z"/>
    <path className={"i__path i__path--cross"} d="M32.5,18l3.9-3.9c0.5-0.5,0.5-1.4,0-1.9c-0.5-0.5-1.4-0.5-1.9,0l-3.9,3.9l-3.9-3.9c-0.5-0.5-1.4-0.5-1.9,0 c-0.5,0.5-0.5,1.4,0,1.9l3.9,3.9l-3.9,3.9c-0.5,0.5-0.5,1.4,0,1.9c0.3,0.3,0.6,0.4,0.9,0.4s0.7-0.1,0.9-0.4l3.9-3.9l3.9,3.9 c0.3,0.3,0.6,0.4,0.9,0.4c0.3,0,0.7-0.1,0.9-0.4c0.5-0.5,0.5-1.4,0-1.9L32.5,18z" fill={props.s.mute ? '' : 'none'}/>
  </svg>
});
