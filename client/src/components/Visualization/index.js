import { Component } from 'react';
import PropTypes from 'prop-types';
import types from './types';

class Visualization extends Component {
    render() {
        const { type } = this.props;

        for (let i = 0; i < types.length; i++) {
            if (type === types[i].name) {
                return types[i].component;
            }
        }

        return null;
    }
}

Visualization.propTypes = {
    type: PropTypes.string.isRequired,
};

export default Visualization;
