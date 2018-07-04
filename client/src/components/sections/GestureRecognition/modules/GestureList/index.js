import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import GestureListView from './GestureListView';
import { addGesture, deleteGesture, loadGestures } from '../../../../../actions/gestures';

const mapStateToProps = state => ({
    gestures: state.gestures.list,
    serverConfig: state.settings.server,
});

const mapDispatchToProps = dispatch => ({
    addGesture: (gesture, serverConfig) => {
        dispatch(addGesture(gesture, serverConfig));
    },
    loadGestures: (serverConfig) => {
        dispatch(loadGestures(serverConfig));
    },
    deleteGesture: (id, serverConfig) => {
        dispatch(deleteGesture(id, serverConfig));
    },
});

const form = reduxForm({
    form: 'addGesture', // a unique identifier for this form
})(GestureListView);

export default connect(mapStateToProps, mapDispatchToProps)(form);
