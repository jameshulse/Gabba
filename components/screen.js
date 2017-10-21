import React from 'react';

export default class Screen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="screen" style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }}>
                <canvas ref={(canvas) => this.canvas = canvas}
                    width={this.props.width}
                    height={this.props.height}> >
                </canvas>
            </div>
        );
    }
}

