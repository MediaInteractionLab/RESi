import { connect } from 'react-redux';
import SelectedTriggerView from './SelectedTriggerView';
import { updateTrigger } from '../../../../../actions/triggers';

const mapStateToProps = state => ({
    selectedTrigger: state.triggers.selectedTrigger,
    serverConfig: state.settings.server,
});

const mapDispatchToProps = dispatch => ({
    updateTrigger: (trigger, serverConfig) => {
        dispatch(updateTrigger(trigger, serverConfig));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedTriggerView);
