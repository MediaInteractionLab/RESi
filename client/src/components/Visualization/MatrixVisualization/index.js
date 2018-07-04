import { connect } from 'react-redux';
import MatrixVisualizationView from './MatrixVisualizationView';
import { getDimensions } from '../../../actions/settings';

const mapStateToProps = state => ({
    dimensions: state.settings.dimensions,
    data: state.dataMatrix.data,
    serverConfig: state.settings.server,
});

const mapDispatchToProps = dispatch => ({
    getDimensions: serverConfig => (dispatch(getDimensions(serverConfig))),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatrixVisualizationView);
