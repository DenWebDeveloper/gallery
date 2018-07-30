import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import {inject, observer} from 'mobx-react'
import {action} from 'mobx'

import './style.css'

@inject('gallery')
@observer
class Index extends Component {

    static propTypes = {
        gallery: PropTypes.shape({
            images: PropTypes.object.isRequired
        }).isRequired
    };

    @action onImageDrop(file) {
        const {gallery} = this.props;
        file.forEach((item) => {
            gallery.order.push(gallery.lastId);
            gallery.imagesOptions[gallery.lastId] = {
                paddingTop: 1,
                paddingRight: 1,
                paddingLeft: 1,
                paddingBottom: 1,
                typeHeight: 'fixed',
                width: 300,
                height: 200,
                widthImg: 300,
                heightImg: 200,
                text: '',
                typeShowText: 'underImg',
                typePositionText: 'right'
            };
            gallery.images[gallery.lastId++] = item.preview
        });

    }

    render() {
        return (
            <Dropzone
                className='dropzone-img'
                multiple
                accept='image/*'
                onDrop={this.onImageDrop.bind(this)}>
                <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
        );
    }
}

export default Index;
