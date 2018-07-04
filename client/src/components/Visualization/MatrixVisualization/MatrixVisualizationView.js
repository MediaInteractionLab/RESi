import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    container,
} from './MatrixVisualization.scss';

class DataMatrixCanvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
            canvasInitialized: false,
        };

        this.getRequestAnimationFrame = this.getRequestAnimationFrame.bind(this);
        this.animate = this.animate.bind(this);
        this.getPixelRatio = this.getPixelRatio.bind(this);
        this.createHiDPICanvas = this.createHiDPICanvas.bind(this);
        this.calcMatrixCellWidth = this.calcMatrixCellWidth.bind(this);
        this.calcMatrixCellHeight = this.calcMatrixCellHeight.bind(this);
        this.drawMatrixCell = this.drawMatrixCell.bind(this);
        this.drawMatrixRow = this.drawMatrixRow.bind(this);
        this.drawMatrix = this.drawMatrix.bind(this);
    }

    componentWillMount() {
        const { dimensions, getDimensions, serverConfig } = this.props;
        if (!dimensions) {
            getDimensions(serverConfig);
        }
    }

    componentDidMount() {
        const { dimensions } = this.props;
        if (dimensions) {
            this.initializeCanvas();
        }
    }

    componentDidUpdate() {
        if (this.canvas) {
            this.initializeCanvas();
        }
    }

    initializeCanvas() {
        const { canvas } = this;
        const ctx = canvas.getContext('2d');
        this.createHiDPICanvas(ctx, this.getPixelRatio(ctx));

        this.setState({
            canvas,
            ctx,
            cellWidth: this.calcMatrixCellWidth(),
            cellHeight: this.calcMatrixCellHeight(),
        });

        if (!this.state.canvasInitialized) {
            this.setState({ canvasInitialized: true });
            window.requestAnimFrame = this.getRequestAnimationFrame();
            this.animate();
        }
    }

    shouldComponentUpdate(nextProps) {
        const bool = nextProps.dimensions &&
        (!this.props.dimensions ||
            nextProps.dimensions.cols !== this.props.dimensions.cols ||
            nextProps.dimensions.rows !== this.props.dimensions.rows);
        return bool;
    }

    animate() {
        window.requestAnimFrame(this.animate);
        this.drawMatrix();
        // place the rAF *before* the render() to assure as close to
        // 60fps with the setTimeout fallback.
    }

    getRequestAnimationFrame() {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        ((callback) => {
            window.setTimeout(callback, 1000 / 60);
        });
    }

    calcMatrixCellWidth() {
        const { width, dimensions, cellMargin } = this.props;
        const marginSum = (dimensions.cols - 1) * cellMargin;
        return (width - marginSum) / dimensions.cols;
    }

    calcMatrixCellHeight() {
        const { height, dimensions, cellMargin } = this.props;
        const marginSum = (dimensions.rows - 1) * cellMargin;
        return (height - marginSum) / dimensions.rows;
    }

    getPixelRatio(context) {
        const dpr = window.devicePixelRatio || 1;
        const bsr = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
        return dpr / bsr;
    }

    createHiDPICanvas(context, ratio) {
        const { width, height } = this.props;
        this.canvas.width = width * ratio;
        this.canvas.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    drawMatrixCell(rowIndex, colIndex) {
        const { ctx, cellWidth, cellHeight } = this.state;
        const { cellMargin, data: { rows, cols, matrix } } = this.props;
        if (rows === undefined || cols === undefined) return;
        if (matrix === undefined) return;
        const value = matrix[(rowIndex * cols) + colIndex];

        // draw rectangle
        const startPositionX = colIndex * (cellWidth + cellMargin);
        const startPositionY = rowIndex * (cellHeight + cellMargin);
        // linear interpolation between 0 (red) and 240 (blue)
        // values between 0 and 255
        const hslaValue = 240 - ((240 / 255) * value);
        ctx.fillStyle = `hsla(${hslaValue}, 100%, 50%, 1)`;
        ctx.fillRect(startPositionX, startPositionY, cellWidth, cellHeight);

        // draw text
        const textStartX = startPositionX + (cellWidth / 2);
        const textStartY = startPositionY + (cellHeight / 2) + 4;
        ctx.font = '10px Open Sans';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(value, textStartX, textStartY, cellWidth);
    }

    drawMatrixRow(rowIndex) {
        const { dimensions } = this.props;
        for (let i = 0; i < dimensions.cols; i++) {
            this.drawMatrixCell(rowIndex, i);
        }
    }

    drawMatrix() {
        const { canvas } = this.state;
        if (canvas) {
            const { dimensions } = this.props;
            for (let i = 0; i < dimensions.rows; i++) {
                this.drawMatrixRow(i);
            }
        }
    }

    render() {
        const { width, height, dimensions } = this.props;
        if (dimensions) {
            const size = {
                width: `${width}px`,
                height: `${height}px`,
            };
            return <div className={container}>
                <canvas ref={(element) => { this.canvas = element; }} style={size} />
            </div>;
        }
        return <div>Please initialize number of rows and colums to view matrix.</div>;
    }
}

DataMatrixCanvas.propTypes = {
    data: PropTypes.object.isRequired,
    dimensions: PropTypes.object,
    getDimensions: PropTypes.func.isRequired,
    serverConfig: PropTypes.object.isRequired,

    width: PropTypes.number,
    height: PropTypes.number,
    cellMargin: PropTypes.number,
};

DataMatrixCanvas.defaultProps = {
    width: 700,    // px
    height: 700,   // px
    cellMargin: 2, // px
};

export default DataMatrixCanvas;
