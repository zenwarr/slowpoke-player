import {observable, action} from "mobx";
import * as mpv from 'libmpvjs';

export class PlayerState {
  @observable mpv: mpv.MpvPlayer|null = null;
  @observable filename: string|null = null;
  @observable pause: boolean = true;
  @observable width: number = 0;
  @observable height: number = 0;

  @action loadFile(filename: string): void {
    if (this.mpv) {
      this.mpv.cmds.loadfile(filename);
    }
  }

  @action setPause(pause: boolean): void {
    if (this.mpv) {
      this.mpv.props.pause = pause;
    }
  }
}
