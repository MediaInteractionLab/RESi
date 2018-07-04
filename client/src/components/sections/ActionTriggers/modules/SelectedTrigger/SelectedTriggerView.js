import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../ui/Button';
import FormModal from '../FormModal';
import LabelForm from './modules/LabelForm';

import {
    container,
    data,
} from './SelectedTrigger.scss';

class SelectedTriggerView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteLabel = this.deleteLabel.bind(this);
    }

    openModal() {
        this.setState({ modalOpen: true });
    }

    closeModal() {
        this.setState({ modalOpen: false });
    }

    deleteLabel(index) {
        const { updateTrigger, serverConfig, selectedTrigger } = this.props;

        const labels = [...selectedTrigger.labels];
        labels.splice(index, 1);

        const updatedTrigger = {
            ...selectedTrigger,
            labels,
        };

        updateTrigger(updatedTrigger, serverConfig);
    }

    render() {
        const {
            selectedTrigger,
        } = this.props;

        const { modalOpen } = this.state;

        if (selectedTrigger) {
            return <div className={container}>
                <div>
                    <h2>Request Data</h2>
                    <p>
                        <strong>Method:</strong> { selectedTrigger.request.method }<br/>
                        <strong>Url:</strong>&nbsp;{ selectedTrigger.request.url }<br/>
                        <strong>Data: &#123;</strong> <br/>
                        { (selectedTrigger.request.data) &&
                            Object.keys(selectedTrigger.request.data).map(key => (
                                <span className={data}
                                    key={key}>{key}: {String(selectedTrigger.request.data[key])},
                                    <br/>
                                </span>
                            ))
                        }
                        <strong>&#125;</strong>
                    </p>
                    <Button onClick={this.openModal}><i className="material-icons">edit</i> Edit Action Trigger</Button>
                </div>
                <hr/>
                <div>
                    <h2>Labels</h2>
                    <strong>Lables: &#91;</strong> <br/>
                    { (selectedTrigger.labels) &&
                        selectedTrigger.labels.map((label, index) => (
                            <span className={data}
                                key={index}>&quot;{label}&quot;, <i className="material-icons"
                                    onClick={() => {
                                        this.deleteLabel(index);
                                    }}>delete_forever</i><br/>
                            </span>
                        ))
                    }
                    <LabelForm />
                    <strong>&#93;</strong>
                </div>
                { modalOpen && <FormModal open={true} closeModal={this.closeModal} update/> }
            </div>;
        }
        return null;
    }
}

SelectedTriggerView.propTypes = {
    serverConfig: PropTypes.object.isRequired,
    selectedTrigger: PropTypes.object,
    updateTrigger: PropTypes.func.isRequired,
};

export default SelectedTriggerView;
