import React from 'react';
import classNames from 'classnames';
import { formatHex } from '../core/utils';

export default class Registers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            registers: {
                af: { value: 0, changed: false },
                bc: { value: 0, changed: false },
                de: { value: 0, changed: false },
                hl: { value: 0, changed: false },
                sp: { value: 0, changed: false },
                pc: { value: 0, changed: false }
            }
        }
    }

    componentWillUpdate(nextProps) {
        for (let key in nextProps.registers) {
            this.state.registers[key].changed = this.state.registers[key].value !== nextProps.registers[key];
            this.state.registers[key].value = nextProps.registers[key];
        }
    }

    renderRegister(name, index) {
        let valueClass = classNames([
            'registers__value',
            { 'registers__value--changed': this.state.registers[name].changed }
        ]);

        return (
            <tr key={index}>
                <td>{name}</td>
                <td className={valueClass}>{formatHex(this.state.registers[name].value)}</td>
            </tr>
        )
    }

    render() {
        let { registers } = this.state;

        return (
            <table className="registers table">
                <thead>
                    <tr>
                        <th>Register</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    { Object.getOwnPropertyNames(registers).map(this.renderRegister.bind(this)) }
                </tbody>
            </table>
        );
    }
}
