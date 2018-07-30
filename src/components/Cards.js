import React, {Component, Fragment} from 'react';
import {inject, observer} from "mobx-react";
import ModalPortal from './ModalPortal'

import './cards.css'
import {observable, action} from "mobx";

@inject('gallery')
@observer
class Cards extends Component {

    @observable isOpen = false;
    @observable isOpenOptions = false;
    @observable img;
    @observable itemId;
    @observable showAllActive = true;
    @observable showNow = 0;

    @action modalPhoto() {
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

    @action handleInput(type, event) {
        const target = event.target;
        const options = this.props.gallery.imagesOptions;
        const optionsValue = target.type === 'checkbox' ?
            target.checked : parseInt(target.value, 10) ?
                parseInt(target.value, 10) : target.value;
        options[this.itemId][type] = optionsValue;
        this.props.gallery.imagesOptions =  options
        this.props.gallery.state1 = Math.random()
    }

    @action optionsCard() {
        const {width, height,heightImg,widthImg, text, typeHeight, typeShowText, typePositionText, paddingTop, paddingRight, paddingBottom, paddingLeft} = this.props.gallery.imagesOptions[this.itemId];
        console.log("paddingTop------:",paddingTop);
        return (
            <Fragment>
                <ModalPortal>
                    <div className="overlay">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Options</h5>
                                    <button onClick={() => {
                                        this.isOpenOptions = !this.isOpenOptions;
                                    }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form action="">
                                        <div className='form-group'>
                                            <label htmlFor='exampleInputPassword1'>настройка размера/позиции именно картинки
                                                внутри карточки</label>
                                            <input className='form-control form-control-lg'
                                                   onChange={this.handleInput.bind(this, 'paddingTop')}
                                                   type='number' placeholder='paddingTop' value={paddingTop}/>
                                            <input className='form-control form-control-lg'
                                                   onChange={this.handleInput.bind(this, 'paddingRight')}
                                                   type='number' placeholder='paddingRight' value={paddingRight}/>
                                            <input className='form-control form-control-lg'
                                                   onChange={this.handleInput.bind(this, 'paddingBottom')}
                                                   type='number' placeholder='paddingBottom' value={paddingBottom}/>
                                            <input className='form-control form-control-lg'
                                                   onChange={this.handleInput.bind(this, 'paddingLeft')}
                                                   type='number' placeholder='paddingLeft' value={paddingLeft}/>
                                        </div>
                                        <div className='form-group'>
                                            <label>Выбор либо фиксированной высоты и подгон картинки, либо
                                                адаптивная высота</label>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='radio' name='typeHeight'
                                                       id='typeHeight1'
                                                       checked={typeHeight === 'fixed'} value='fixed'
                                                       onChange={this.handleInput.bind(this, 'typeHeight')}/>
                                                <label className='form-check-label' htmlFor='typeHeight1'>
                                                    фиксированной высоты
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='radio' name='typeHeight'
                                                       id='typeHeight2'
                                                       checked={typeHeight === 'snapping'} value='snapping'
                                                       onChange={this.handleInput.bind(this, 'typeHeight')}/>
                                                <label className='form-check-label' htmlFor='typeHeight2'>
                                                    подгон картинки,
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='radio' name='typeHeight'
                                                       id='typeHeight3'
                                                       checked={typeHeight === 'adaptive'} value='adaptive'
                                                       onChange={this.handleInput.bind(this, 'typeHeight')}/>
                                                <label className='form-check-label' htmlFor='typeHeight3'>
                                                    либо адаптивная высота
                                                </label>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='exampleInputPassword1'>Редактирование размеров для
                                                карточек</label>
                                            <input className='form-control form-control-lg'
                                                   onChange={this.handleInput.bind(this, 'width')}
                                                   type='number' placeholder='width' value={width}/>
                                            <input className='form-control form-control-lg'
                                                   onChange={this.handleInput.bind(this, 'height')}
                                                   type='number' placeholder='height' value={height}/>
                                        </div>
                                        <div className='form-group'>
                                            <label >Редактирование размеров для
                                                картинки</label>
                                            <input className='form-control form-control-lg'
                                                   onChange={this.handleInput.bind(this, 'widthImg')}
                                                   type='number' placeholder='width' value={widthImg}/>
                                            <input className='form-control form-control-lg'
                                                   onChange={this.handleInput.bind(this, 'heightImg')}
                                                   type='number' placeholder='height' value={heightImg}/>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='add-text'>Добавление текста к изображению</label>
                                            <input className='form-control form-control-lg'
                                                   onChange={this.handleInput.bind(this, 'text')}
                                                   type='text' placeholder='text' value={text}/>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='typeShowText1'>выбор отображения текста (под изображением,
                                                при наведении, на самом изображении)</label>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='radio' name='typeShowText'
                                                       id='typeShowText1'
                                                       checked={typeShowText === 'underImg'} value='underImg'
                                                       onChange={this.handleInput.bind(this, 'typeShowText')}/>
                                                <label className='form-check-label' htmlFor='typeShowText1'>
                                                    под изображением,
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='radio' name='typeShowText'
                                                       id='typeShowText2'
                                                       checked={typeShowText === 'hover'} value='hover'
                                                       onChange={this.handleInput.bind(this, 'typeShowText')}/>
                                                <label className='form-check-label' htmlFor='typeShowText2'>
                                                    при наведении,
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='radio' name='typeShowText'
                                                       id='typeShowText3'
                                                       checked={typeShowText === 'onimg'} value='onimg'
                                                       onChange={this.handleInput.bind(this, 'typeShowText')}/>
                                                <label className='form-check-label' htmlFor='typeShowText3'>
                                                    при самом изображении,
                                                </label>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='positionText1'>позиция текста (справа, по середине,
                                                слева)</label>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='radio' name='typePositionText'
                                                       id='typePositionText1'
                                                       checked={typePositionText === 'right'} value='right'
                                                       onChange={this.handleInput.bind(this, 'typePositionText')}/>
                                                <label className='form-check-label' htmlFor='positionText1'>
                                                    справа
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='radio' name='typePositionText'
                                                       id='positionText2'
                                                       checked={typePositionText === 'center'} value='center'
                                                       onChange={this.handleInput.bind(this, 'typePositionText')}/>
                                                <label className='form-check-label' htmlFor='positionText2'>
                                                    по середине
                                                </label>
                                            </div>
                                            <div className='form-check'>
                                                <input className='form-check-input' type='radio' name='typePositionText'
                                                       id='positionText3'
                                                       checked={typePositionText === 'left'} value='left'
                                                       onChange={this.handleInput.bind(this, 'typePositionText')}/>
                                                <label className='form-check-label' htmlFor='positionText3'>
                                                    слева
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={() => {
                                        this.isOpenOptions = !this.isOpenOptions;
                                    }} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </ModalPortal>
            </Fragment>
        )
    }

    @action modalHandle(item) {
        if (!this.props.gallery.zoomClick) return null;
        this.isOpen = !this.isOpen;
        this.img = item
    }

    @action modalOptions(item) {
        this.isOpenOptions = !this.isOpenOptions;
        if (item !== null) {
            this.itemId = item;
        }
    }

    @action deleteCard(item) {
        this.props.gallery.order.splice(this.props.gallery.order.indexOf(item), 1);
        delete this.props.gallery.images[item]
    }

    @action getRow(items) {
        const {gallery} = this.props;
        const that = this;
        console.log(`${gallery.width}px`);
        const styleBorder = gallery.typeBorder === 'around' ? {outlineWidth: `${gallery.widthBorder}px`} : {borderWidth: `${gallery.widthBorder}px`};
        return (

            <div className='card-deck' key={Math.random()}>
                {items.map((item, index) => {
                    that.showNow++;
                    const op = this.props.gallery.imagesOptions[item];
                    const styleCard = {
                        paddingTop: `${op.paddingTop}px`,
                        paddingRight: `${op.paddingRight}px`,
                        paddingBottom: `${op.paddingBottom}px`,
                        paddingLeft: `${op.paddingLeft}px`,
                        width: `${op.width}px`,
                        maxWidth: `${op.width}px`,
                        height: `${op.height}px`
                    };
                    return (
                        <div
                            className={`${op.typeHeight}  ${op.typeHeight} card ${(that.showNow) < (this.props.gallery.displayOnce + 1) ? 'show' : 'none'}`}
                             key={index} style={Object.assign(styleBorder,
                            styleCard
                        )}
                        >
                            <div className={`wrapper ${op.typeHeight}` }>
                                <img style={{
                                    width: `${op.widthImg}px`,
                                    height: `${op.heightImg}px`,
                                }} className={`${op.typeHeight}`} onClick={this.modalHandle.bind(this, this.props.gallery.images[item])}    src={gallery.images[item]} alt="cap"/>
                            </div>
                            <div className={`card-body text ${op.typeShowText}  ${op.typePositionText}`}>
                                {op.text}
                            </div>
                            <div className="card-body">

                                <a onClick={this.deleteCard.bind(this, item)} href="#"
                                   className="btn btn-primary">Delete</a>
                                <a onClick={this.modalOptions.bind(this, item)} href="#"
                                   className="btn btn-primary">Options</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }


    @action showAllClick() {
        this.showAllActive = false;
        this.props.gallery.displayOnce = 999999;
    }

    @action unulate() {
        if (this.showNow !== 0) {
            this.showNow = 0
        }
    }

    render() {
        const {gallery} = this.props;
        if (gallery.images.length === 0) return "nothing";
        this.unulate();
        let decks = [];
        for (let i = 0; i < gallery.order.length; i += parseInt(gallery.numberImagesWidth) ? +gallery.numberImagesWidth : Infinity) {
            decks.push(this.getRow(gallery.order.slice(i, i + (parseInt(gallery.numberImagesWidth) ? +gallery.numberImagesWidth : Infinity))));
        }
        console.log(this.props.gallery.displayOnce, gallery.widthBorder,gallery.typeBorder, this.props.gallery.width, this.props.gallery.height,
            this.props.gallery.imagesOptions[0]?this.props.gallery.imagesOptions: 5,this.props.gallery.state1);
        return (
            <Fragment>
                {decks}
                {this.isOpen && this.modalPhoto()}
                {this.isOpenOptions && this.optionsCard()}
                {this.showAllActive &&
                <button onClick={this.showAllClick.bind(this)} className="btn btn-primary ">Show All</button>}
            </Fragment>
        );
    }
}

export default Cards;
