import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {observer, inject} from 'mobx-react'
import {action} from 'mobx'

import Dropzone from '../Dropzone'

import './style.css'

@inject('gallery')
@observer
class GeneralSetting extends Component {
    
    static propTypes = {
        gallery: PropTypes.object.isRequired
    };

    @action handleInput(type, event) {
        const {gallery} = this.props;
        const target = event.target;
        gallery[type] = target.type === 'checkbox' ? target.checked : target.value;
    }

    render() {
        const {gallery} = this.props;
        return (
            <form className='general-settings'>
                <Dropzone/>
                <div className='form-group'>
                    <button className='btn badge-dark' type='button'>Изменить порядок картинок</button>
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Выбор либо фиксированной высоты и подгон картинки, либо
                        адаптивная высота</label>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='exampleRadios' id='exampleRadios11'
                               checked={gallery.typeHeight === 'fixed'} value='fixed' onChange={this.handleInput.bind(this, 'typeHeight')}/>
                        <label className='form-check-label'  htmlFor='exampleRadios11'>
                            фиксированной высоты
                        </label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='exampleRadios' id='exampleRadios21'
                               checked={gallery.typeHeight === 'snapping'} value='snapping' onChange={this.handleInput.bind(this, 'typeHeight')} />
                        <label className='form-check-label' htmlFor='exampleRadios21'>
                            подгон картинки,
                        </label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='exampleRadios' id='exampleRadios31'
                               checked={gallery.typeHeight === 'adaptive'} value='adaptive' onChange={this.handleInput.bind(this, 'typeHeight')}/>
                        <label className='form-check-label' htmlFor='exampleRadios31'>
                            либо адаптивная высота
                        </label>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputPassword1'>Редактирование размеров для всех карточек</label>
                    <input className='form-control form-control-lg' onChange={this.handleInput.bind(this, 'width')}
                           type='number' placeholder='width' value={gallery.width}/>
                    <input className='form-control form-control-lg' onChange={this.handleInput.bind(this, 'height')}
                           type='number'  placeholder='height' value={gallery.height}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='input2'>Выбор количества фото в ширину</label>
                    <input id='input2' className='form-control form-control-lg' min='1' type='number' onChange={this.handleInput.bind(this, 'numberImagesWidth')} value={gallery.numbergalleryWidth} placeholder='Enter text'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='input1'>выбор количества для отображения сразу</label>
                    <input id='input1' className='form-control form-control-lg' min='1' type='number' onChange={this.handleInput.bind(this, 'displayOnce')} value={gallery.displayOnce} placeholder='Enter text'/>
                </div>
                <div className='form-group'>
                    <div className='form-check form-check-inline'>
                        <label className='form-check-label' htmlFor='inlineCheckbox12'>Включение/выключение увеличения на
                            клик</label>
                        <input className='form-check-input ml-5' type='checkbox' id='inlineCheckbox12' onChange={this.handleInput.bind(this, 'zoomClick')} checked={gallery.zoomClick}/>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Позиция текста (справа, по середине, слева) для всех карточек</label>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='positionRadios' id='positionRadios1'
                               checked={gallery.position === 'right'} value='right' onChange={this.handleInput.bind(this, 'position')}/>
                        <label className='form-check-label' htmlFor='positionRadios1'>
                            справа
                        </label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='positionRadios' id='positionRadios2'
                               checked={gallery.position === 'center'} value='center' onChange={this.handleInput.bind(this, 'position')}/>
                        <label className='form-check-label' htmlFor='positionRadios2'>
                            по середине
                        </label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='positionRadios' id='positionRadios3'
                               checked={gallery.position === 'left'} value='left' onChange={this.handleInput.bind(this, 'position')}/>
                        <label className='form-check-label' htmlFor='positionRadios3'>
                            слева
                        </label>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputPassword1'>Добавление рамки для изображений, настройки: ширина
                        рамки, положение (внутри, вокруг изображения)</label>
                    <input className='form-control form-control-lg' min='0' type='number' value={gallery.widthBorder}  onChange={this.handleInput.bind(this, 'widthBorder')} placeholder='width'/>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='borderRadios' id='borderRadios1'
                               checked={gallery.typeBorder === 'inside'} value='inside' onChange={this.handleInput.bind(this, 'typeBorder')}/>
                        <label className='form-check-label' htmlFor='borderRadios1'>
                            внутри
                        </label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='borderRadios' id='borderRadios2'
                               checked={gallery.typeBorder === 'around'} value='around' onChange={this.handleInput.bind(this, 'typeBorder')}/>
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
