import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Button from '../../../../../../ui/Button';

import {
    container,
} from './LabelForm.scss';

class LabelForm extends Component {

    constructor(props) {
        super(props);
        this.addLabel = this.addLabel.bind(this);
    }

    addLabel(values) {
        const { updateTrigger, serverConfig, selectedTrigger } = this.props;

        const labels = [...selectedTrigger.labels];
        labels.push(values.newLabel);

        const updatedTrigger = {
            ...selectedTrigger,
            labels,
        };

        updateTrigger(updatedTrigger, serverConfig);
    }

    render() {
        const {
            handleSubmit,
        } = this.props;

        return <div className={container}>
            <form onSubmit={handleSubmit(this.addLabel)}>
                <div>
                    <Field
                        name="newLabel"
                        component="input"
                        type="text"
                        placeholder="new Label"
                    />
                    <Button type="submit"><i className="material-icons">add</i> Add Label</Button>
                </div>
            </form>
        </div>;
    }
}

LabelForm.propTypes = {
    updateTrigger: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    serverConfig: PropTypes.object.isRequired,
    selectedTrigger: PropTypes.object.isRequired,
};

export default LabelForm;
