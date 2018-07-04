import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Modal from 'react-modal';
import classNames from 'classnames';
import Button from '../../../../ui/Button';

import {
    container,
    modal,
    overlay,
    closeIcon,
    add,
    trained,
    training,
} from './GestureList.scss';

class GestureList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addGesture = this.addGesture.bind(this);
    }

    componentWillMount() {
        const { loadGestures, serverConfig } = this.props;
        loadGestures(serverConfig);
    }

    openModal() {
        this.setState({ modalOpen: true });
    }

    closeModal() {
        this.setState({ modalOpen: false });
    }

    addGesture(values) {
        const { addGesture, serverConfig } = this.props;
        addGesture(values, serverConfig);
        this.closeModal();
    }

    render() {
        const {
            gestures,
            deleteGesture,
            handleSubmit,
            serverConfig,
        } = this.props;

        const { modalOpen } = this.state;
        return <div className={container}>
            <ul>
                { gestures.map((gesture) => {
                    const classes = classNames({ [trained]: gesture.trained }, training);
                    return <li key={gesture._id}>
                        <div className={classes}></div>
                        {gesture.name}
                        <i className="material-icons"
                            onClick={() => {
                                deleteGesture(gesture._id, serverConfig);
                            }} >delete_forever</i>
                        {/* <button>edit</button> */}
                    </li>;
                })
                }
            </ul>
            <Button className={add} onClick={this.openModal}><i className="material-icons">add</i> Add Gesture</Button>
            <h2>Gesture List</h2>
            <Modal
                isOpen={modalOpen}
                contentLabel="Modal"
                className={modal}
                overlayClassName={overlay}
                ariaHideApp={false}>
                <h2>New Gesture</h2>
                <div className={closeIcon} onClick={this.closeModal}><i className="material-icons">close</i></div>
                <form onSubmit={handleSubmit(this.addGesture)}>
                    <div>
                        <Field
                            name="name"
                            component="input"
                            type="text"
                        />
                        <label>Gesture Name</label>
                    </div>
                    <div>
                        <Field
                            name="label"
                            component="input"
                            type="text"
                        />
                        <label>Label</label>
                    </div>
                    <Button type="submit"><i className="material-icons">add</i> Add Gesture</Button>
                </form>
            </Modal>
        </div>;
    }
}

GestureList.propTypes = {
    gestures: PropTypes.array.isRequired,
    addGesture: PropTypes.func.isRequired,
    loadGestures: PropTypes.func.isRequired,
    deleteGesture: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    serverConfig: PropTypes.object.isRequired,
};

export default GestureList;
