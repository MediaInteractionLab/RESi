import initialState from '../initialStates/settings';

import {
    UPDATE_SOCKET_SETTING,
    UPDATE_SERVER_SETTING,
    UPDATE_PRODUCT_ID,
    GET_DIMENSIONS,
} from '../actions/types';

export default (state = initialState, action) => {
    switch (action.type) {

    case UPDATE_SOCKET_SETTING: {

        const websocket = {
            ...state.websocket,
            ...action.data,
        };

        return {
            ...state,
            websocket,
        };
    }

    case UPDATE_SERVER_SETTING: {

        const server = {
            ...state.server,
            ...action.data,
        };

        return {
            ...state,
            server,
        };
    }

    case UPDATE_PRODUCT_ID: {

        return {
            ...state,
            productId: action.data.id,
        };
    }

    case GET_DIMENSIONS: {

        const dimensions = {
            ...state.dimensions,
            ...action.data,
        };

        return {
            ...state,
            dimensions,
        };
    }

    default: {
        return state;
    }
    }
};
