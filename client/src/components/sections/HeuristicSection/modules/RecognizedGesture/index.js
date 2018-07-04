import { connect } from 'react-redux';
import RecognizedGestureView from './RecognizedGestureView';

const mapStateToProps = state => ({
    gesture: state.gestureRecognition.currentGestureHeuristic,
    gestureArgs: state.gestureRecognition.currentGestureArgs,
});

export default connect(mapStateToProps)(RecognizedGestureView);
