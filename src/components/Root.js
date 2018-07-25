import React, {Component} from 'react'
import {Provider} from 'mobx-react'

import RootStore from '../stores'
import GeneralSettings from './GeneralSettings'
import D from './Draggable'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './style.css'

class Root extends Component {
    render() {
        const stores = new RootStore();
        return (
            <Provider {...stores}>
                <div className="container-fluid pl-3">
                    <div className="row">
                        <div className="col-md-5">
                            <GeneralSettings/>
                        </div>
                        <div className="col-md-7">
                            <D/>
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default Root;
