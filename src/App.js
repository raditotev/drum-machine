import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { bankOne, bankTwo } from "./banks";
import { DrumPad } from "./components/drum-pad";
import { IOSSwitch } from "./components/ios-switch";
import { Volume } from "./components/volume";
import { Display } from "./components/display";

function App() {
  const initialState = {
    powerOn: true,
    bank: bankOne,
    display: "Heater",
    volume: 50,
  };

  const [{ powerOn, bank, display, volume }, setState] = React.useReducer(
    (s, a) => ({ ...s, ...a }),
    initialState
  );

  React.useEffect(() => {
    if (!powerOn) {
      return;
    }

    function handleKeyDown(event) {
      const activeKeys = bank.map((pad) => pad.keyTrigger);
      const pressedKey = event.key.toUpperCase();

      if (activeKeys.includes(pressedKey)) {
        const keyPad = document.getElementById(pressedKey);
        keyPad.volume = volume / 100;
        keyPad.play();

        const pad = bank.filter((pad) => pad.keyTrigger === pressedKey).pop();
        setState({ display: pad.id.replace(/-/gm, " ") });
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bank, powerOn, volume]);

  function handlePowerButtonClick() {
    setState({ powerOn: !powerOn });
  }

  function handleBankClick() {
    JSON.stringify(bank) === JSON.stringify(bankOne)
      ? setState({ bank: bankTwo, display: "Smooth Piano Kit" })
      : setState({ bank: bankOne, display: "Heater" });
  }

  function handleVolumeChange(event, newValue) {
    setState({ volume: newValue, display: `Volume: ${newValue}` });

    setTimeout(() => {
      setState({ display: "" });
    }, 1000);
  }

  return (
    <div className="App" id="root">
      <div id="drum-machine">
        <div id="drum-pads">
          {bank.map((pad) => {
            return (
              <DrumPad
                key={pad.keyCode}
                pad={pad}
                state={{ powerOn, volume }}
                setState={setState}
              />
            );
          })}
        </div>
        <div id="controls">
          <div id="power">
            <FormControlLabel
              control={
                <IOSSwitch
                  checked={powerOn}
                  onChange={handlePowerButtonClick}
                  name="powerButton"
                />
              }
              label="Power"
              labelPlacement="top"
            />
          </div>
          <Display display={display} />
          <Volume volume={volume} setVolume={handleVolumeChange} />
          <div id="bank">
            <FormControlLabel
              control={<Switch color="default" onClick={handleBankClick} />}
              label="Bank"
              labelPlacement="top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
