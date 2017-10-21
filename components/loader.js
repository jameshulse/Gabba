import React from 'react';
import Title from './title';
import FileSelect from './file-select';
import roms from '../roms/roms.json';

export default ({ onLoad }) => {
    let loadFromFile = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.readAsArrayBuffer(file);

        reader.onload = () => {
            onLoad({
                name: file.name,
                data: reader.result
            });
        };
    };

    let loadFromUrl = () => {
        fetch(url).then(async (response) => {
            let data = await response.arrayBuffer();

            this.props.onSelect({
                name,
                data
            });
        });
    };

    let renderRomCategory = (name, i) => {
        let romLinks = [];

        for (let key in roms[name]) {
            romLinks.push(<a key={romLinks.length} className="panel-block" href="#">{ key }</a>);
        }

        return (
            <div key={i} className="column is-one-third">
                <div className="panel">
                    <p className="panel-heading">{ name }</p>
                    { romLinks }
                </div>
            </div>

        );
    };

    return (
        <div>
            <div className="section">
                <Title size={5}>Choose ROM file</Title>
                <FileSelect onChange={loadFromFile} />
            </div>
            <div className="section">
                <Title size={5}>Select test ROM</Title>
                <div className="columns">
                    { Object.getOwnPropertyNames(roms).map(renderRomCategory) }
                </div>
            </div>
        </div>
    );
}