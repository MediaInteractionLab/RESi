import { connect } from 'react-redux';
import ServerConfigurationView from './ServerConfigurationView';
import { updateDataMatrix, updateTime } from '../../../actions/dataMatrix';
import { updateCurrentSVMGesture, updateCurrentHeuristicGesture } from '../../../actions/gestureRecognition';
import { updateWebsocket, updateServer, restartInputReader, updateProductId, setDimensions } from '../../../actions/settings';

const mapStateToProps = state => ({
    serverConfig: state.settings.server,
    socketConfig: state.settings.websocket,
});

const mapDispatchToProps = dispatch => ({
    restartInputReader: (serverConfig, productIp) => {
        dispatch(restartInputReader(serverConfig, productIp));
    },
    updateDataMatrix: (data) => {
        dispatch(updateDataMatrix(data));
    },
    updateTime: (IoTServerTime, WebServerTime, ClientTime) => {
        dispatch(updateTime(IoTServerTime, WebServerTime, ClientTime));
    },
    updateGesture: (gesture) => {
        if (gesture.type === 'gesture') {
            dispatch(updateCurrentSVMGesture(gesture));
        } else if (gesture.type === 'heuristic') {
            dispatch(updateCurrentHeuristicGesture(gesture));
        }
    },
    updateIp: (ip) => {
        dispatch(updateServer({ server: ip }));
        dispatch(updateWebsocket({ server: ip }));
    },
    updateProductId: (productIp) => {
        dispatch(updateProductId(productIp));
    },
    setDimensions: (dimensions) => {
        dispatch(setDimensions(dimensions));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerConfigurationView);
