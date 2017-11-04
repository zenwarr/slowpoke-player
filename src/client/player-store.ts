import {observable, action, computed} from "mobx";
import {remote} from 'electron';
import * as mpv from 'libmpvjs';

export class PlayerState {
  @observable mpv: mpv.MpvPlayer|null = null;
  @observable filename: string|null = null;
  @observable pause: boolean = true;
  @observable width: number = 0;
  @observable height: number = 0;
  @observable percent_pos: number = 0;
  @observable mute: boolean = false;
  @observable volume: number = 0;
  @observable fullscreen: boolean = false;

  @computed get fileLoaded(): boolean {
    return !!this.filename;
  }

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

  @action seek(percent_pos: number): void {
    if (this.mpv) {
      this.mpv.props.percent_pos = percent_pos;
    }
  }

  @action setMute(mute: boolean): void {
    if (this.mpv) {
      this.mpv.setProperty('mute', mute);
    }
  }

  @action setVolume(volume: number): void {
    if (this.mpv) {
      this.mpv.setProperty('volume', volume);
    }
  }

  @action setFullScreen(fullscreen: boolean): void {
    remote.getCurrentWindow().setFullScreen(fullscreen);
  }
}
