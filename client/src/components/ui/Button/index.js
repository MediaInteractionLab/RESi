import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    button,
} from './Button.scss';

class Button extends Component {

    render() {
        const {
            children,
            type,
            onClick,
            className,
            disabled,
        } = this.props;

        const classes = classNames(button, className);

        return <button
            className={classes}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>;
    }
}

Button.propTypes = {
    type: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Button;
