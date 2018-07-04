import axios from 'axios';

import {
    ADD_GESTURE,
    LOAD_GESTURES,
    DELETE_GESTURE,
    GESTURES_TRAINED,
    GESTURES_START_TRAINING,
} from './types';

export const addGesture = (data, serverConfig) => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.post(`${protocol}://${server}:${port}/gesture`, data)
        .then((response) => {
            dispatch({ type: ADD_GESTURE, data: response.data });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const loadGestures = serverConfig => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.get(`${protocol}://${server}:${port}/gesture`)
        .then((response) => {
            dispatch({ type: LOAD_GESTURES, data: response.data });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const deleteGesture = (id, serverConfig) => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.delete(`${protocol}://${server}:${port}/gesture/${id}`)
        .then((response) => {
            dispatch({ type: DELETE_GESTURE, data: response.data });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const trainGestures = serverConfig => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    dispatch({ type: GESTURES_START_TRAINING });
    axios.post(`${protocol}://${server}:${port}/gesture/train`)
        .then((response) => {
            dispatch({ type: GESTURES_TRAINED, data: response.data });
            loadGestures(serverConfig)(dispatch);
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});
