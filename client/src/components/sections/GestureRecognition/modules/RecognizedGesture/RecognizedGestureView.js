import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    container,
} from './RecognizedGesture.scss';

class RecognizedGesture extends Component {

    render() {
        const { gesture, gestureArgs } = this.props;
        return <div className={container}>
            <h1>{ gesture || '...' }</h1>
            <p style={{ textAlign: 'center' }}>{ gestureArgs || ''}</p>
            <h2>Recognized Gesture</h2>
        </div>;
    }
}

RecognizedGesture.propTypes = {
    gesture: PropTypes.string,
    gestureArgs: PropTypes.string,
};

export default RecognizedGesture;
