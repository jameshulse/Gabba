import React from 'react';
import Title from './title';
import Emulator from './emulator';
import Loader from './loader';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rom: null
        };
    }

    loadRom(rom) {
        this.setState((prev) => ({
            ...prev,
            rom
        }));
    }

    render() {
        const { rom } = this.state;

        return (
            <div>
                <nav className="navbar is-radiusless" role="navbar">
                    <div className="navbar-brand">
                        <Title className="navbar-item" size={2}>Gabba</Title>
                    </div>
                </nav>
                <div className="container is-widescreen">
                    {
                        rom ? <Emulator rom={rom} /> : <Loader onLoad={this.loadRom.bind(this)} />
                    }
                </div>
            </div>
        );
    }
}
