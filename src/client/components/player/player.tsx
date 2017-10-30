import * as React from 'react';
import {observer} from "mobx-react";
import {MpvPlayer} from "libmpvjs";
import {PlayerState} from "../../player-store";
require('./player.css');

interface PlayerProps {
  s: PlayerState;
}

const PROPS_TO_OBSERVE = [ 'pause', 'filename', 'width', 'height', 'percent-pos', 'mute', 'volume' ];

@observer
export class Player extends React.Component<PlayerProps> {
  render() {
    let width = this.props.s.width ? this.props.s.width : 1280,
        height = this.props.s.height ? this.props.s.height : 720;

    let aspect = height / width;

    return <div className={"player"}>
      <div className={"player__aspect"} style={{paddingBottom: (aspect * 100) + '%'}}>
        <canvas className={"player__canvas"} width={width} height={height} ref={
          canvas => {
            this._canvas = canvas;
          }
        } />
      </div>
    </div>;
  }

  componentDidMount() {
    if (this._canvas) {
      this._initMpv();
    }
  }

  componentWillUnmount() {
    this.props.s.mpv = null;
  }

  /** Protected area **/

  protected _canvas: HTMLCanvasElement|null = null;
  protected _player: HTMLElement|null = null;

  protected _initMpv() {
    if (this._canvas) {
      let mpv = new MpvPlayer(this._canvas, {
        onLog: text => console.log(text)
      });
      mpv.create();
      for (let prop of PROPS_TO_OBSERVE) {
        let normalized = prop.replace('-', '_');
        mpv.observeProperty(prop, value => {
          (this.props.s as any)[normalized] = value;
        });
      }
      this.props.s.mpv = mpv;
    }
  }
}
