import axios from 'axios';

import {
    ADD_TRIGGER,
    LOAD_TRIGGERS,
    UPDATE_TRIGGER,
    DELETE_TRIGGER,
    SELECT_TRIGGER,
} from './types';

export const selectTrigger = data => ({ type: SELECT_TRIGGER, data });

export const addTrigger = (data, serverConfig) => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.post(`${protocol}://${server}:${port}/trigger`, data)
        .then((response) => {
            dispatch({ type: ADD_TRIGGER, data: response.data });
            dispatch(selectTrigger(response.data));
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const loadTriggers = serverConfig => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.get(`${protocol}://${server}:${port}/trigger`)
        .then((response) => {
            dispatch({ type: LOAD_TRIGGERS, data: response.data });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const updateTrigger = (trigger, serverConfig) => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.put(`${protocol}://${server}:${port}/trigger/${trigger._id}`, trigger)
        .then((response) => {
            dispatch({ type: UPDATE_TRIGGER, data: response.data });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const deleteTrigger = (id, serverConfig) => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.delete(`${protocol}://${server}:${port}/trigger/${id}`)
        .then((response) => {
            dispatch({ type: DELETE_TRIGGER, data: response.data });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});
