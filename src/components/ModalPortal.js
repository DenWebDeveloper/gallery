import {Component} from 'react'
import {createPortal} from 'react-dom'
const modalRoot = document.querySelector('body');

class ModalPortal extends Component {

    constructor(props) {
        super(props);
        // Create a div that we'll render the modal into. Because each
        // Modal component has its own element, we can render multiple
        // modal components into the modal container.
        this.el = document.createElement('div');
    }

    render() {
        return createPortal(
            this.props.children,
            this.el,
        );
    }

    componentDidMount() {
        // Append the element into the DOM on mount. We'll render
        // into the modal container element (see the HTML tab).
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        // Remove the element from the DOM when we unmount
        modalRoot.removeChild(this.el);
    }
}

export default ModalPortal;
