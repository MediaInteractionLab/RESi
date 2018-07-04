import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import dataMatrix from './dataMatrix';
import gestureRecognition from './gestureRecognition';
import dataCapturing from './dataCapturing';
import gestures from './gestures';
import settings from './settings';
import filters from './filters';
import triggers from './triggers';

export default combineReducers({
    dataMatrix,
    gestureRecognition,
    dataCapturing,
    gestures,
    settings,
    filters,
    triggers,
    form: formReducer,
});
