import React from 'react';

export default ({ instructions, onRun, onStep, onReset }) => {
    return (
        <div className="actions">
            <button className="button is-primary" onClick={onRun}>Run</button>
            <button className="button is-info" onClick={onStep}>Step</button>
            <button className="button is-danger" onClick={onReset}>Reset</button>
        </div>
    );
}