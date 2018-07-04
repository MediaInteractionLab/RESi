import React, { Component } from 'react';
// // import DataMatrix from '../containers/modules/visualizations/DataMatrix/DataMatrix';
// import DataMatrixCanvas from './modules/visualizations/DataMatrix/DataMatrixCanvasContainer';
// import RecognizedGesture from '../containers/modules/visualizations/RecognizedGesture';
// // import Timer from '../containers/modules/visualizations/Timer';
// import DeviceConnection from '../containers/modules/deviceConnection/DeviceConnection';
// import GestureList from '../containers/modules/GestureList';
// import ActionSection from '../containers/modules/Actions';
// import DataCapturing from '../containers/modules/DataCapturing';
// import FilterList from '../containers/modules/Filtering/FilterList';

import ServerSection from './sections/ServerConfiguration';
import FilterSection from './sections/Filtering';
import HeuristicSection from './sections/HeuristicSection';
import GestureSection from './sections/GestureRecognition';
import ActionTriggerSection from './sections/ActionTriggers';

import {
    container,
    headline,
} from './App.scss';
import '../assets/globalStyles/main.scss';

class App extends Component {
    render() {
        return (
            <div className={container}>
                <h1 className={headline}>Smart Fabrics Web UI Client</h1>

                <ServerSection />
                <FilterSection />
                <HeuristicSection />
                <GestureSection />
                <ActionTriggerSection />

                {/* <Timer /> */}
            </div>
        );
    }
}

export default App;
