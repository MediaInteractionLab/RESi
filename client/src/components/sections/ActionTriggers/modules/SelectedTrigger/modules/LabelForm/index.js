import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import LabelForm from './LabelForm';
import { updateTrigger } from '../../../../../../../actions/triggers';

const mapStateToProps = state => ({
    serverConfig: state.settings.server,
    selectedTrigger: state.triggers.selectedTrigger,
});

const mapDispatchToProps = dispatch => ({
    updateTrigger: (trigger, serverConfig) => {
        dispatch(updateTrigger(trigger, serverConfig));
        dispatch(reset('labelForm'));
    },
});

const form = reduxForm({
    form: 'labelForm', // a unique identifier for this form
})(LabelForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
