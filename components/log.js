import React from 'react';

export default ({ lines = [] }) => {
    return (
        <div className="log">
            { lines.map((line) => <p className="log__line">{ line }</p>) }
        </div>
    );
};