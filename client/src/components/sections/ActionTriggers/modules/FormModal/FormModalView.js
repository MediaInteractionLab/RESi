import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Modal from 'react-modal';
import Button from '../../../../ui/Button';
import MultipleKeyValueInput from '../../../../ui/form/MultipleKeyValueInput';

import {
    modal,
    overlay,
    closeIcon,
    params,
} from './FormModal.scss';

class FormModal extends Component {

    constructor(props) {
        super(props);
        this.addTrigger = this.addTrigger.bind(this);
        this.updateTrigger = this.updateTrigger.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    addTrigger(values) {
        const { addTrigger, serverConfig } = this.props;
        addTrigger(values, serverConfig);
    }

    updateTrigger(values) {
        const { updateTrigger, serverConfig } = this.props;
        updateTrigger(values, serverConfig);
    }

    onSubmit(values) {
        const { update, closeModal, serverConfig } = this.props;
        if (update) {
            this.updateTrigger(values, serverConfig);
        } else {
            this.addTrigger(values, serverConfig);
        }
        closeModal();
    }

    render() {
        const {
            handleSubmit,
            open,
            closeModal,
            update,
        } = this.props;

        return <Modal
            isOpen={open}
            contentLabel="Modal"
            className={modal}
            overlayClassName={overlay}
            ariaHideApp={false}>
            <h2>{update ? 'Update' : 'New' } Action Trigger</h2>
            <div className={closeIcon} onClick={closeModal}><i className="material-icons">close</i></div>
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div>
                    <Field
                        name="name"
                        component="input"
                        type="text"
                    />
                    <label>Trigger Name</label>
                </div>
                <div>
                    <Field
                        name="method"
                        component="input"
                        type="text"
                    />
                    <label>Method</label>
                </div>
                <div>
                    <Field
                        name="url"
                        component="input"
                        type="text"
                    />
                    <label>URL</label>
                </div>
                <div className={params}>
                    <label>Params:</label>
                    <Field
                        name="data"
                        component={MultipleKeyValueInput}
                        type="text"
                    />
                </div>
                { update ?
                    <Button type="submit"><i className="material-icons">save</i> Save Action Trigger</Button> :
                    <Button type="submit"><i className="material-icons">add</i> Add Action Trigger</Button>
                }
            </form>
        </Modal>;
    }
}

FormModal.propTypes = {
    addTrigger: PropTypes.func.isRequired,
    updateTrigger: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    serverConfig: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    open: PropTypes.bool,
    update: PropTypes.bool,
};

export default FormModal;
