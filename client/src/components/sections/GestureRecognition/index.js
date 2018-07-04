import React, { Component } from 'react';
import BaseSection from '../BaseSection';
import GestureList from './modules/GestureList';
import DataCapturing from './modules/DataCapturing';
import RecognizedGesture from './modules/RecognizedGesture';

import {
    container,
} from './GestureRecognition.scss';

class GestureRecognition extends Component {
    render() {
        return (
            <BaseSection title="4. SVM Classifiers">
                <div className={container}>
                    <div><GestureList /></div>
                    <div>
                        <DataCapturing />
                        <div>
                            <hr/>
                            <RecognizedGesture />
                        </div>
                    </div>
                </div>
            </BaseSection>
        );
    }
}

export default GestureRecognition;
