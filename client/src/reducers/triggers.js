import initialState from '../initialStates/triggers';

import {
    ADD_TRIGGER,
    LOAD_TRIGGERS,
    UPDATE_TRIGGER,
    DELETE_TRIGGER,
    SELECT_TRIGGER,
} from '../actions/types';

export default (state = initialState, action) => {
    switch (action.type) {

    case ADD_TRIGGER: {

        const trigger = action.data;
        const triggerList = [
            ...state.list,
            trigger,
        ];

        return {
            ...state,
            list: triggerList,
        };
    }

    case SELECT_TRIGGER: {
        return {
            ...state,
            selectedTrigger: action.data,
        };
    }

    case LOAD_TRIGGERS: {
        return {
            ...state,
            list: action.data,
        };
    }

    case UPDATE_TRIGGER: {
        const triggerList = [...state.list];
        let newTrigger;
        triggerList.forEach((trigger, index) => {
            if (trigger._id === action.data._id) {
                newTrigger = {
                    ...trigger,
                    ...action.data,
                };
                triggerList[index] = newTrigger;
            }
        });
        return {
            ...state,
            list: triggerList,
            selectedTrigger: newTrigger,
        };
    }

    case DELETE_TRIGGER: {
        const gestureList = state.list.filter(gesture => gesture._id !== action.data._id);
        return {
            ...state,
            list: gestureList,
        };
    }

    default: {
        return state;
    }
    }
};
