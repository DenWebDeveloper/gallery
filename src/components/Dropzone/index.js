import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import {inject,observer} from 'mobx-react'
import {action} from 'mobx'

import './style.css'

@inject('gallery')
@observer
class Index extends Component {

    static propTypes = {
        gallery: PropTypes.shape({
            images: PropTypes.array.isRequired
        }).isRequired
    };

    @action onImageDrop(file) {
        const {gallery} = this.props;
        const images = file.map((item) => {
            return item.preview
        });

        gallery.images = gallery.images.concat(images);
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
