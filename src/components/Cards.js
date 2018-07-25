import React, {Component, Fragment} from 'react';
import {inject, observer} from "mobx-react";
import ModalPortal from './ModalPortal'
import Draggable from './Draggable/index'

import './cards.css'
import {observable, action} from "mobx";

@inject('gallery')
@observer
class Cards extends Component {

    @observable isOpen = false;
    @observable img;
    @observable showAllActive = true;
    @observable showNow = 0;

    modalPhoto() {
        return (
            <Fragment>
                <ModalPortal>
                    <div className="overlay" onClick={() => {
                        this.isOpen = false;
                        this.img = null;
                    }}>
                        <img src={this.img} alt="modal"/>
                    </div>
                </ModalPortal>
            </Fragment>
        )
    }

    @action modalHandle(item) {
        this.isOpen = !this.isOpen;
        this.img = item
    }

    @action getRow(items) {
        const {images} = this.props;
        const that = this;
        const styleBorder = images.typeBorder === 'around' ? {outlineWidth: `${images.widthBorder}px`} : {borderWidth: `${images.widthBorder}px`};
        return (

            <div className='card-deck' key={Math.random()}>
                {items.map((item, index) => {
                    that.showNow++;
                    return (
                        <div className={`card ${(that.showNow) < (+images.displayOnce + 1) ? 'show' : 'none'}`}
                             style={styleBorder} key={index}
                             onClick={this.modalHandle.bind(this, items)}>
                            <img className="card-img-top" src={item} alt="cap"/>
                        </div>
                    )
                })}
            </div>
        )
    }


    @action showAllClick() {
        this.showAllActive = false;
        this.props.images.displayOnce = Infinity;
    }

    @action unulate() {
        if (this.showNow !== 0) {
            this.showNow = 0
        }
    }

    render() {
        const {images} = this.props;
        if (images.images.length === 0) return "nothing";
        this.unulate();
        let decks = [];
        for (let i = 0; i < images.images.length; i += parseInt(images.numberImagesWidth) ? +images.numberImagesWidth : Infinity) {
            console.log('for');
            decks.push(this.getRow(images.images.slice(i, i + (parseInt(images.numberImagesWidth) ? +images.numberImagesWidth : Infinity))));
        }
        return (
            <Fragment>
                <Draggable />
                {/*{decks}*/}
                {/*{this.isOpen && this.modalPhoto()}*/}
                {/*{this.showAllActive &&*/}
                {/*<button onClick={this.showAllClick.bind(this)} className="btn btn-primary ">Show All</button>}*/}
            </Fragment>
        );
    }
}

export default Cards;
