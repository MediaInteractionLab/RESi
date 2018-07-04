import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    container,
} from './RecognizedGesture.scss';

class RecognizedGesture extends Component {

    render() {
        const { gesture, gestureArgs } = this.props;
        const args = (gestureArgs) ? JSON.parse(gestureArgs) : null;
        return <div className={container}>
            <div>
                <div>
                    <h1>{ gesture || '...' }</h1>
                    <h2>Recognized Gesture</h2>
                </div>
            </div>
            <div>
                <p>{ args ?
                    Object.keys(args).map((arg, index) => ((arg !== 'name') &&
                        <span key={index}>{ arg }: { JSON.stringify(args[arg]) } <br/></span>
                    )) : ''}</p>
            </div>
        </div>;
    }
}

RecognizedGesture.propTypes = {
    gesture: PropTypes.string,
    gestureArgs: PropTypes.string,
};

export default RecognizedGesture;
