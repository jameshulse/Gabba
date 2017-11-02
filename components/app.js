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

    onBackClick() {
        this.setState((prev) => ({
            ...prev,
            rom: null
        }));
    }

    render() {
        const { rom } = this.state;

        let view = () => {
            if (rom) {
                return (
                    <div>
                        <a onClick={this.onBackClick.bind(this)}>&lt; Back to Loader</a>
                        <Emulator rom={rom} />
                    </div>
                );
             } else {
                return <Loader onLoad={this.loadRom.bind(this)} />
            }
        }

        return (
            <div>
                <nav className="navbar is-radiusless" role="navbar">
                    <div className="navbar-brand">
                        <Title className="navbar-item" size={2}>Gabba</Title>
                    </div>
                </nav>
                <div className="container is-widescreen">
                    { view() }
                </div>
            </div>
        );
    }
}
