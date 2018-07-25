import {observable,computed} from 'mobx'

class Gallery {
    constructor(rootStore) {
        this.rootStore = rootStore
    }


    /* Globbal galleru settings */

    @observable images = [];

    @observable order = [];

    @observable imagesView = [];

    @observable text = '';

    @observable typeHeight = 'fixed';

    @observable numberImagesWidth = 1;

    @observable displayOnce = 1;

    @observable widthBorder = 0;


    @computed get heightRow() {
        return this.height + 40;
    }

    @computed get widthColumn() {
        return this.width + 20;
    }

    @observable typeBorder = 'around';

    @observable position = 'left';

    @observable width = 100;

    @observable height = 100;

    @observable zoomClick = false;
}

export default Gallery