import Gallery from './gallery'

class RootStore {
    constructor() {
        this.gallery = new Gallery(this);
    }
}

export default RootStore;