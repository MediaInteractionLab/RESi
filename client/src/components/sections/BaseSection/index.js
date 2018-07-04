import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';

import {
    container,
    header,
    content,
} from './BaseSection.scss';

class BaseSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    render() {
        const { isOpen } = this.state;
        const { title, children } = this.props;
        return (
            <section className={ container }>
                <div className={ header } onClick={this.toggle}>
                    { title } { (isOpen) ?
                        <i className="material-icons">keyboard_arrow_up</i> :
                        <i className="material-icons">keyboard_arrow_down</i>}
                </div>

                <AnimateHeight duration={ 500 } height={ (isOpen) ? 'auto' : 0} >
                    <div className={ content }>{ children }</div>
                </AnimateHeight>
            </section>
        );
    }

}

BaseSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
};

export default BaseSection;
