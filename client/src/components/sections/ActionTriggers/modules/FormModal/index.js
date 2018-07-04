import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import FormModal from './FormModalView';
import { addTrigger, updateTrigger } from '../../../../../actions/triggers';

const mapStateToProps = state => ({
    triggers: state.triggers.list,
    serverConfig: state.settings.server,
    initialValues: {
        name: state.triggers.selectedTrigger ? state.triggers.selectedTrigger.name : null,
        method:
            state.triggers.selectedTrigger ? state.triggers.selectedTrigger.request.method : null,
        url: state.triggers.selectedTrigger ? state.triggers.selectedTrigger.request.url : null,
        _id: state.triggers.selectedTrigger ? state.triggers.selectedTrigger._id : null,
        data: state.triggers.selectedTrigger ? state.triggers.selectedTrigger.request.data : null,
    },
});

const mapDispatchToProps = dispatch => ({
    addTrigger: (trigger, serverConfig) => {
        dispatch(addTrigger(trigger, serverConfig));
    },
    updateTrigger: (trigger, serverConfig) => {
        dispatch(updateTrigger(trigger, serverConfig));
    },
});

const form = reduxForm({
    form: 'triggerForm', // a unique identifier for this form
})(FormModal);

export default connect(mapStateToProps, mapDispatchToProps)(form);
