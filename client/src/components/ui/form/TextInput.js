import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    input,
} from './TextInput.scss';

class TextInput extends Component {

    render() {
        const { type, placeholder } = this.props;
        return <input
            className={input}
            type={type}
            placeholder={placeholder}
        />;
    }
}

TextInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.func,
};

export default TextInput;
