import React, {Component} from 'react'
import Root from './components/Root'
import {Provider} from 'mobx-react'
import RootStore from './stores/index'

class App extends Component {
    render() {
        return (
            <Provider rootStore={new RootStore()}>
                <Root/>
            </Provider>)
    }
}

export default App;
