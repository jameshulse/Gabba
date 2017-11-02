import React from 'react';
import Title from './title';

export default class Log extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.ref.scrollTop = this.ref.scrollHeight;
    }
    
    render() {
        const { lines } = this.props;

        return (
            <div className="log">
                <Title className="log_title" size={5}>Log</Title>
                <div className="log__items" ref={ref => this.ref = ref}>
                    { lines.map((line, index) => <p key={index} className="log__line">{ line }</p>) }
                </div>
            </div>
        );
    }
}