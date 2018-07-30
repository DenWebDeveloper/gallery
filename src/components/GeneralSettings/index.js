import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {observer, inject} from 'mobx-react'
import {action,observable} from 'mobx'
import ModalPortal from '../ModalPortal'
import Draggable from '../Draggable'
import Dropzone from '../Dropzone'

import './style.css'

@inject('gallery')
@observer
class GeneralSetting extends Component {

    static propTypes = {
        gallery: PropTypes.object.isRequired
    };

    @observable modalDraggableIsOpen = false;

    @action handleInput(type, event) {
        const {gallery} = this.props;
        const target = event.target;
        gallery[type] = target.type === 'checkbox' ?
            target.checked : parseInt(target.value, 10) ?
                parseInt(target.value, 10) : target.value;
    }

    @action handleModal(opening) {
        this.modalDraggableIsOpen = opening;
    }



    render() {
        const {gallery} = this.props;
        return (
            <form className='general-settings'>
                <Dropzone/>
                <div className='form-group'>
                    <button className='btn badge-dark' onClick={this.handleModal.bind(this,true)} type='button'>Изменить порядок картинок</button>
                    {this.modalDraggableIsOpen && <ModalPortal>
                        <div className="modal-app" style={{height:`${gallery.heightBlock}px`}}>
                            <Draggable/>
                            <button onClick={this.handleModal.bind(this,false)} className='button-close'>Close</button>
                        </div>
                    </ModalPortal>}
                </div>
                <div className='form-group'>
                    <label htmlFor='input2'>Выбор количества фото в ширину</label>
                    <input id='input2' className='form-control form-control-lg' min='1' type='number'
                           onChange={this.handleInput.bind(this, 'numberImagesWidth')}
                           value={gallery.numberImagesWidth} placeholder='Enter text'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='input1'>Выбор количества для отображения сразу</label>
                    <input id='input1' className='form-control form-control-lg' min='1' type='number'
                           onChange={this.handleInput.bind(this, 'displayOnce')} value={gallery.displayOnce}
                           placeholder='Enter text'/>
                </div>
                <div className='form-group'>
                    <div className='form-check form-check-inline'>
                        <label className='form-check-label' htmlFor='inlineCheckbox12'>Включение/выключение увеличения
                            на
                            клик</label>
                        <input className='form-check-input ml-5' type='checkbox' id='inlineCheckbox12'
                               onChange={this.handleInput.bind(this, 'zoomClick')} checked={gallery.zoomClick}/>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputPassword1'>Добавление рамки для изображений, настройки: ширина
                        рамки, положение (внутри, вокруг изображения)</label>
                    <input className='form-control form-control-lg' min='0' type='number' value={gallery.widthBorder}
                           onChange={this.handleInput.bind(this, 'widthBorder')} placeholder='width'/>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='borderRadios' id='borderRadios1'
                               checked={gallery.typeBorder === 'inside'} value='inside'
                               onChange={this.handleInput.bind(this, 'typeBorder')}/>
                        <label className='form-check-label' htmlFor='borderRadios1'>
                            внутри
                        </label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='borderRadios' id='borderRadios2'
                               checked={gallery.typeBorder === 'around'} value='around'
                               onChange={this.handleInput.bind(this, 'typeBorder')}/>
                        <label className='form-check-label' htmlFor='borderRadios2'>
                            вокруг
                        </label>
                    </div>
                </div>
            </form>
        );
    }
}

export default GeneralSetting;
