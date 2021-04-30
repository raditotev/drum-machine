import { DrumPad } from "./drum-pad";

function Pads({ bank, state, setState }) {
  return (
    <div id="drum-pads">
      {bank.map((pad) => {
        return (
          <DrumPad
            key={pad.keyCode}
            pad={pad}
            state={state}
            setState={setState}
          />
        );
      })}
    </div>
  );
}

export { Pads };
