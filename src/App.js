import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="drum-machine">
          <div id="display">
          <div className="drum-pad" id="heater-1">Q
            <audio src="" className="clip" id="Q" />
          </div>
          <div className="drum-pad" id="heater-2">W
            <audio src="" className="clip" id="W" />
          </div>
          <div className="drum-pad" id="heater-3">E
            <audio src="" className="clip" id="E" />
          </div>
          <div className="drum-pad" id="heater-4">A
            <audio src="" className="clip" id="A" />
          </div>
          <div className="drum-pad" id="clap">S
            <audio src="" className="clip" id="S" />
          </div>
          <div className="drum-pad" id="open-hh">D
            <audio src="" className="clip" id="D" />
          </div>
          <div className="drum-pad" id="kick-n-hat">Z
            <audio src="" className="clip" id="Z" />
          </div>
          <div className="drum-pad" id="kick">X
            <audio src="" className="clip" id="X" />
          </div>
          <div className="drum-pad" id="closed-hh">C
            <audio src="" className="clip" id="C" />
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
