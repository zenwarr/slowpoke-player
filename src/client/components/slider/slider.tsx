import * as React from 'react';
import {cn} from "../utils";
import {autobind} from "core-decorators";
require('./slider.css');

export interface SliderProps {
  extraClasses?: string;
  percent: number;
  onChange?: (new_value: number) => void;
  enabled?: boolean;
  transition?: boolean;
}

export interface SliderState {
  dragStartPos: number;
  dragging: boolean;
  overridePercent: number;
}

export class Slider extends React.Component<SliderProps, SliderState> {
  constructor(props: SliderProps) {
    super(props);
    this.state = {
      dragStartPos: -1,
      dragging: false,
      overridePercent: -1
    };
  }

  render() {
    let classes = cn('slider', this.props.extraClasses,
        this.props.enabled === false ? 'slider--disabled' : null,
        this.props.transition && !this.state.dragging ? 'slider--transition' : null);
    let percent = this.state.overridePercent >= 0 ? this.state.overridePercent : this.props.percent;

    return <label className={classes} onClick={this.onClick}>
      <div className={"slider__track"} ref={track => this.track = track}>
        <div className={"slider__elapsed"} style={{width: percent + '%'}}>
          <span className={"slider__handle"} onMouseDown={this.onMouseDown} onDragStart={this.onDragStart} />
        </div>
      </div>
    </label>;
  }

  @autobind
  onClick(e: React.MouseEvent<HTMLElement>) {
    if (this.props.enabled) {
      this.setPercent(Slider.percentFromClientX(e.clientX, e.currentTarget));
    }
  }

  @autobind
  onDragStart(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
  }

  @autobind
  onMouseDown(e: React.MouseEvent<HTMLElement>) {
    if (this.props.enabled !== false && this.track) {
      this.startHandleDrag(e.clientX, this.track);
    }
  }

  @autobind
  onMouseUp(e: React.MouseEvent<HTMLElement>) {
    if (this.state.dragging === true) {
      this.endHandleDrag();
    }
  }

  @autobind
  onBlur(e: React.FocusEvent<HTMLElement>) {
    if (this.state.dragging === true) {
      this.endHandleDrag();
    }
  }

  /**
   * This event is response to events fired on document element.
   * @param {React.MouseEvent<HTMLElement>} e
   */
  @autobind
  onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (this.props.enabled !== false && this.state.dragging && this.track) {
      this.setState({
        overridePercent: Slider.percentFromClientX(e.clientX, this.track)
      });
    }
  }

  protected startHandleDrag(clientX: number, track: HTMLElement): void {
    let percent = Slider.percentFromClientX(clientX, track);
    this.setState({
      dragging: true,
      dragStartPos: clientX,
      overridePercent: percent
    });

    const mouseMoveHandler = this.onMouseMove.bind(this);
    const blurHandler = () => {
      this.onBlur.apply(this, arguments);
    };
    const mouseUpHandler = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('blur', blurHandler);
      this.onMouseUp.apply(this, arguments);
    };

    window.addEventListener('mousemove', mouseMoveHandler, true);
    window.addEventListener('mouseup', mouseUpHandler, true);
    window.addEventListener('blur', blurHandler);
  }

  protected endHandleDrag(): void {
    this.setState({
      dragging: false,
      dragStartPos: -1
    });
    this.setPercent(this.state.overridePercent);
  }

  /**
   * Calculates percent value from mouse position in client coordinates.
   * @param {number} clientX Client coordinates of mouse position
   * @param {HTMLElement} track Track element
   * @returns {number} Calculated percent value
   */
  protected static percentFromClientX(clientX: number, track: HTMLElement): number {
    let trackRect = track.getBoundingClientRect();
    if (clientX <= trackRect.left) {
      return 0;
    } else if (clientX >= trackRect.right) {
      return 100;
    } else {
      return ((clientX - trackRect.left) / trackRect.width) * 100;
    }
  }

  protected setPercent(value: number): void {
    this.setState({
      overridePercent: value
    });
    if (this.props.enabled !== false && this.props.onChange) {
      this.props.onChange(value);
    }
  }

  protected track: HTMLElement|null = null;
}
