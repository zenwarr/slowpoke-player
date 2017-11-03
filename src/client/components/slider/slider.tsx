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
  dragging: boolean;
  value: number;
}

export class Slider extends React.Component<SliderProps, SliderState> {
  constructor(props: SliderProps) {
    super(props);
    this.state = {
      dragging: false,
      value: props.percent
    };
  }

  componentWillReceiveProps(props: SliderProps): void {
    if (props.percent !== this.state.value) {
      this.setState({
        value: props.percent
      });
    }
  }

  render() {
    let classes = cn('slider', this.props.extraClasses,
        this.props.enabled === false ? 'slider--disabled' : null,
        this.props.transition && !this.state.dragging ? 'slider--transition' : null);

    return <label className={classes} onClick={this.onClick}>
      <div className={"slider__track"} ref={track => this.track = track}>
        <div className={"slider__elapsed"} style={{width: this.state.value + '%'}}>
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
        value: Slider.percentFromClientX(e.clientX, this.track)
      });
    }
  }

  protected startHandleDrag(clientX: number, track: HTMLElement): void {
    let percent = Slider.percentFromClientX(clientX, track);
    this.setState({
      dragging: true,
      value: percent
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
      dragging: false
    });
    this.setPercent(this.state.value);
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
      value: value
    });
    if (this.props.enabled !== false && this.props.onChange) {
      this.props.onChange(value);
    }
  }

  protected track: HTMLElement|null = null;
}
