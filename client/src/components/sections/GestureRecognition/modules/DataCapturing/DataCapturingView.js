import React, { Component } from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Field } from 'redux-form';
import classNames from 'classnames';
import Button from '../../../../ui/Button';

import {
    container,
    icon,
    loading,
} from './DataCapturing.scss';

import loadingGif from '../../../../../assets/images/loading.gif';

class DataCapturing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentGestureId: 'none',
        };

        this.startCapturing = this.startCapturing.bind(this);
        this.stopCapturing = this.stopCapturing.bind(this);
        this.captureSingleFrame = this.captureSingleFrame.bind(this);
    }

    startCapturing(values) {
        const id = values.gestureId;
        if (!id || id === 'none') return;
        const { serverConfig: { protocol, server, port } } = this.props;
        const { setIsCapturing } = this.props;
        axios.post(`${protocol}://${server}:${port}/data/capture/start/${id}`)
            .then(() => {
                setIsCapturing(true);
            })
            .catch((error) => {
                /* eslint-disable */
                console.log(error);
                /* eslint-enable */
            });
    }

    stopCapturing() {
        const { serverConfig: { protocol, server, port } } = this.props;
        const { setIsCapturing } = this.props;
        axios.post(`${protocol}://${server}:${port}/data/capture/stop`)
            .then(() => {
                setIsCapturing(false);
            })
            .catch((error) => {
                /* eslint-disable */
                console.log(error);
                /* eslint-enable */
            });
    }

    captureSingleFrame() {
        if (!this.state.currentGestureId || this.state.currentGestureId === 'none') return;
        const { serverConfig: { protocol, server, port } } = this.props;
        axios.post(`${protocol}://${server}:${port}/data/capture/${this.state.currentGestureId}`)
            .then(() => {
                /* eslint-disable */
                console.log(`Captured single frame (Gesture ${this.state.currentGestureId}.`);
                /* eslint-enable */
            })
            .catch((error) => {
                /* eslint-disable */
                console.log(error);
                /* eslint-enable */
            });
    }

    onKeyPressed(event) {
        event.preventDefault();
        this.captureSingleFrame();
    }

    render() {
        const {
            isCapturing,
            handleSubmit,
            gestures,
            isTraining,
            trainGestures,
            serverConfig,
        } = this.props;

        const trainButtonClass = classNames({ [loading]: isTraining });

        return <div className={container}>
            <KeyHandler keyEventName={KEYPRESS} keyValue="r" onKeyHandle={this.captureSingleFrame} />
            <form onSubmit={handleSubmit(this.startCapturing)}>
                <div>
                    <label>Select Gesture: </label>
                    <Field name="gestureId" component="select" onChange={(e) => { this.setState({ currentGestureId: e.target.value }); }}>
                        <option value={'none'} key={'none'} />
                        { gestures.map(gesture => (
                            <option value={gesture._id} key={gesture._id}>{gesture.name}</option>
                        )) }
                    </Field>
                    <div className={icon}><i className="material-icons">arrow_drop_down</i></div>
                </div>
                { (!isCapturing) &&
                    <Button type="submit"><i className="material-icons">play_arrow</i> start data capturing</Button>
                }
            </form>
            { isCapturing && <div>
                <Button onClick={this.stopCapturing}><i className="material-icons">stop</i> end data capturing</Button>
            </div>
            }
            { !isCapturing && <div>
                <Button onClick={this.captureSingleFrame}><i className="material-icons">add</i> capture single frame</Button>
                <Button onClick={() => { trainGestures(serverConfig); }}
                    className={trainButtonClass} disabled={isTraining}>
                    { (isTraining) ?
                        <img src={loadingGif} alt="loading" />
                        : <i className="material-icons">train</i>
                    }
                    Train
                </Button></div>
            }
            <h2>Data Capturing &amp; Training</h2>
        </div>;
    }
}

DataCapturing.propTypes = {
    gestures: PropTypes.array.isRequired,
    counter: PropTypes.number,
    isCapturing: PropTypes.bool,
    resetCapturingCounter: PropTypes.func.isRequired,
    setIsCapturing: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    serverConfig: PropTypes.object.isRequired,
    isTraining: PropTypes.bool,
    trainGestures: PropTypes.func.isRequired,
};

export default DataCapturing;
