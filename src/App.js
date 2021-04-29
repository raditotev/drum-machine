import React from "react";

import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import { bankOne, bankTwo } from "./banks";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 2,
    margin: theme.spacing(0),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const DrumPad = ({ pad, state, setState }) => {
  const { keyTrigger, id, url } = pad;
  const { powerOn, volume } = state;

  const handlePadClick = (event) => {
    if (!powerOn) {
      return;
    }

    const keyPad = event.target.querySelector("audio");
    keyPad.volume = volume / 100;
    keyPad.play();
    setState({ display: id.replace(/-/gm, " ") });
  };

  return (
    <div id={id} className="drum-pad" onClick={handlePadClick}>
      {keyTrigger}
      <audio id={keyTrigger} src={url} className="clip">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

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
          <div id="display">{display}</div>
          <Slider
            id="volume"
            min={0}
            max={100}
            value={volume}
            onChange={handleVolumeChange}
            aria-labelledby="continuous-slider"
          />
          <div id="bank">
            <FormControlLabel
              value="top"
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
