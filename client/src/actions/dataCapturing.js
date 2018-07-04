import {
    UPDATE_CAPTURING_COUNTER,
    RESET_CAPTURING_COUNTER,
    SET_IS_CAPTURING,
} from '../actions/types';

export const updateCapturingCounter = counterValue => ({
    type: UPDATE_CAPTURING_COUNTER,
    data: { counter: counterValue },
});

export const resetCapturingCounter = () => ({ type: RESET_CAPTURING_COUNTER });

export const setIsCapturing = isCapturing => ({ type: SET_IS_CAPTURING, data: { isCapturing } });

export const asdf = false;
