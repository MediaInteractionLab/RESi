import initialState from '../initialStates/gestures';

import {
    ADD_GESTURE,
    LOAD_GESTURES,
    DELETE_GESTURE,
    GESTURES_TRAINED,
    GESTURES_START_TRAINING,
} from '../actions/types';

export default (state = initialState, action) => {
    switch (action.type) {

    case ADD_GESTURE: {

        const gesture = action.data;
        const gestureList = [
            ...state.list,
            gesture,
        ];

        return {
            ...state,
            list: gestureList,
        };
    }

    case LOAD_GESTURES: {
        return {
            ...state,
            list: action.data,
        };
    }

    case DELETE_GESTURE: {
        const gestureList = state.list.filter(gesture => gesture._id !== action.data._id);
        return {
            ...state,
            list: gestureList,
        };
    }

    case GESTURES_START_TRAINING: {
        return {
            ...state,
            training: true,
        };
    }

    case GESTURES_TRAINED: {
        return {
            ...state,
            training: false,
        };
    }

    default: {
        return state;
    }
    }
};
