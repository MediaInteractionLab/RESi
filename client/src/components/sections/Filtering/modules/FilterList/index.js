import { connect } from 'react-redux';
import { reduxForm, destroy } from 'redux-form';
import FilterListView from './FilterListView';

import {
    reorderFilters,
    loadFilters,
    loadFilterTypes,
    addFilter,
    removeFilter,
    resetFilters,
} from '../../../../../actions/filters';

const mapStateToProps = state => ({
    filterTypes: state.filters.filterTypes,
    filterList: state.filters.filterList,
    serverConfig: state.settings.server,
});

const mapDispatchToProps = dispatch => ({
    loadFilters: serverConfig => dispatch(loadFilters(serverConfig)),
    loadFilterTypes: serverConfig => dispatch(loadFilterTypes(serverConfig)),
    addFilter: (serverConfig, filterData) => dispatch(addFilter(serverConfig, filterData)),
    removeFilter: (serverConfig, filterId) => dispatch(removeFilter(serverConfig, filterId)),
    reorderFilters: (serverConfig, startIndex, endIndex) =>
        dispatch(reorderFilters(serverConfig, startIndex, endIndex)),
    destroyForm: () => {
        dispatch(destroy('addFilter'));
    },
    resetFilters: (serverConfig) => {
        dispatch(resetFilters(serverConfig));
    },
});

const form = reduxForm({
    form: 'addFilter', // a unique identifier for this form
})(FilterListView);

export default connect(mapStateToProps, mapDispatchToProps)(form);
