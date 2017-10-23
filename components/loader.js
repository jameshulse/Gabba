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

    let loadFromUrl = (url) => {
        fetch(url).then(async (response) => {
            let data = await response.arrayBuffer();

            onLoad({
                name,
                data
            });
        });
    };

    let renderRomCategory = (name, i) => {
        let romLinks = [];

        for (let key in roms[name]) {
            let element = <a onClick={() => loadFromUrl(roms[name][key])} key={romLinks.length} className="panel-block" href="#">{key}</a>;
            
            romLinks.push(element);
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
                <Title size={5}>Choose ROM from file</Title>
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