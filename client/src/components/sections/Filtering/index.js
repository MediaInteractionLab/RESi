import React, { Component } from 'react';
import BaseSection from '../BaseSection';
import FilterList from './modules/FilterList';
import MatrixVisualization from '../../Visualization';
import types from '../../Visualization/types';

import {
    container,
    visualization,
    vizSelect,
    icon,
} from './Filtering.scss';

class Filtering extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: types[0].name,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(evt) {
        this.setState({ type: evt.target.value });
    }

    render() {
        const { type } = this.state;
        return (
            <BaseSection title="2. Filtering">
                <div className={container}>
                    <FilterList />
                    <hr/>
                    <div className={visualization}>
                        <div className={vizSelect}>
                            <select onChange={this.onChange} value={type}>
                                { types.map(t => (
                                    <option value={t.name} key={t.name}>{t.name}</option>
                                )) }
                            </select>
                            <div className={icon}><i className="material-icons">arrow_drop_down</i></div>
                        </div>
                        <MatrixVisualization type={type} />
                    </div>
                </div>
            </BaseSection>
        );
    }
}

export default Filtering;
