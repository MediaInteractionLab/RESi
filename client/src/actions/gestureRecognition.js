import {
    UPDATE_CURRENT_GESTURE_SVM,
    UPDATE_CURRENT_GESTURE_HEURISTIC,
} from './types';

export const updateCurrentSVMGesture = data => ({ type: UPDATE_CURRENT_GESTURE_SVM, data });

export const updateCurrentHeuristicGesture = data =>
    ({ type: UPDATE_CURRENT_GESTURE_HEURISTIC, data });
