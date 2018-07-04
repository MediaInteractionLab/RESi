import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';

import {
    container,
    parameter,
    keyInput,
    valueInput,
    button,
} from './MultipleKeyValueInput.scss';

class MultipleKeyValueInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keys: [],
            values: [],
        };

        this.addKeyValuePair = this.addKeyValuePair.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.deleteTrigger = this.deleteTrigger.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        const { input: { value } } = this.props;
        if (value) {
            const keys = [...this.state.keys];
            const values = [...this.state.values];

            Object.keys(value).forEach((key) => {
                keys.push(key);
                values.push(value[key]);
            });

            this.setState({ keys, values });
        }
    }

    addKeyValuePair() {
        const keys = [...this.state.keys];
        const values = [...this.state.values];
        keys.push('');
        values.push('');
        this.setState({ keys, values });
    }

    updateValue(evt, index) {
        const { placeholder, value } = evt.target;

        const keys = [...this.state.keys];
        const values = [...this.state.values];

        if (placeholder === 'key') {
            keys[index] = value;
            this.setState({ keys });
        } else if (placeholder === 'value') {
            values[index] = value;
            this.setState({ values });
        }

        this.onChange(keys, values);
    }

    deleteTrigger(index) {

        const keys = [...this.state.keys];
        const values = [...this.state.values];

        keys.splice(index, 1);
        values.splice(index, 1);

        this.setState({ keys, values });
        this.onChange(keys, values);
    }

    onChange(keys, values) {
        const { input: { onChange } } = this.props;
        const params = {};
        keys.forEach((key, i) => {
            params[key] = values[i];
        });

        onChange(params);
    }

    render() {
        const { keys, values } = this.state;
        return <div className={container}>
            <Button type="button" className={button} onClick={this.addKeyValuePair}><i className="material-icons">add</i></Button>
            {
                keys.map((key, index) => (
                    <div key={index} className={parameter}>
                        <input name={`key[${index}]`} placeholder="key" className={keyInput} onChange={evt => this.updateValue(evt, index)} value={keys[index]} />:
                        <input name={`value[${index}]`} placeholder="value" className={valueInput} onChange={evt => this.updateValue(evt, index)} value={values[index]} />
                        <i className="material-icons"
                            onClick={() => {
                                this.deleteTrigger(index);
                            }}>delete_forever</i>
                    </div>
                ))
            }
        </div>;
    }
}

MultipleKeyValueInput.propTypes = {
    input: PropTypes.object.isRequired,
};

export default MultipleKeyValueInput;
