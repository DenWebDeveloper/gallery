import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
import {inject, observer} from 'mobx-react';
import {observable, action} from 'mobx';

import './style.css'

const springSetting1 = {stiffness: 180, damping: 10};
const springSetting2 = {stiffness: 120, damping: 17};
const [width,height] = [120,140];

function reinsert(arr, from, to) {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
}

function clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
}

@inject('gallery')
@observer
class DraggableImages extends Component {

    @observable mouseXY = [0, 0];
    @observable mouseCircleDelta = [0, 0];
    @observable lastPress = null;
    @observable isPressed = false;

    componentDidMount() {
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    };

    layout = () => {
        const {lastId: count} = this.props.gallery;
        return range(count).map(n => {
            const row = Math.floor(n / 3);
            const col = n % 3;
            return [width * col, height * row];
        })
    };


    handleTouchStart = (key, pressLocation, e) => {
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    };

    handleTouchMove = (e) => {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
    };

    @action handleMouseMove = ({pageX, pageY}) => {
        const {lastPress, isPressed, mouseCircleDelta: [dx, dy]} = this;
        const {order, lastId: count} = this.props.gallery;
        if (isPressed) {
            const mouseXY = [pageX - dx, pageY - dy];
            const col = clamp(Math.floor(mouseXY[0] / width), 0, 2);
            const row = clamp(Math.floor(mouseXY[1] / height), 0, Math.floor(count / 3));
            const index = row * 3 + col;
            const newOrder = reinsert(order, order.indexOf(lastPress), index);

            //action
            this.mouseXY = mouseXY;
            this.props.gallery.order = newOrder;
        }
    };

    @action handleMouseDown = (key, [pressX, pressY], {pageX, pageY}) => {
        this.lastPress = key;
        this.isPressed = true;
        this.mouseCircleDelta = [pageX - pressX, pageY - pressY];
        this.mouseXY = [pressX, pressY];
    };

    @action handleMouseUp = () => {
        this.isPressed = false;
        this.mouseCircleDelta = [0, 0];
    };

    render() {
        const {lastPress, isPressed, mouseXY} = this;
        const {order} = this.props.gallery;
        return (
            <div className={`draggable-container`}>
                {order.map((_, key) => {
                    const {images} = this.props.gallery;
                    let style;
                    let x;
                    let y;
                    const visualPosition = order.indexOf(key);
                    if (key === lastPress && isPressed) {
                        [x, y] = mouseXY;
                        style = {
                            translateX: x,
                            translateY: y,
                            scale: spring(1.2, springSetting1),
                            boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
                        };
                    } else {
                        [x, y] = this.layout()[visualPosition];
                        style = {
                            translateX: spring(x, springSetting2),
                            translateY: spring(y, springSetting2),
                            scale: spring(1, springSetting1),
                            boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
                        };
                    }
                    return (
                        <Motion key={key} style={style}>
                            {({translateX, translateY, scale, boxShadow}) =>
                                <div
                                    onMouseDown={this.handleMouseDown.bind(null, key, [x, y])}
                                    onTouchStart={this.handleTouchStart.bind(null, key, [x, y])}
                                    className='draggable-container__img-wrapper'
                                    style={{
                                        backgroundImage: `url(${images[key]})`,
                                        WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                                        transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                                        zIndex: key === lastPress ? 99 : visualPosition,
                                        boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`,
                                    }}
                                />
                            }
                        </Motion>
                    );
                })}
            </div>
        );
    };
}

export default DraggableImages;