import * as React from 'react';
import {cn} from "../utils";
import {autobind} from "core-decorators";
require('./slider.css');

export interface SliderProps {
  extraClasses?: string;
  percent: number;
  onChange?: (new_value: number) => void;
  disabled?: boolean;
}

export class Slider extends React.Component<SliderProps> {
  render() {
    let classes = cn('slider', this.props.extraClasses, this.props.disabled ? 'slider--disabled' : '');
    return <label className={classes} onClick={this.onClick}>
      <input type="range" className={"slider__input"} min={0} max={100} value={this.props.percent}
             disabled={this.props.disabled} />
      <div className={"slider__track"}>
        <div className={"slider__elapsed"} style={{width: this.props.percent + '%'}}>
          <span className={"slider__handle"} />
        </div>
      </div>
    </label>;
  }

  @autobind
  onClick(e: React.MouseEvent<HTMLElement>) {
    if (this.props.disabled !== true && this.props.onChange) {
      let elem_pos = e.pageX - (e.currentTarget.getBoundingClientRect().left + document.body.scrollLeft);
      let elem_width = e.currentTarget.getBoundingClientRect().width;
      let percent_pos = (elem_pos / elem_width) * 100;
      this.props.onChange(percent_pos);
    }
  }
}