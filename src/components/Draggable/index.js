import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
import {inject, observer} from 'mobx-react';
import {observable,action} from 'mobx';

import './style.css'

const springSetting1 = {stiffness: 180, damping: 10};
const springSetting2 = {stiffness: 120, damping: 17};

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
export default class Demo extends React.Component {

    @observable mouseXY = [0, 0];
    @observable mouseCircleDelta = [0, 0];
    @observable lastPress = null;
    @observable isPressed = false;
    @observable order = range(11);
    @observable count = 11;

    componentDidMount() {
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    };

    layout = () => {
        const {widthColumn: width, heightRow: height} = this.props.gallery;
        return range(this.count).map(n => {
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
        const {order, lastPress, isPressed, mouseCircleDelta: [dx, dy]} = this;
        const {widthColumn: width, heightRow: height} = this.props.gallery;
        if (isPressed) {
            const mouseXY = [pageX - dx, pageY - dy];
            const col = clamp(Math.floor(mouseXY[0] / width), 0, 2);
            const row = clamp(Math.floor(mouseXY[1] / height), 0, Math.floor(this.count / 3));
            const index = row * 3 + col;
            const newOrder = reinsert(order, order.indexOf(lastPress), index);

            //action
            this.mouseXY = mouseXY;
            this.order = newOrder;
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
        const {order, lastPress, isPressed, mouseXY} = this;
        return (
            <div className='demo2'>
                {order.map((_, key) => {
                    const {widthColumn: width} = this.props.gallery;
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
                                        backgroundImage: 'url(data:image/jpeg;base64,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)',
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