import {UiState} from "./ui-store";
import {PlayerState} from "./player-store";

export class AppState {
  player: PlayerState = new PlayerState();
  ui: UiState = new UiState();
}

let _appStore = new AppState();

export function getStore(): AppState {
  return _appStore;
}
