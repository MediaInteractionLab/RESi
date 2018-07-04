import axios from 'axios';

import {
    LOAD_FILTERS,
    LOAD_FILTER_TYPES,
    ADD_FILTER,
    REMOVE_FILTER,
    REORDER_FILTER,
    RESET_FILTERS,
} from './types';

export const loadFilters = serverConfig => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.get(`${protocol}://${server}:${port}/filter/`)
        .then((response) => {
            dispatch({ type: LOAD_FILTERS, data: response.data });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const loadFilterTypes = serverConfig => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.get(`${protocol}://${server}:${port}/filter/types`)
        .then((response) => {
            dispatch({ type: LOAD_FILTER_TYPES, data: response.data });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const addFilter = (serverConfig, filterData) => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.post(`${protocol}://${server}:${port}/filter/`, filterData)
        .then((response) => {
            dispatch({ type: ADD_FILTER, data: { ...filterData, ...response.data } });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const removeFilter = (serverConfig, filterId) => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    axios.delete(`${protocol}://${server}:${port}/filter/${filterId}`)
        .then(() => {
            dispatch({ type: REMOVE_FILTER, data: { filterId } });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const reorderFilters = (serverConfig, startIndex, endIndex) => {
    const { protocol, server, port } = serverConfig;
    axios.put(`${protocol}://${server}:${port}/filter/reorder`, { startIndex, endIndex })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });

    return {
        type: REORDER_FILTER,
        data: {
            startIndex,
            endIndex,
        },
    };
};

export const resetFilters = (serverConfig) => {
    const { protocol, server, port } = serverConfig;
    axios.put(`${protocol}://${server}:${port}/filter/reset`)
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });

    return {
        type: RESET_FILTERS,
    };
};
