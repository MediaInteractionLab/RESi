import initialState from '../initialStates/dataCapturing';

import {
    UPDATE_CAPTURING_COUNTER,
    RESET_CAPTURING_COUNTER,
    SET_IS_CAPTURING,
} from '../actions/types';

export default (state = initialState, action) => {
    switch (action.type) {

    case UPDATE_CAPTURING_COUNTER: {

        const { data } = action;
        return {
            ...state,
            counter: data.counter,
        };
    }

    case RESET_CAPTURING_COUNTER: {

        return {
            ...state,
            counter: null,
        };
    }

    case SET_IS_CAPTURING: {

        const { data } = action;
        return {
            ...state,
            isCapturing: data.isCapturing,
        };
    }

    default: {
        return state;
    }
    }
};
