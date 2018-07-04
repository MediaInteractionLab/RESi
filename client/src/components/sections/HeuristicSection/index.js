import React, { Component } from 'react';
import BaseSection from '../BaseSection';
import RecognizedGesture from './modules/RecognizedGesture';

class HeuristicSection extends Component {
    render() {
        return (
            <BaseSection title="3. Gesture Recognition">
                <RecognizedGesture />
            </BaseSection>
        );
    }
}

export default HeuristicSection;
