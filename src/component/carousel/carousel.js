import React, {Component} from "react";
import {Circular} from "doublie";
import Item from "./item";
import Indexer from "./indexer";

export default class Carousel extends Component {
  views = new Circular();
  state = {
    index: 0
  };
  items = [];
  canEndDrag = false;
  toIndex = 0;
  inDrag = false;
  dragAcc = 0;
  mouseX = null;
  carousel = React.createRef();
  container = React.createRef();

  autoRotate = () => {
    this.slide(1);
  };

  recoverRotate() {
    this.timer = setInterval(this.autoRotate, 3000);
  }

  pauseRotate = () => {
    clearInterval(this.timer);
    this.timer = null;
  };

  startDrag = evt => {
    let {clientX} = evt;
    this.inDrag = false;
    this.pauseRotate();
    this.inDrag = true;
    this.mouseX = clientX;
  };

  endDrag = evt => {
    let {
      inDrag,
      dragAcc,
      state: {index},
      toIndex
    } = this;
    if (inDrag && this.canEndDrag) {
      console.log("drag stop");
      this.toIndex = this.state.index;
      console.log(`toIndex: ${toIndex}, index: ${index}, dragAcc: ${dragAcc}`);
      let {width} = this.container.current.getBoundingClientRect();
      if (Math.abs(dragAcc) > width / this.views.length / 2) {
        this.slide(dragAcc > 0 ? 1 : -1);
      } else {
        this.slide(0);
      }
    }
    this.canEndDrag = false;
    this.inDrag = false;
    !this.timer && this.recoverRotate();
  };

  drag = evt => {
    let {inDrag, views} = this;
    let {clientX} = evt;
    if (inDrag && this.mouseX - clientX) {
      this.canEndDrag = true;
      this.dragAcc += this.mouseX - clientX;
      let {width} = this.container.current.getBoundingClientRect();
      let ratio = (100 * this.dragAcc) / width + (100 * this.baseIndex) / views.length;
      this.container.current.style.transform = `translateX(-${ratio}%)`;
      this.mouseX = clientX;
    }
  };

  jump = toIndex => {
    this.toIndex = toIndex;
    if (this.state.index === toIndex) {
      return;
    }
    this.pauseRotate();
    let indexInItems = this.items.findIndex(e => e.value.key === toIndex);
    this.slide(indexInItems - this.baseIndex);
  };

  slide = span => {
    this.container.current.style.transition = "transform 1s";
    this.container.current.style.transform = `translateX(
			-${(100 * (this.baseIndex + span)) / this.views.length}%
		)`;
    this.toIndex = this.getTargetIndex(span);
    console.log(this.toIndex);
  };

  slideEnd = evt => {
    let {inDrag} = this;
    if (!inDrag) {
      this.pauseRotate();
      this.dragAcc = 0;
      this.container.current.style.transition = "";
      this.container.current.style.transform = "";
      this.setState((state, props) => {
        state.index = this.toIndex;
        return {...state};
      });
    }
  };

  getTargetIndex = (span = 0) => {
    let {
      state: {index}
    } = this;
    let current = this.views.node(index);
    while (span > 0) {
      current = current.next;
      span--;
    }
    while (span < 0) {
      current = current.prev;
      span++;
    }
    return this.views.indexOf(current.value);
  };

  componentDidUpdate() {
    let {current} = this.container;
    current.style.transform = "";
    this.recoverRotate();
  }

  componentDidMount() {
    this.recoverRotate();
  }

  componentWillUnmount() {
    this.pauseRotate();
  }

  buildItems() {
    let {
        views,
        state: {index}
      } = this,
      current = views.node(index),
      forward = current.prev,
      backward = current.next;
    let items = [forward, current, backward],
      round = 1,
      capacity = views.length;
    while (items.length < capacity) {
      if (round % 2) {
        if (backward.next !== forward) {
          backward = backward.next;
          items.push(backward);
        }
      } else {
        if (forward.prev !== backward) {
          forward = forward.prev;
          items.unshift(forward);
        }
      }
      round++;
    }
    this.items = items;
    return items;
  }

  render() {
    const {children, style} = this.props;
    const {index} = this.state;
    this.toIndex = index;
    this.views = new Circular();
    for (let child of children) {
      this.views.append(child);
    }
    this.baseIndex = Math.floor((this.views.length - 1) / 2);
    return (
      <React.Fragment>
        <div className={`carousel`} ref={this.carousel} style={style}>
          <div
            className="container"
            ref={this.container}
            onMouseDown={this.startDrag}
            onMouseLeave={this.endDrag}
            onMouseOver={this.pauseRotate}
            onMouseUp={this.endDrag}
            onMouseMove={this.drag}
            onTransitionEnd={this.slideEnd}
          >
            {this.buildItems().map((e, index) => {
              return (
                <Item key={index} index={index} width={`${100 / this.views.length}%`}>
                  {e}
                </Item>
              );
            })}
          </div>
          <Indexer jump={this.jump} index={index} length={this.views.length} />
        </div>
        <style jsx>
          {`
            .carousel {
              width: 100%;
              position: relative;
              height: 100%;
              top: 0;
              left: 50%;
              overflow: hidden;
              transform: translateX(-50%);
            }
            .container {
              position: relative;
              width: ${this.views.length * 100}%;
              height: 100%;
              background-color: rgb(0, 0, 0, 0);
              transform: translateX(-${(100 * this.baseIndex) / this.views.length}%);
              display: flex;
              flex-direction: row;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}
