import * as React from 'react';
import {PlayerState} from "../../player-store";
import {observer} from "mobx-react";
import {cn} from "../utils";
require('./icon.css');

export const PlayIcon = () => {
  return <svg className="i i--play" viewBox={"0 0 36 36"} width={36} height={36}>
    <path className={"i__path"} d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" />
  </svg>;
};

export const PauseIcon = () => {
  return <svg className={"i i--pause"} viewBox={"0 0 36 36"} width={36} height={36}>
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
  return <svg className={"i i--open"} viewBox={"0 0 36 36"} width={36} height={36}>
    <path className={"i__path"} d="M31,14.74H29.54V11.88a1.06,1.06,0,0,0-1.06-1.06H18.15L16.78,8.6a1,1,0,0,0-.85-.53H8.26a1,1,0,0,0-1,1.06v5.61H6.08A1.06,1.06,0,0,0,5,16L7.25,26.17a1.07,1.07,0,0,0,1,.85H28.48a1.08,1.08,0,0,0,1.06-.79L32,16A1,1,0,0,0,31,14.74ZM9.31,10.13h6l1.38,2.28a1,1,0,0,0,.9.48h9.9v1.85H9.31ZM27.68,24.9H9.1L7.36,16.8H29.64Z"/>
  </svg>
};

export interface MuteProps {
  s: PlayerState;
}

export const MuteIcon = observer((props: MuteProps) => {
  let cross_c = cn("i__path i__path--cross", props.s.mute ? "i__path--hide" : null);

  return <svg className={"i i--mute"} viewBox="0 0 28.43 28.13" width={28.43} height={28.13}>
    <path className={"i__path"} d="M17.81.11a1.07,1.07,0,0,0-1.08.08L5.55,8.55a.93.93,0,0,0-.69-.23H1a1,1,0,0,0-1,1v9.53a1,1,0,0,0,1,1H4.86a1.23,1.23,0,0,0,.69-.23L16.73,27.9a.87.87,0,0,0,.62.23,1,1,0,0,0,.46-.08,1.09,1.09,0,0,0,.54-.94v-26A1.06,1.06,0,0,0,17.81.11ZM2.16,10.35H3.93v7.5H2.16Zm3.78,7V10.89L16.35,3.16v22Z"/>
    <path className={cross_c} d="M25.14,14.1l3-3a1.1,1.1,0,0,0,0-1.48,1.06,1.06,0,0,0-1.47,0l-3,3-3-3a1.06,1.06,0,0,0-1.47,0,1.1,1.1,0,0,0,0,1.48l3,3-3,3a1.1,1.1,0,0,0,0,1.48.94.94,0,0,0,.69.31.83.83,0,0,0,.69-.31l3-3,3,3a.94.94,0,0,0,.69.31.83.83,0,0,0,.69-.31,1.1,1.1,0,0,0,0-1.48Z"/>
  </svg>;
});
