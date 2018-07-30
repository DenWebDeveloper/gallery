import {observable, computed} from 'mobx'

class Gallery {
    constructor(rootStore) {
        this.rootStore = rootStore
    }


    /* Globbal galleru settings */

    @observable images = {};

    @observable imagesOptions = {};

    @observable state1 = 1;

    @observable lastId = 0;

    @observable order = [];

    @observable imagesView = [];

    @observable text = '';

    @observable typeHeight = 'fixed';

    @observable modalDraggableHeight = 'fixed';

    @observable numberImagesWidth = 1;

    @observable displayOnce = 1;

    @observable widthBorder = 0;

    @computed get heightBlock() {
        return (this.lastId / 3) * this.heightRow;
    }

    @observable typeBorder = 'around';

    @observable typeText = 'around';

    @observable width = 100;

    @observable height = 100;

    @observable zoomClick = false;
}

export default Gallery