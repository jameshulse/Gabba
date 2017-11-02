import React from 'react';
import Screen from './screen';
import Debugger from './debugger';
import Registers from './registers';
import Title from './title';
import Log from './log';
import Gameboy from '../core/gameboy';

export default class Emulator extends React.Component {
    constructor(props) {
        super(props);

        this.gameboy = new Gameboy();

        this.gameboy.loadRom(props.rom);

        this.state = {
            log: [],
            registers: {}
        };
    }

    step() {
        let snapshot = this.gameboy.step();

        this.setState((prev) => ({
            ...prev,
            log: [...this.state.log, snapshot.log],
            registers: snapshot.registers
        }));
    }

    run() {
        this.gameboy.run();
    }

    stop() {
        this.gameboy.stop();
    }

    reset() {
        this.setState((prev) => ({
            ...prev,
            log: []
        }), () => {
            this.gameboy.loadRom(this.props.rom);
        });
    }

    render() {
        const { log, registers } = this.state;

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-one-third">
                        <Title size={5}>Debugger</Title>
                        <Debugger
                            onReset={this.reset.bind(this)}
                            onRun={this.run.bind(this)}
                            onStep={this.step.bind(this)} />
                        <Registers registers={registers} />
                    </div>
                    <div className="column is-one-third">
                        <Screen width={160} height={144} />
                    </div>
                    <div className="column is-one-third">
                        <Log lines={log} />
                    </div>
                </div>
            </div>
        )
    }
}