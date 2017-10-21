import React from 'react';
import Screen from './screen';
import Title from './title';
import Log from './log';
import Gameboy from '../core/gameboy';

export default class Emulator extends React.Component {
    constructor(props) {
        super(props);

        this.gameboy = new Gameboy(props.rom);

        this.state = {
            log: []
        };
    }

    componentDidMount() {

    }

    render() {
        const { log } = this.state;

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-one-third">
                        <Title size={5}>Debugger</Title>
                    </div>
                    <div className="column is-one-third">
                        <Screen width={160} height={144} />

                        <Log lines={log} />
                    </div>
                    <div className="column is-one-third">
                    </div>
                </div>
            </div>
        )
    }
}