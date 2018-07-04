import { connect } from 'react-redux';
import ActionTriggerListView from './ActionTriggerListView';
import { deleteTrigger, loadTriggers, selectTrigger } from '../../../../../actions/triggers';

const mapStateToProps = state => ({
    triggers: state.triggers.list,
    serverConfig: state.settings.server,
    selectedTrigger: state.triggers.selectedTrigger,
});

const mapDispatchToProps = dispatch => ({
    selectTrigger: (trigger) => {
        dispatch(selectTrigger(trigger));
    },
    loadTriggers: (serverConfig) => {
        dispatch(loadTriggers(serverConfig));
    },
    deleteTrigger: (id, serverConfig) => {
        dispatch(deleteTrigger(id, serverConfig));
        dispatch(selectTrigger(null));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionTriggerListView);
