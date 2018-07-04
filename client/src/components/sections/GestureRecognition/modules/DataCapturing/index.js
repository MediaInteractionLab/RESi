import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DataCapturingView from './DataCapturingView';
import { resetCapturingCounter, setIsCapturing } from '../../../../../actions/dataCapturing';
import { trainGestures } from '../../../../../actions/gestures';

const mapStateToProps = state => ({
    gestures: state.gestures.list,
    counter: state.dataCapturing.counter,
    isCapturing: state.dataCapturing.isCapturing,
    serverConfig: state.settings.server,
    isTraining: state.gestures.training,
});

const mapDispatchToProps = dispatch => ({

    // updateCapturingCounter: counterValue => dispatch(updateCapturingCounter(counterValue)),
    resetCapturingCounter: () => dispatch(resetCapturingCounter),
    setIsCapturing: boolValue => dispatch(setIsCapturing(boolValue)),
    trainGestures: (serverConfig) => {
        dispatch(trainGestures(serverConfig));
    },
});

const form = reduxForm({
    form: 'dataCapturing', // a unique identifier for this form
})(DataCapturingView);

export default connect(mapStateToProps, mapDispatchToProps)(form);
