import initialState from '../initialStates/dataMatrix';

import {
    UPDATE_DATAMATRIX,
    UPDATE_TIMES,
} from '../actions/types';

export default (state = initialState, action) => {
    switch (action.type) {

    case UPDATE_DATAMATRIX: {

        return {
            ...state,
            data: action.data,
        };
    }

    case UPDATE_TIMES: {

        const { data: { timespanIotToWeb, timespanWebToClient, timespanTotal } } = action;

        return {
            ...state,
            timespanIotToWeb,
            timespanWebToClient,
            timespanTotal,
        };
    }

    default: {
        return state;
    }
    }
};
