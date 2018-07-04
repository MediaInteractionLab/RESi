import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '../../ui/Button';
import BaseSection from '../BaseSection';

import {
    container,
    flex,
} from './ServerConfiguration.scss';

class ServerConfigurationView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            socketReady: false,
            usbPortOpen: false,
            connectionOpen: false,
            ip: '',
            rows: '',
            cols: '',
            productId: '',
        };

        this.logPorts = this.logPorts.bind(this);
        this.openConnection = this.openConnection.bind(this);
        this.closeConnection = this.closeConnection.bind(this);
        this.setIp = this.setIp.bind(this);
        this.setProductId = this.setProductId.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    logPorts() {
        const { serverConfig: { protocol, server, port } } = this.props;
        axios.get(`${protocol}://${server}:${port}/data/ports`)
            .then((response) => {
                /* eslint-disable */
                console.log(response.data);
                /* eslint-enable */
            })
            .catch((error) => {
                /* eslint-disable */
                console.log(error);
                /* eslint-enable */
            });
    }

    openConnection() {
        const { socketConfig: { protocol, server, port } } = this.props;
        const socket = new WebSocket(`${protocol}://${server}:${port}`);

        // Connection opened
        socket.addEventListener('open', () => {
            /* eslint-disable */
            console.log('ws connection opend');
            /* eslint-enable */
            this.setState({ socket, socketReady: true });
        });

        // Listen for messages
        socket.addEventListener('message', (event) => {
            const { data } = event;
            const jsonData = JSON.parse(data);
            if (jsonData.type === 'gesture' || jsonData.type === 'heuristic') {
                const { updateGesture } = this.props;
                updateGesture(jsonData);
            } else if (jsonData.type === 'raw') {
                const { updateDataMatrix, updateTime } = this.props;
                const { IoTServerTime, WebServerTime } = jsonData;
                const ClientTime = new Date();
                updateTime(IoTServerTime, WebServerTime, ClientTime);
                updateDataMatrix(jsonData.data);
            }
        });

        // handle the closing of the connection by the server
        socket.addEventListener('close', () => {
            this.setState({ socket: null, socketReady: false });
        });
    }

    closeConnection() {
        const { socket } = this.state;
        if (socket) {
            socket.close();
            this.setState({ socket: null, socketReady: false });
        }
    }

    setIp(event) {
        const { updateIp } = this.props;
        updateIp(event.target.value);
        this.setState({ ip: event.target.value });
    }

    setProductId(event) {
        const { updateProductId } = this.props;
        updateProductId(event.target.value);
        this.setState({ productId: event.target.value });
    }

    updateDimensions(dimensions) {
        const { setDimensions } = this.props;
        if (dimensions.rows !== undefined) {
            this.setState({ rows: dimensions.rows });
        } else {
            this.setState({ cols: dimensions.cols });
        }
        setDimensions(dimensions);
    }

    render() {
        const {
            socket, ip, productId, rows, cols,
        } = this.state;
        const { restartInputReader, serverConfig } = this.props;
        return (
            <BaseSection title="1. Device Configuration">
                <div className={container}>
                    <div className={flex}>
                        <Button onClick={this.logPorts}><i className="material-icons">list</i> log ports</Button>
                        <Button onClick={() => { restartInputReader(serverConfig, productId); }}><i className="material-icons">cached</i> re-start serial port connection</Button>
                        <div>
                            <label>Product ID: </label>
                            <input name="productId" value={productId} onChange={this.setProductId} type="text" />
                        </div>
                    </div>
                    <h2>Server Connection</h2>
                </div>
                <hr/>
                <div className={container}>
                    <div className={flex}>
                        { (!socket)
                            ? <Button onClick={() => { this.openConnection('/dev/cu.usbmodem1421', '115200'); }}><i className="material-icons">play_arrow</i> start data connection</Button>
                            : <Button onClick={() => { this.closeConnection('/dev/cu.usbmodem1421'); }}><i className="material-icons">stop</i> end data connection</Button>
                        }
                        <div>
                            <label>IP: </label>
                            <input name="ip" value={ip} onChange={this.setIp} type="text" />
                        </div>
                    </div>
                    <div>Sensor Dimension:
                        <input name="rows" placeholder="rows" value={rows} onChange={evt => this.updateDimensions({ rows: evt.target.value })} type="number" />x
                        <input name="cols" placeholder="cols" value={cols} onChange={evt => this.updateDimensions({ cols: evt.target.value })} type="number" />
                    </div>
                    <h2>WebSocket Connection</h2>
                </div>
            </BaseSection>
        );
    }
}


ServerConfigurationView.propTypes = {
    restartInputReader: PropTypes.func.isRequired,
    updateDataMatrix: PropTypes.func.isRequired,
    updateTime: PropTypes.func.isRequired,
    updateGesture: PropTypes.func.isRequired,
    updateIp: PropTypes.func.isRequired,
    updateProductId: PropTypes.func.isRequired,
    serverConfig: PropTypes.object.isRequired,
    socketConfig: PropTypes.object.isRequired,
    setDimensions: PropTypes.func.isRequired,
};

export default ServerConfigurationView;
