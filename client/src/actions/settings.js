import axios from 'axios';

import {
    UPDATE_SOCKET_SETTING,
    UPDATE_SERVER_SETTING,
    UPDATE_PRODUCT_ID,
    GET_DIMENSIONS,
} from './types';

export const updateWebsocket = socketData => ({
    type: UPDATE_SOCKET_SETTING,
    data: socketData,
});

export const updateServer = serverData => ({
    type: UPDATE_SERVER_SETTING,
    data: serverData,
});

export const restartInputReader = (serverConfig, productId) => (() => {
    const { protocol, server, port } = serverConfig;
    axios.post(`${protocol}://${server}:${port}/device/${productId}`);
});

export const updateProductId = id => ({
    type: UPDATE_PRODUCT_ID,
    data: { id },
});

export const getDimensions = serverConfig => ((dispatch) => {
    const { protocol, server, port } = serverConfig;
    return axios.get(`${protocol}://${server}:${port}/settings/dimensions`)
        .then((response) => {
            dispatch({ type: GET_DIMENSIONS, data: response.data });
        })
        .catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
});

export const setDimensions = dimesions => (
    { type: GET_DIMENSIONS, data: dimesions }
);
