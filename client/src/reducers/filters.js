import initialState from '../initialStates/filters';

import {
    LOAD_FILTERS,
    LOAD_FILTER_TYPES,
    ADD_FILTER,
    REMOVE_FILTER,
    REORDER_FILTER,
} from '../actions/types';

export default (state = initialState, action) => {
    switch (action.type) {

    case LOAD_FILTERS: {
        return {
            ...state,
            filterList: action.data,
        };
    }

    case LOAD_FILTER_TYPES: {
        return {
            ...state,
            filterTypes: action.data,
        };
    }

    case ADD_FILTER: {
        const filters = [...state.filterList];
        filters.push(action.data);
        return {
            ...state,
            filterList: filters,
        };
    }

    case REMOVE_FILTER: {
        let filters = [...state.filterList];
        filters = filters.filter(filter => filter._id !== action.data.filterId);
        return {
            ...state,
            filterList: filters,
        };
    }

    case REORDER_FILTER: {

        const { data: { startIndex, endIndex } } = action;
        const filterList = [...state.filterList];
        const [removed] = filterList.splice(startIndex, 1);
        filterList.splice(endIndex, 0, removed);

        return {
            ...state,
            filterList,
        };
    }

    default: {
        return state;
    }
    }
};
