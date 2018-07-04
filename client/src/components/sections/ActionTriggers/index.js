import React, { Component } from 'react';
import BaseSection from '../BaseSection';
import ActionTriggerList from './modules/ActionTriggerList';
import SelectedTrigger from './modules/SelectedTrigger';

import {
    container,
} from './ActionTriggers.scss';

class ActionTriggers extends Component {
    render() {
        return <BaseSection title="5. Action Triggers">
            <div className={container}>
                <div><ActionTriggerList /></div>
                <div>
                    <SelectedTrigger />
                </div>
            </div>
        </BaseSection>;
    }
}

export default ActionTriggers;
