import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormModal from '../FormModal';
import Button from '../../../../ui/Button';

import {
    container,
    active,
} from './ActionTriggersList.scss';

class ActionTriggersList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteTrigger = this.deleteTrigger.bind(this);
    }

    componentWillMount() {
        const { loadTriggers, serverConfig } = this.props;
        loadTriggers(serverConfig);
    }

    openModal() {
        this.setState({ modalOpen: true });
    }

    closeModal() {
        this.setState({ modalOpen: false });
    }

    deleteTrigger(triggerId, evt) {

        const { serverConfig, deleteTrigger } = this.props;

        // to prevent from also triggering select action
        evt.stopPropagation();

        deleteTrigger(triggerId, serverConfig);
    }

    render() {
        const {
            triggers,
            selectTrigger,
            selectedTrigger,
        } = this.props;

        const { modalOpen } = this.state;
        return <div className={container}>
            <ul>
                { triggers.map(trigger => (
                    <li className={(selectedTrigger && trigger._id === selectedTrigger._id) ? active : ''} key={trigger._id} onClick={() => selectTrigger(trigger)}>
                        {trigger.name}
                        <i className="material-icons"
                            onClick={(evt) => {
                                this.deleteTrigger(trigger._id, evt);
                            }} >delete_forever</i>
                    </li>
                ))}
            </ul>
            <Button onClick={this.openModal}><i className="material-icons">add</i> Add Action Trigger</Button>
            <h2>Action Triggers</h2>
            { modalOpen && <FormModal open={true} closeModal={this.closeModal}/> }
        </div>;
    }
}

ActionTriggersList.propTypes = {
    triggers: PropTypes.array.isRequired,
    loadTriggers: PropTypes.func.isRequired,
    deleteTrigger: PropTypes.func.isRequired,
    serverConfig: PropTypes.object.isRequired,
    selectTrigger: PropTypes.func.isRequired,
    selectedTrigger: PropTypes.object,
};

export default ActionTriggersList;
