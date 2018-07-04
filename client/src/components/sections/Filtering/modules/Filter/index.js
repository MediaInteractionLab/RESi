import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

import {
    container,
    dragging,
    deleteIcon,
} from './Filter.scss';

class Filter extends Component {

    render() {
        const {
            filter,
            type,
            index,
            removeFilter,
            serverConfig,
        } = this.props;
        return <Draggable key={filter._id} draggableId={filter._id} index={index}>
            {(provided, snapshot) => {
                const filterStyle = classNames([container, { [`${dragging}`]: snapshot.isDragging }]);
                return <div>
                    <div ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                        className={filterStyle}>
                        <h1>{type.name}</h1>
                        { (filter.options) &&
                            Object.entries(filter.options).map((option, i) => (
                                (option[0] !== 'id') &&
                                    <p key={i}><strong>{option[0]}:</strong> {option[1]}</p>
                            ))
                        }
                        <div className={deleteIcon} onClick={() => { removeFilter(serverConfig, filter._id); }}><i className="material-icons">delete_forever</i></div>
                    </div>
                    {provided.placeholder}
                </div>;
            }}
        </Draggable>;
    }
}

Filter.propTypes = {
    filter: PropTypes.object.isRequired,
    type: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    removeFilter: PropTypes.func.isRequired,
    serverConfig: PropTypes.object.isRequired,
};

export default Filter;
