import {
    UPDATE_DATAMATRIX,
    UPDATE_TIMES,
} from './types';

export const updateDataMatrix = data => ({ type: UPDATE_DATAMATRIX, data });

export const updateTime = (IoTServerTimeString, WebServerTimeString, ClientTimeString) => {

    const IoTServerTime = new Date(IoTServerTimeString);
    const WebServerTime = new Date(WebServerTimeString);
    const ClientTime = new Date(ClientTimeString);

    const timespanIotToWeb = WebServerTime - IoTServerTime;
    const timespanWebToClient = ClientTime - WebServerTime;
    const timespanTotal = ClientTime - IoTServerTime;

    return { type: UPDATE_TIMES, data: { timespanIotToWeb, timespanWebToClient, timespanTotal } };
};
