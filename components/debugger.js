import React from 'react';

export default ({ instructions, onStep }) => {
    return (
        <div>
            <button className="button is-primary" onClick={onStep}>Run</button>
            <button className="button is-info" onClick={onStep}>Step</button>
        </div>
    );
}