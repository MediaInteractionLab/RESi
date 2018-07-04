import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Field } from 'redux-form';
import Modal from 'react-modal';
import Filter from '../Filter';
import Button from '../../../../ui/Button';

import {
    container,
    listStyle,
    add,
    refresh,
    modal,
    overlay,
    closeIcon,
    icon,
    buttonContainer,
    iteratedOption,
} from './FilterList.scss';

class FilterList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            selectedFilterType: null,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragUpdate = this.onDragUpdate.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.selectFilterType = this.selectFilterType.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
    }

    componentWillMount() {
        const { loadFilters, loadFilterTypes, serverConfig } = this.props;
        loadFilters(serverConfig);
        loadFilterTypes(serverConfig);
    }

    openModal() {
        this.setState({ modalOpen: true });
    }

    closeModal() {
        this.props.destroyForm();
        this.setState({ modalOpen: false, selectedFilterType: null });
    }

    resetFilters() {
        this.props.resetFilters(this.props.serverConfig);
    }

    onDragStart = () => {};

    onDragUpdate = () => {};

    // the only one that is required
    onDragEnd = (result) => {

        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const { reorderFilters, serverConfig } = this.props;
        reorderFilters(serverConfig, result.source.index, result.destination.index);
    };

    addFilter(values) {
        const { addFilter, serverConfig, filterList } = this.props;
        const { selectedFilterType } = this.state;
        const filterData = {
            order: (filterList.length > 0) ? filterList[filterList.length - 1].order + 1 : 1,
            typeId: values.typeId,
            type: selectedFilterType.type,
            options: {
                ...values,
                typeId: undefined,
            },
        };
        addFilter(serverConfig, filterData);
        this.closeModal();
    }

    selectFilterType(evt) {
        const { filterTypes } = this.props;
        const typeId = evt.target.value;
        const selectedFilterType = filterTypes.find(filter => filter._id === typeId);

        this.setState({ selectedFilterType });
    }

    render() {
        const {
            filterList,
            filterTypes,
            removeFilter,
            handleSubmit,
            serverConfig,
        } = this.props;

        const { modalOpen, selectedFilterType } = this.state;
        return <div className={container}>
            <DragDropContext onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">

                    {provided => (
                        <div className={listStyle} ref={provided.innerRef}
                            { ...provided.droppableProps }>
                            { (filterList && filterTypes.length > 0) &&
                            filterList.map((filter, index) => {
                                const type = filterTypes.find(filterType =>
                                    (filterType._id === filter.typeId));
                                return <Filter filter={filter} index={index}
                                    type={type} serverConfig={serverConfig}
                                    key={index} removeFilter={removeFilter} />;
                            })}
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>
            </DragDropContext>
            <Button className={add} onClick={this.openModal}><i className="material-icons">add</i> Add Filter</Button>
            <Button className={refresh} onClick={this.resetFilters}><i className="material-icons">refresh</i></Button>
            <h2>Filters</h2>
            <Modal
                isOpen={modalOpen}
                contentLabel="Modal"
                className={modal}
                overlayClassName={overlay}
                ariaHideApp={false}>
                <h2>New Filter</h2>
                <div className={closeIcon} onClick={this.closeModal}><i className="material-icons">close</i></div>
                <form onSubmit={handleSubmit(this.addFilter)}>
                    <div>
                        <Field name="typeId" component="select" onChange={this.selectFilterType}>
                            <option />
                            { filterTypes.map(type => (
                                <option value={type._id} key={type._id}>{type.name}</option>
                            )) }
                        </Field>
                        <div className={icon}><i className="material-icons">arrow_drop_down</i></div>
                        <label>Select Filter-Type </label>
                    </div>
                    { (selectedFilterType) &&
                        selectedFilterType.options.map((option, index) => (
                            <div key={index} className={iteratedOption}>
                                <Field
                                    name={option.name}
                                    component="input"
                                    type={option.type}
                                />
                                <label>{option.label}</label>
                            </div>
                        ))
                    }
                    { (selectedFilterType) &&
                        <div className={buttonContainer}>
                            <Button type="submit"><i className="material-icons">add</i> {selectedFilterType.name}</Button>
                        </div>
                    }
                </form>
            </Modal>
        </div>;
    }
}

FilterList.propTypes = {
    filterList: PropTypes.array.isRequired,
    filterTypes: PropTypes.array.isRequired,
    loadFilters: PropTypes.func.isRequired,
    loadFilterTypes: PropTypes.func.isRequired,
    addFilter: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired,
    reorderFilters: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    serverConfig: PropTypes.object.isRequired,
    destroyForm: PropTypes.func.isRequired,
};

export default FilterList;
