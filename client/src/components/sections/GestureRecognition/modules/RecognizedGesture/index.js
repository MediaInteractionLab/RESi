import { connect } from 'react-redux';
import RecognizedGestureView from './RecognizedGestureView';

const mapStateToProps = state => ({
    gesture: state.gestureRecognition.currentGestureSVM,
});

export default connect(mapStateToProps)(RecognizedGestureView);
