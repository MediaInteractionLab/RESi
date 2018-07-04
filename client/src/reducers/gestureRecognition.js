import initialState from '../initialStates/gestureRecognition';

import {
    UPDATE_CURRENT_GESTURE_SVM,
    UPDATE_CURRENT_GESTURE_HEURISTIC,
} from '../actions/types';

export default (state = initialState, action) => {
    switch (action.type) {

    case UPDATE_CURRENT_GESTURE_SVM: {

        const { data: { name } } = action;
        return {
            ...state,
            currentGestureSVM: name,
        };
    }

    case UPDATE_CURRENT_GESTURE_HEURISTIC: {

        const { data: { name, gesture } } = action;
        return {
            ...state,
            currentGestureHeuristic: name,
            currentGestureArgs: JSON.stringify(gesture),
        };
    }

    default: {
        return state;
    }
    }
};
